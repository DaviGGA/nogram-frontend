import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Ellipsis, Heart, Send, MessageCircle, Bookmark  } from 'lucide-react';
import { Button } from "../ui/button";
import { PostProfile } from "@/models/post-profile";
import { useProfileImage } from "@/hooks/use-profile-image";
import { usePostImage } from "@/hooks/use-post-image";

type Props = {
  post: PostProfile
}

export function HomePost({post}: Props) {
  const { profileImage } = useProfileImage(post.profile.image);
  const { postImage } = usePostImage(post.image)

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={profileImage}/>
            </Avatar>
            <p className="text-sm font-medium">{post.profile.username}</p>
          </div>
          <Ellipsis className="cursor-pointer"/>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full bg-gray-400 h-[460px]">
          <img className="w-full h-full" src={postImage} alt="" />
        </div>
      </CardContent>
      <CardFooter className="block">
        <div className="w-full flex justify-between">
          <div className="flex">
            <Button variant={"ghost"} size={"icon"}>
              <Heart/>
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <MessageCircle/>
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <Send/>
            </Button>
          </div>
          <Button variant={"ghost"} size={"icon"}>
            <Bookmark/>
          </Button>       
        </div>
        <p className="text-sm font-medium">1.245 likes</p>
        <p className="break-all">
          <span className="font-medium">{post.profile.username}</span> {post.description}</p>
      </CardFooter>
    </Card>
  )
}