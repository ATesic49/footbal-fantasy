"use server";
import { cache } from "react";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

// Function to search for players
async function functionSearchPl() {
  return await prisma.fudbaler.findMany({
    select: {
      id: true,
      cena: true,
      nadimak: true,
      odeljenje: true,
      ime: true,
      prezime: true,
      slika: true,
    },
  });
}
export const searchPlayers = cache(functionSearchPl);

export interface ChangeFootballerProps {
  userId: string;
  fudbalerId: number;
  bioFudbalerId: number;
}

// Function to change footballer and update user's balance
export async function changeFootballer(
  userId: string,
  fudbalerId: number,
  bioFudbalerId: number,
) {
  // Fetch the prices of both footballers before the transaction
  const bioFudbaler = await prisma.fudbaler.findUnique({
    where: { id: bioFudbalerId },
    select: { cena: true },
  });

  const fudbaler = await prisma.fudbaler.findUnique({
    where: { id: fudbalerId },
    select: { cena: true },
  });

  // Ensure both footballers exist
  if (!bioFudbaler || !fudbaler) {
    throw new Error("Ne postoje ovi fudbaleri");
  }
  // const updateFudbaler = async () =>
  //   prisma.userFudbaler.update({
  //     where: {
  //       fudbalerId_userId: { fudbalerId: bioFudbalerId, userId },
  //     },
  //     data: {
  //       fudbalerId,
  //     },
  //   });
  // Now perform the transaction with Prisma promises
  await prisma.$transaction([
    // Update the UserFudbaler with the new footballer ID
    prisma.userFudbaler.update({
      where: {
        fudbalerId_userId: { fudbalerId: bioFudbalerId, userId },
      },
      data: {
        fudbalerId,
      },
    }),

    // Update the User's balance (pare) based on footballer prices
    prisma.user.update({
      where: { id: userId },
      data: {
        pare: {
          increment: bioFudbaler.cena - fudbaler.cena,
        },
      },
    }),
  ]);

  revalidatePath("/");
}
