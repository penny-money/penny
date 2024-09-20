"use client";

import { createClient } from "@penny/supabase/client";
import { Button } from "@penny/ui/button";
import { LogOut } from "@penny/ui/icons";

export function SignOut() {
  const supabase = createClient();

  const handleSignOut = () => {
    supabase.auth.signOut();
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      className="font-mono gap-2 flex items-center"
    >
      <LogOut className="size-4" />
      <span>Sign out</span>
    </Button>
  );
}
