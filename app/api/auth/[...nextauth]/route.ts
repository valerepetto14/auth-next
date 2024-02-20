import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getUserByEmail, getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      image: string;
      name: string;
    };
  }
}

const handler = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await getUserByEmail(credentials?.email as string);
        if (user) {
          const isValid = await bcrypt.compare(
            credentials?.password as string,
            user.password as string
          );
          if (isValid) {
            return { id: user.id, name: user.name, email: user.email };
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider !== "credentials") return true;
      const userbd = await getUserById(user.id as string);
      if (!userbd) return false;
      if (userbd.emailVerified) return true;
      return false;
    },
    jwt: async ({ token, user }) => {
      const userbd = await getUserById(token.sub as string);
      if (!userbd) return token;
      token = {
        email: userbd.email,
        role: userbd.role,
        image: userbd.image,
        id: userbd.id,
        name: userbd.name,
      };
      return token;
    },
    session: async ({ session, token }) => {
      if (token.id && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});

export { handler as GET, handler as POST };
