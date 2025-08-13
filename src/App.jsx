import Header from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function App() {
  return (
    <>
      <SidebarProvider>
        <div className="flex flex-col min-h-screen">
          <header className="w-full flex justify-center items-center">
            <Header />
          </header>
          <div className="flex flex-1">
            <AppSidebar />
            <main className="flex-1 p-4">
              {/* ...main content goes here... */}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
