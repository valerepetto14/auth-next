import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getUserByEmail, getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";

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
    signIn: async ({ user }) => {
      // const userbd = await getUserById(user.id as string);
      // console.log("userbd", userbd);
      // if (!userbd || !userbd.emailVerified) {
      //   console.log("userbd", userbd);
      //   return false;
      // }
      return true;
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
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.image = token.image || null;
        session.user.name = token.name;
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
