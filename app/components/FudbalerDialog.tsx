"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DropdownKarticaIgraca from "./DropdownKarticaIgraca";
import { Separator } from "@/components/ui/separator";
import { Fudbaler } from "@prisma/client";
import { useSession } from "next-auth/react";
interface FudbalerDialogProps {
  fudbaler: Fudbaler;
  sviFudbaleri?: Fudbaler[];
}

const FudbalerDialog = ({ fudbaler, sviFudbaleri }: FudbalerDialogProps) => {
  const { data: session, update } = useSession();
  const fudbalerIds = session?.user?.fudbaler?.map(
    (fudbaler) => fudbaler.fudbalerId,
  );
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-8 bg-orange-600 font-medium">Change</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-medium">Promeni Igraca</DialogTitle>
        </DialogHeader>
        <Input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Ime Igraca"
        />
        <Separator />
        <div className="flex max-h-64 w-full flex-col gap-4 overflow-y-scroll">
          {sviFudbaleri?.map((fudbalerr) => {
            if (
              fudbalerr.ime.toLowerCase().includes(input.toLowerCase()) ||
              fudbaler.prezime.toLowerCase().includes(input.toLowerCase()) ||
              fudbaler.nadimak?.toLowerCase().includes(input.toLowerCase()) ||
              fudbaler.odeljenje.toLowerCase().includes(input.toLowerCase())
            ) {
              if (fudbaler.golman) {
                if (!fudbalerIds?.includes(fudbalerr.id) && fudbalerr.golman) {
                  return (
                    <DropdownKarticaIgraca
                      setOpen={setOpen}
                      key={fudbalerr.id}
                      fudbaler={fudbalerr}
                      bioFudbaler={fudbaler}
                      update={update}
                    />
                  );
                }
              } else {
                if (!fudbalerIds?.includes(fudbalerr.id) && !fudbalerr.golman) {
                  return (
                    <DropdownKarticaIgraca
                      setOpen={setOpen}
                      key={fudbalerr.id}
                      fudbaler={fudbalerr}
                      bioFudbaler={fudbaler}
                      update={update}
                    />
                  );
                }
              }
            }
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FudbalerDialog;
