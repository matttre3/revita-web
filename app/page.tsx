import AuthButton from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Image from "next/image";

import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { ThemeProvider } from "next-themes";

export default async function Index() {
  return (
    <>
      <main>
        <div className="container mx-auto pl-3 pr-3 h-full">
          <div className="flex flex-col items-center justify-center ">
            <Image
              src="/images/logo.png"
              width={250}
              height={250}
              alt="logo revita"
            />
            <div className="flex items-center flex-col gap-4">
              <h1 className="text-5xl lg:text-6xl font-extrabold text-primary mt-[-30px]">
                Revita
              </h1>
              <p>Lorem ipsum dolor sit amen et </p>
            </div>

            <div className="mt-12">
              <AuthButton></AuthButton>
            </div>

            <div className="mt-12">
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <ThemeSwitcher></ThemeSwitcher>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
