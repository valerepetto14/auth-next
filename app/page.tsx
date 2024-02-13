import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-20 p-24">
      <h1>welcome to landing page</h1>
      <Link href="/auth/signin">
        <Button>Sign in</Button>
      </Link>
    </main>
  );
}
