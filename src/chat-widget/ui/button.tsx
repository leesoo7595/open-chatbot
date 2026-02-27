import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/utils";

const buttonClass =
  "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors";

const buttonSizeClass = {
  default: "h-10 px-4",
  lg: "h-11 px-5",
};

export function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = `${buttonClass} ${buttonSizeClass.default} ${className ? "" : ""}`;
  return <button className={cn(base, className)} {...props} />;
}
