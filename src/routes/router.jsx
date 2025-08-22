import Header from "@/components/NavBar/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";

export default function Router() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div>
        <header className="w-full flex justify-center items-center">
          <Header />
        </header>
        <main>
          <SidebarTrigger />
          {/* ...existing children/components can go here... */}
        </main>
      </div>
    </SidebarProvider>
  );
}
