import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import type { Provider } from "next-auth/providers";
import { Prisma } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";

const providers: Provider[] = [Google];
export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  events: {
    async createUser({ user }) {
      console.log("lrece");
      const existingFootbalers = await prisma.userFudbaler.findMany({
        where: { userId: user.id },
      });
      console.log(existingFootbalers);
      if (existingFootbalers.length === 0) {
        const ok = await prisma.userFudbaler.createMany({
          data: [
            {
              fudbalerId: 1,
              userId: user.id!,
              position: 1,
            },
            {
              fudbalerId: 2,
              userId: user.id!,
              position: 2,
            },
            {
              fudbalerId: 3,
              userId: user.id!,
              position: 3,
            },
            {
              fudbalerId: 4,
              kapiten: true,
              userId: user.id!,
              position: 4,
            },
            {
              fudbalerId: 5,
              userId: user.id!,
              position: 5,
            },
          ],
        });
        console.log(ok, "ok");
      }
    },
  },
  callbacks: {
    async session({ session, token, user }) {
      const realUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
        include: {
          fudbaler: {
            include: {
              fudbaler: true,
            },
          },
        },
      });

      if (realUser) {
        session.user.fudbaler = realUser.fudbaler;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
