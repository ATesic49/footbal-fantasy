import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

import { User as UserImg } from "lucide-react";
import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";
export const revalidate = 60;
const page = async () => {
  const users = await prisma.user.findMany({
    orderBy: { poeni: "desc" },
  });
  await setTimeout(() => {}, 100);
  const session = await getSession();
  if (!session) redirect("/api/auth/signin?callbackUrl=/");
  const userID = session.user.id;

  return (
    <main className="relative flex h-full items-center justify-center">
      <Table className="z-20 mx-auto max-w-screen-sm overflow-hidden rounded-2xl bg-gray-100 p-4">
        <TableHeader className="h-16">
          <TableRow className="">
            <TableHead className="w-[100px] pl-4 font-bold text-gray-700">
              Pozicija
            </TableHead>
            <TableHead className="w-1/2 font-bold text-gray-700">
              Igrac
            </TableHead>
            <TableHead className="pr-4 text-right font-bold text-gray-700">
              Poeni
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-gray-600">
          {users.map((user, i) => {
            if (user.id === userID)
              return (
                <TableRow className="bg-green-200 hover:bg-green-200" key={i}>
                  <TableCell className="pl-4 font-bold text-gray-800">
                    {i + 1}.
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="relative flex aspect-square w-8 items-center justify-center rounded border-2 border-gray-700 bg-gray-200 p-0 text-center">
                        {user.image ? (
                          <Image
                            width={64}
                            height={64}
                            className="aspect-square w-16 rounded object-cover"
                            alt=""
                            src={user.image}
                          />
                        ) : (
                          <UserImg size={32} className="text-gray-600" />
                        )}
                      </div>
                      <p className="text-sm font-medium">{user?.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="pr-4 text-right text-lg">
                    {user.poeni}
                  </TableCell>
                </TableRow>
              );

            return (
              <TableRow className="" key={i}>
                <TableCell className="pl-4 font-bold text-gray-800">
                  {i + 1}.
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="relative flex aspect-square w-8 items-center justify-center rounded border-2 border-gray-700 bg-gray-200 p-0 text-center">
                      {user.image ? (
                        <Image
                          width={64}
                          height={64}
                          className="aspect-square w-16 rounded object-cover"
                          alt=""
                          src={user.image}
                        />
                      ) : (
                        <UserImg size={32} className="text-gray-600" />
                      )}
                    </div>
                    <p className="text-sm font-medium">{user?.name}</p>
                  </div>
                </TableCell>
                <TableCell className="pr-4 text-right text-lg">
                  {user.poeni}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
};

export default page;
