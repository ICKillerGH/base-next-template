"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  CircleUserIcon,
  ClipboardListIcon,
  HomeIcon,
  MessageSquareIcon,
  PackageOpenIcon,
  StoreIcon,
  TruckIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    groupLabel: "Mi cuenta",
    items: [
      { title: "Dashboard", uri: "/", icon: HomeIcon },
      { title: "Mi perfil", uri: "#", icon: CircleUserIcon },
    ],
  },
  {
    groupLabel: "Gestión de tienda",
    items: [
      { title: "Perfil de tienda", uri: "#", icon: StoreIcon },
      { title: "Productos", uri: "#", icon: PackageOpenIcon },
      { title: "Ventas", uri: "#", icon: ClipboardListIcon },
      { title: "Envios", uri: "#", icon: TruckIcon },
      { title: "Mensajes", uri: "#", icon: MessageSquareIcon },
    ],
  },
];

export default function AppSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="justify-center text-xl text-center font-semibold h-header">
        {open ? "Admin Template" : "A"}
      </SidebarHeader>
      <SidebarContent>
        {items.map((groupItem) => (
          <SidebarGroup key={groupItem.groupLabel}>
            <SidebarGroupLabel>{groupItem.groupLabel}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {groupItem.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.uri === pathname}
                      className={[
                        "h-10",
                        "data-[active=true]:bg-blue-100",
                        "data-[active=true]:font-medium",
                        "data-[active=true]:text-blue-600",
                      ].join(" ")}
                    >
                      <Link href={item.uri}>
                        <item.icon />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
