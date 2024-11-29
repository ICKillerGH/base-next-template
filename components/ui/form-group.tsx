import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export default function FormGroup({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div {...props} className={cn("mb-6 group w-full", className)} />;
}
