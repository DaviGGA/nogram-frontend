import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { useLocation } from "react-router-dom"

export default function Layout({ children }: { children: React.ReactNode }) {

  const location = useLocation();

  if (["/login", "/create-profile", "/signup"].includes(location.pathname)) {
    return (
      <>{children}</>
    )
  }



  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarTrigger />
      <main className="w-full">
        <div className="w-full mt-10">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
