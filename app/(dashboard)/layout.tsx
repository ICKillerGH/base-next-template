import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./components/app-sidebar";
import { getCurrentSessionOrRedirect } from "@/lib/session";

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
        <nav className="flex items-center px-6 h-header bg-sidebar border-b border-sidebar">
          <SidebarTrigger />
        </nav>

        <section className="p-6">{children}</section>
      </main>
    </SidebarProvider>
  );
}
