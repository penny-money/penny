import { auth, currentUser } from '@repo/auth/server';
import { SidebarProvider } from '@repo/design-system/components/ui/sidebar';
import { showBetaFeature } from '@repo/feature-flags';
import arcjet, { detectBot, request } from '@repo/security';
import type { ReactNode } from 'react';
import { PostHogIdentifier } from './components/posthog-identifier';
import { GlobalSidebar } from './components/sidebar';
import { createDbUserAction } from '@/actions/users';

type AppLayoutProperties = {
  readonly children: ReactNode;
};

const aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE',
    allow: ['CATEGORY:PREVIEW'],
  })
);

const AppLayout = async ({ children }: AppLayoutProperties) => {
  // const req = await request();
  // const decision = await aj.protect(req);
  //
  // if (decision.isDenied()) {
  //   if (decision.reason.isBot()) {
  //     throw new Error('No bots allowed');
  //   }
  //   throw new Error('Access denied');
  // }

  const user = await currentUser();
  const { redirectToSignIn } = await auth();
  const betaFeature = await showBetaFeature();

  if (!user) {
    return redirectToSignIn();
  }

  // Create or sync user with our database
  try {
    await createDbUserAction({
      clerkId: user.id,
    });
  } catch {
    // console.error('Failed to sync user with database:', error);
  }

  return (
    <SidebarProvider>
      <GlobalSidebar>
        {betaFeature && (
          <div className="m-4 rounded-full bg-success p-1.5 text-center text-sm text-success-foreground">
            Beta feature now available
          </div>
        )}
        {children}
      </GlobalSidebar>
      <PostHogIdentifier />
    </SidebarProvider>
  );
};

export default AppLayout;
