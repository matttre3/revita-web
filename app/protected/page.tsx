import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Flow from "@/components/Flow";

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
      <div className="container mx-auto pl-3 pr-3 h-full">
        <div className="flex flex-col items-center justify-center ">
          <div className="flex items-center flex-col gap-4">
            <Flow></Flow>
          </div>
        </div>
      </div>
    </>
  );
}
