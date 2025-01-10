import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useProfileImage } from "@/hooks/use-profile-image";
import { useEffect, useState } from "react";
import * as ProfileService from "../../api/user-service";
import * as PostService from "../../api/post-service";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { Profile } from "@/models/profile";
import { Button } from "@/components/ui/button";
import { Post } from "@/models/post";
import { ProfilePost } from "./components/Profilepost";

export function ProfilePage() {

  const [profile, setProfile] = useState<Profile>();
  const { profileImage } = useProfileImage(profile?.image);
  const { toast } = useToast();
  const { username } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);


  useEffect(() => {
    if(!username) return;
    loadProfile(username);
    loadPosts(username);
  }, [username])

  async function loadProfile(username: string) {
    const [err, response] = await ProfileService.getProfileByUsername(username);

    if(err) {
      toast({
        title: "Falha no perfil",
        description: "Não foi possível carregar esse perfil.",
        variant: "destructive"
      })
    }

    if(response) setProfile(response.data)
  }

  async function loadPosts(username: string) {
    const [err, response] = await PostService.getPostsByUser(username);

    if(err) {
      toast({
        title: "Falha no perfil",
        description: "Não foi possível carregar os posts desse perfil.",
        variant: "destructive"
      })
    }

    if(response) setPosts(response.data);
  }
  
  return (
    <div>
      <div className="flex gap-40">
        <Avatar className="w-[168px] h-[168px]">
          <AvatarImage src={profileImage}/>
        </Avatar>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <p className="text-xl font-bold">{profile?.username}</p>
            <Button>Seguir</Button>
          </div>
          <div className="flex gap-5">
            <p><span className="font-semibold">25</span> publicações</p>
            <p><span className="font-semibold">326</span> seguidores</p>
            <p><span className="font-semibold">124</span> seguindo</p>
          </div>
        </div>
      </div>
      <div className="mt-40 flex gap-3 flex-wrap">
        {posts.map(post => <ProfilePost post={post}/>)}
      </div>
    </div>
  )
}