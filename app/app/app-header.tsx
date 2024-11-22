import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getCurrentSessionOrRedirect, invalidateSession } from "@/lib/session";
import { CircleUserIcon, KeyRoundIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import AppHeaderLogoutMenuItem from "./app-header-logout-menu-item";
import { Input } from "@/components/ui/input";

export default function AppHeader() {
  async function logoutAction(pathName: string) {
    "use server";

    const { session } = await getCurrentSessionOrRedirect();

    invalidateSession(session.id);

    revalidatePath(pathName);
  }

  return (
    <nav className="flex items-center gap-3 px-6 h-header bg-sidebar border-b border-sidebar">
      <SidebarTrigger />

      <Input placeholder="Buscar" className="w-[300px] h-9" />

      <div className="ml-auto flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <CircleUserIcon />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <KeyRoundIcon />
              Contraseña
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <AppHeaderLogoutMenuItem logoutAction={logoutAction} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
