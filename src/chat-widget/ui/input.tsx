import type { InputHTMLAttributes } from "react";
import { cn } from "../lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-full border border-slate-300 bg-white px-4 text-sm",
        className
      )}
      {...props}
    />
  );
}
