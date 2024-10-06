"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { changeFootballer } from "@/lib/actions";
import { Fudbaler } from "@prisma/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Coins, Repeat2, User } from "lucide-react";
import { UpdateSession, useSession } from "next-auth/react";
import Image from "next/image";

import React, { useState } from "react";
interface DropdownKarticaIgracaProps {
  disabled?: boolean;
  fudbaler?: Fudbaler;
  bioFudbaler?: Fudbaler;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  update: UpdateSession;
}
const DropdownKarticaIgraca = ({
  fudbaler,
  bioFudbaler,
  setOpen,
  update,
}: DropdownKarticaIgracaProps) => {
  const pare = useSession()?.data?.user.pare;
  const bioFudbalerCena = bioFudbaler?.cena;

  const { toast } = useToast();
  function isDisabled() {
    if (pare && bioFudbalerCena && fudbaler) {
      return pare + bioFudbalerCena <= fudbaler?.cena;
    } else {
      return true;
    }
  }
  const userId = useSession().data?.user.id;
  function handleChange() {
    if (userId && fudbaler?.id && bioFudbaler?.id) {
      setChangeState({ ...changeState, pending: true });
      changeFootballer(userId, fudbaler.id, bioFudbaler.id).then(() => {
        setChangeState({ pending: false, success: true, error: false });
        update();
        setOpen(false);
        toast({
          title: "Success",
          description: "Igrac zamenjen bre! ",
        });
      });
    }
  }
  const [changeState, setChangeState] = useState({
    pending: false,
    success: false,
    error: false,
  });

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-start justify-start gap-4">
        <div
          className={`relative rounded-lg bg-gray-300 outline outline-0 outline-orange-600 duration-150 group-focus:outline-4`}
        >
          {fudbaler?.slika ? (
            <Image
              width={50}
              height={50}
              className="z-10 aspect-square rounded-lg object-cover"
              alt=""
              src={`/slikeFudbalera/${fudbaler.slika}.jpeg`}
            />
          ) : (
            <User size={50} className="text-gray-700" />
          )}
        </div>
        <div className="flex h-full flex-col items-start justify-start gap-1">
          <h3 className="font-medium text-gray-700">
            {`${fudbaler?.ime}  ${fudbaler?.prezime}` || "Aleksa Tesic"}

            <span className="mx-2 text-sm font-normal text-gray-400">
              {fudbaler?.odeljenje}
            </span>
          </h3>
          <p className="text-sm text-gray-500">{fudbaler?.nadimak || ""}</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-start">
          {fudbaler?.cena || 36}
          <Coins className="text-yellow-500" />
        </div>
        <Button
          onClick={handleChange}
          disabled={isDisabled()}
          variant={"default"}
          className="bg-orange-500"
        >
          {changeState.pending ? (
            <ReloadIcon className="animate-spin repeat-infinite" />
          ) : (
            <Repeat2 />
          )}
        </Button>
      </div>
    </div>
  );
};

export default DropdownKarticaIgraca;
