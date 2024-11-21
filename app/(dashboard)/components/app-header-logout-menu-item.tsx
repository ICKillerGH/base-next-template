"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AppHeaderLogoutMenuItem({
  logoutAction,
}: {
  logoutAction: (pathName: string) => Promise<void>;
}) {
  const pathName = usePathname();

  return (
    <DropdownMenuItem onClick={() => logoutAction(pathName)}>
      <LogOutIcon />
      Cerrar sesión
    </DropdownMenuItem>
  );
}
