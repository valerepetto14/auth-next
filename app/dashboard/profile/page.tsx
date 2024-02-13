"use client";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Profile</h1>
      <h2>{JSON.stringify(session)}</h2>
    </div>
  );
};

export default Page;
