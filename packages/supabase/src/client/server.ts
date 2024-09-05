import { createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers.js";

type CreateClientOptions = {
  admin?: boolean;
  schema?: "public" | "storage";
};

export const createClient = (options?: CreateClientOptions) => {
  const { admin = false, ...rest } = options ?? {};

  const cookieStore = cookies();

  const key = admin
    ? process.env.SUPABASE_SERVICE_KEY!
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const auth = admin
    ? {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionUrl: false,
      }
    : {};

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    ...rest,
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch (error) {}
      },
    },
    auth,
    global: {
      headers: {
        // Pass user agent from browser
        "user-agent": headers().get("user-agent") as string,
      },
    },
  });
};
