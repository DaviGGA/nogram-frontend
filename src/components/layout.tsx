import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { useLocation } from "react-router-dom"

export default function Layout({ children }: { children: React.ReactNode }) {

  const location = useLocation();

  if (["/login", "/create-profile"].includes(location.pathname)) {
    return (
      <>{children}</>
    )
  }



  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className="flex gap-20">
        <SidebarTrigger />
        <div className="mt-10">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
