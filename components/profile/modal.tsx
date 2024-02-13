"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ModalProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSignOut = () => {
    signOut({
      redirect: false,
    }).then(() => {
      router.push("/auth/signin");
    });
  };

  return (
    <Sheet>
      <SheetTrigger className="bg-black text-white p-2 rounded-md">
        View Profile
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <SheetHeader>
          <SheetTitle>
            {session ? `Welcome, ${session.user?.name}` : "Welcome"}
          </SheetTitle>
        </SheetHeader>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </SheetContent>
    </Sheet>
  );
};

export default ModalProfile;
