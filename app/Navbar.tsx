import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { User, Coins, AlignRightIcon, Trophy, Home } from "lucide-react";
import bg from "@/app/assets/imgs/bg.jpg";

import Image from "next/image";
import DropdownNavbar from "./components/DropdownNavbar";
import {
  SheetTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import LoadingButton from "@/components/ui/LoadingButton";
import Link from "next/link";

const Navbar = async () => {
  const session = await getSession();

  const user = session?.user;

  async function updateUsername(props: FormData) {
    "use server";
    const newUsername = props.get("username") || session?.user.name;
    const name = newUsername?.toString();
    if (!session?.user?.id) return;
    await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        name,
      },
    });
    revalidatePath("/");
  }

  //TODO: NAPRAVI CUSTOM SIGNIN STRANICU I OSIGURAJ OV STRANICU
  // if (!session) redirect("/api/auth/signin");

  return (
    <Sheet>
      <div className="left-0 right-0 top-0 z-10 flex items-center justify-between p-4 backdrop-blur-sm md:px-10">
        <SheetTrigger asChild>
          <div className="group relative flex items-center justify-center gap-2 rounded-lg p-2">
            <Image
              src={bg}
              className="absolute left-0 top-0 -z-10 h-full w-full rounded-lg object-cover opacity-0 brightness-75 transition-opacity group-hover:opacity-80"
              alt=""
            ></Image>
            {user?.image ? (
              <Image
                alt=""
                src={user.image}
                width={250}
                className="aspect-square w-12 rounded-full object-cover object-center"
                height={250}
              />
            ) : (
              <User size={42} className="text-gray-300" />
            )}
            <div className="gap- flex flex-col items-start justify-center">
              <h2 className="font-medium text-gray-300">
                {user?.name || "sa ljubavlju od mene :)"}
              </h2>
              <div className="flex items-center gap-1 text-sm">
                {" "}
                <span className="text-gray-300">{user?.pare || 460}</span>
                <Coins className="text-yellow-500" />
              </div>
            </div>
          </div>
          {/* <DropdownNavbar /> */}
        </SheetTrigger>
        <div className="flex items-center justify-center gap-4">
          <Link href={"/"}>
            <Home size={32} className="text-gray-200" />
          </Link>
          <Link href={"/leaderboard"}>
            <Trophy size={32} className="text-gray-200" />
          </Link>
        </div>
      </div>
      <SheetContent className={"min-h-screen"} side={"right"}>
        <SheetHeader className="mb-2">
          <SheetTitle>Account Settings</SheetTitle>
        </SheetHeader>

        <SheetDescription className="mb-4">
          Change display name, or log out.{" "}
          <Dialog>
            <DialogTrigger>*</DialogTrigger>
            <DialogContent className="text-xs">
              (mrzelo me je da dodajem jos stvari, a i ovo ti je previse)
            </DialogContent>
          </Dialog>
        </SheetDescription>
        <form
          action={updateUsername}
          className="mb-6 mt-6 flex w-full flex-col gap-1 backdrop-blur-sm"
        >
          <div className="flex items-center justify-start gap-2 rounded-lg p-2">
            {user?.image ? (
              <Image
                alt=""
                src={user.image}
                width={250}
                className="aspect-square w-12 rounded-full"
                height={250}
                quality={100}
              />
            ) : (
              <User size={50} className="min-w-10 text-gray-500" />
            )}
            <div className="flex flex-col items-start justify-center">
              <Input
                defaultValue={user?.name || "Aleksa Tesic"}
                name="username"
                type="text"
              />
            </div>
          </div>
          <LoadingButton className="w-full" type="submit">
            Change
          </LoadingButton>
          {/* <DropdownNavbar /> */}
        </form>
        <Separator className="relative">
          <p className="absolute left-1/2 top-1/2 w-fit -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-400">
            or
          </p>
        </Separator>
        <SheetFooter className="mt-6">
          <form action={logOut} className="w-full">
            <Button className="w-full" type="submit" variant={"destructive"}>
              Log out
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;

async function logOut() {
  "use server";
  await signOut();
}
