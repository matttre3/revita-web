import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { signOutAction } from "../actions";
import AuthButton from "@/components/header-auth";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <div className="flex-1 w-full flex flex-col gap-12">
        you are logged in
      </div>
      <AuthButton></AuthButton>
    </>
  );
}
