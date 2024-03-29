import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Montserrat_Alternates } from "next/font/google";

import "./globals.css";
import SessionAuthProvider from "@/context/sessionAuthProvider";
const inter = Inter({ subsets: ["latin"] });

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vale App",
  description: "Auth app with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserratAlternates.className}>
        <SessionAuthProvider>{children}</SessionAuthProvider>
      </body>
    </html>
  );
}
