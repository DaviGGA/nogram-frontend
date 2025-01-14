import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarImage } from "./ui/avatar"
import { useAuthUserContext } from "@/context/authUserProvider";
import { useProfileImage } from "@/hooks/use-profile-image";
import { Home, SquarePlus, Mail } from "lucide-react";
import { useState } from "react";
import { CreatePostDialog } from "./create-post-dialog";

const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home
  },
  {
    title: "Mensagens",
    url: "/messages",
    icon: Mail
  }
]

export function AppSidebar() {

  const { profile } = useAuthUserContext();
  const { profileImage } = useProfileImage(profile?.image);

  const [openCreatePost, setOpenCreatePost] = useState(false);

  return (
    <> 
      <CreatePostDialog
      open={openCreatePost}
      setOpen={setOpenCreatePost}
      />

      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-[64px] h-[64px]">
              <AvatarImage src={profileImage} alt={profile?.username} />
            </Avatar>
            <div>
              <p className="text-xl font-bold">{profile?.first_name}</p>
              <p className="text-md text-muted-foreground">@{profile?.username}</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon className="me-2"/>
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem onClick={() => setOpenCreatePost(true)}>
                  <SidebarMenuButton>
                      <SquarePlus className="me-2"/>
                      <span>Criar postagem</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  )
}


