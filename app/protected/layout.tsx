import AppHeader from "@/components/AppHeader";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { Poppins } from "next/font/google";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppHeader></AppHeader>
        {children}
        <div className="mt-12 container mx-auto flex justify-center max-w-6">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeSwitcher></ThemeSwitcher>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
