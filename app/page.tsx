import court from "@/app/assets/imgs/court.jpg";
import Image from "next/image";
import FudbalerCard from "./components/FudbalerCard";
import { auth } from "@/auth";
import getSesstion from "@/lib/getSession";
import { prisma } from "@/lib/prisma";
import React from "react";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await getSesstion();
  if (!session) redirect("/api/auth/signin?callbackUrl=/");
  const fudbaleri = session?.user?.fudbaler;
  const sviFudbaleri = await prisma.fudbaler.findMany({});
  const classNames = [
    "left-[35%] top-[40%]",
    "left-[65%] top-[40%]",
    "left-[25%] top-[60%]",
    "left-[75%] top-[60%]",
    "bottom-[10%] left-1/2",
  ];

  return (
    <main className="relative flex h-full items-center justify-center">
      <div className="relative z-20 aspect-[667/1000] w-full max-w-screen-sm overflow-hidden rounded-2xl bg-gray-200 p-4">
        {session?.user?.fudbaler ? (
          <>
            {fudbaleri?.map((fudbaler, i) => (
              <FudbalerCard
                sviFudbaleri={sviFudbaleri}
                fudbaler={fudbaler.fudbaler}
                className={classNames[fudbaler.position - 1]}
                kapiten={fudbaler.kapiten}
                key={i}
              />
            ))}
          </>
        ) : (
          // ))
          <>
            <FudbalerCard className="left-[35%] top-[40%]" kapiten />
            <FudbalerCard className="left-[65%] top-[40%]" />
            <FudbalerCard className="left-[75%] top-[60%]" />
            <FudbalerCard className="left-[25%] top-[60%]" />
            <FudbalerCard className="bottom-[10%] left-1/2" />
          </>
        )}

        <Image
          src={court}
          className="mt-2 select-none rounded-2xl object-fill brightness-75"
          alt=""
        ></Image>
      </div>
    </main>
  );
}
