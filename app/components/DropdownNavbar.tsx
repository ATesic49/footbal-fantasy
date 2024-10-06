"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const DropdownNavbar = () => {
  const pathname = usePathname();
  const [position, setPosition] = React.useState(pathname);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AlignRightIcon className="text-gray-300" size={45} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="/">
            <Link href="/">Kuća</Link>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="/leaderboard">
            <Link href="/leaderboard">Leaderboard</Link>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="/table">
            <Link href="/table">Table</Link>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownNavbar;
