"use client";
import React, { ComponentProps, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
type LoadingButtonProps = {
  className?: string;
  children: ReactNode;
} & ButtonProps;
const LoadingButton = ({ className, children }: LoadingButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button className={cn(`bg-orange-600`, className)} disabled={pending}>
      {pending ? (
        <LoaderCircle
          className="animate-spin stroke-[3px] text-gray-200"
          size={20}
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
