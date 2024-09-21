"use client";

import { createClient } from "@penny/supabase/client";
import { Button } from "@penny/ui/button";

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
    <Button onClick={handleSignin} variant="outline" className="font-mono">
      {/* TODO:(@akuya-ekorot): Localize text */}
      Sign in with Google
    </Button>
  );
}
