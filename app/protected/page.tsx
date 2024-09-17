import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Flow from "@/components/Flow";
import Container from "@/components/Container";

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
      <Container>
        <div className="flex flex-col items-center justify-center ">
          <div className="flex items-center flex-col gap-4">
            <Flow></Flow>
          </div>
        </div>
      </Container>
    </>
  );
}
