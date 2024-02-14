import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-20 p-24 bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className="font-bold text-8xl text-center text-white">
        welcome to my app
      </h1>
      <Link href="/auth/signin">
        <Button size="lg">Go app </Button>
      </Link>
    </main>
  );
}
