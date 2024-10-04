import { GeistSans } from "geist/font/sans";
import { Poppins } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Revita | Track your life",
  description: "The fastest way to track your health",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
