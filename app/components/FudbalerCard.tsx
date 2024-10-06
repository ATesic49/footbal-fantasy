"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import FudbalerDialog from "./FudbalerDialog";
import { cn } from "@/lib/utils";
import { Fudbaler } from "@prisma/client";
interface FudbalerCardProps {
  className?: string;
  kapiten?: boolean;
  ime?: string;
  fudbaler?: Fudbaler;
  sviFudbaleri?: Fudbaler[];
}
const FudbalerCard = ({
  className,
  kapiten = false,
  fudbaler,
  sviFudbaleri,
}: FudbalerCardProps) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={cn(
        "group absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 px-4 text-center",
        className,
      )}
      tabIndex={0}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {/* TODO: DODAJ POSLE KAPITENA  */}
      {/* {kapiten && (
        <div className="absolute left-0 top-0 z-10 aspect-square -translate-y-1/2 translate-x-1/3 rounded-md bg-red-500 px-1 font-medium text-white">
          C
        </div>
      )} */}
      <div
        className={`relative rounded-lg bg-gray-300 outline outline-0 outline-orange-600 duration-150 group-focus:outline-4`}
      >
        <div className="absolute right-0 top-0 flex aspect-square w-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded bg-orange-600 text-center text-xs text-white">
          {fudbaler?.cena}
        </div>
        <User size={50} className="text-gray-700" />
      </div>
      <div className="absolute left-1/2 top-[calc(100%_+_8px)] flex -translate-x-1/2 flex-col items-center gap-1 pl-1">
        <p className="select-none text-center text-sm font-semibold text-gray-800">
          {fudbaler ? (
            <> {fudbaler?.ime + " " + fudbaler?.prezime}</>
          ) : (
            "Aleksa Tesic"
          )}
        </p>
        <motion.div
          className=""
          initial={{ opacity: 0, y: -5, x: "00%" }}
          animate={
            active
              ? { opacity: 1, x: "0", y: 0 }
              : { opacity: 0, y: -5, x: "0" }
          }
        >
          {fudbaler && (
            <FudbalerDialog sviFudbaleri={sviFudbaleri} fudbaler={fudbaler} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FudbalerCard;
