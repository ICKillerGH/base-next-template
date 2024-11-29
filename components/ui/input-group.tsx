import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export interface InputGroupProps extends PropsWithChildren {}

export default function InputGroup({ children }: InputGroupProps) {
  return (
    <div
      data-slot="input"
      className={[
        "relative grid grid-cols-[2rem_minmax(0,_1fr)_2rem] w-full",
        "[&>[data-slot=icon]]:row-start-1 [&>[data-slot=icon]]:place-self-center [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:text-gray-400",
        "[&>[data-slot=icon]:first-child]:col-start-1",
        "[&>[data-slot=icon]:last-child]:col-start-3",
        "[&>[data-slot=input]]:col-span-3 [&>[data-slot=input]]:col-start-1 [&>[data-slot=input]]:row-start-1",
        "has-[[data-slot=icon]]:[&>[data-slot=input]]:pl-8",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
