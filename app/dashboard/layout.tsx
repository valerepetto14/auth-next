"use client";
import { useSession } from "next-auth/react";
import ModalProfile from "@/components/profile/modal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();
  console.log("session", session);
  return (
    <section>
      <nav className="bg-slate-100 h-20 w-full px-10 flex justify-between items-center">
        <h1 className="text-xl font-bold">My App</h1>
        <div className="flex gap-5">
          <ModalProfile />
        </div>
      </nav>
      {children}
    </section>
  );
}
