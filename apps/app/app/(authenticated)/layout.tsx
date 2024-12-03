import { createDbUserAction } from '@/actions/users';
import { auth, currentUser } from '@repo/auth/server';
import { SidebarProvider } from '@repo/design-system/components/ui/sidebar';
import { handleError } from '@repo/design-system/lib/utils';
import type { ReactNode } from 'react';
import { PostHogIdentifier } from './components/posthog-identifier';
import { GlobalSidebar } from './components/sidebar';

type AppLayoutProperties = {
  readonly children: ReactNode;
};

const AppLayout = async ({ children }: AppLayoutProperties) => {
  const user = await currentUser();
  const { redirectToSignIn } = await auth();

  if (!user) {
    return redirectToSignIn();
  }

  try {
    await createDbUserAction({
      clerkId: user.id,
    });
  } catch {
    handleError('Auth error');
  }

  return (
    <SidebarProvider>
      <GlobalSidebar>
        <div className="h-12 border-b" />
        {children}
      </GlobalSidebar>
      <PostHogIdentifier />
    </SidebarProvider>
  );
};

export default AppLayout;
