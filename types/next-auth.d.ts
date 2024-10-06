import { Fudbaler, Prisma, UserFudbaler } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  type UserFootballersWithFootballlers = Prisma.UserFudbalerGetPayload<{
    include: {
      fudbaler: true;
    };
  }>;
  interface User {
    fudbaler: UserFootballersWithFootballlers[];
  }
  interface Session {
    user: {
      fudbaler: UserFootballersWithFootballlers[];
      pare: number;
    } & DefaultSession["user"];
  }
}
