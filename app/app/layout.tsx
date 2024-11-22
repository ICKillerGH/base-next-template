import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./app-sidebar";
import { getCurrentSessionOrRedirect } from "@/lib/session";
import AppHeader from "./app-header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getCurrentSessionOrRedirect();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AppHeader />
        <section className="p-6">{children}</section>
      </main>
    </SidebarProvider>
  );
}