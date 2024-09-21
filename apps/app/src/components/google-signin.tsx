"use client";

import { createClient } from "@penny/supabase/client";
import { Button } from "@penny/ui/button";
import { GoogleIcon } from "@penny/ui/icons";

export function GoogleSignin() {
  const supabase = createClient();

  const handleSignin = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  return (
    <Button size="lg" onClick={handleSignin} className="gap-4">
      <GoogleIcon className="size-6" />
      <span>Continue with Google</span>
    </Button>
  );
}
