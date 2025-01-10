import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Ellipsis, Heart, Send, MessageCircle, Bookmark  } from 'lucide-react';
import { Button } from "../ui/button";
import { useProfileImage } from "@/hooks/use-profile-image";
import { usePostImage } from "@/hooks/use-post-image";
import * as LikeService from "@/api/like-service";
import { useToast } from "@/hooks/use-toast";
import { FeedPost } from "@/models/feed-post";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DialogPost } from "../DialogPost";

type Props = {
  post: FeedPost
}

export function HomePost({post}: Props) {
  const { profileImage } = useProfileImage(post.profile.image);
  const { postImage } = usePostImage(post.image);

  const [isLiked, setIsliked] = useState(post.is_liked);
  const [likeCount, setLikeCount] = useState(post.likes.length);

  const [openDialogPost, setOpenDialogPost] = useState(false);

  const {toast} = useToast();

  async function onLikeClick() {
    
    const [err, response] = await LikeService.likePost(post.id);

    if(err) {
      toast({
        title: "Erro ao curtir",
        description: "Não foi possível curtir a postagem.",
        variant: "destructive"
      })
    }

    if(response) {
      const isLiked = response.data
      
      setIsliked(isLiked)

      const likeCounterAdd = isLiked ? 1 : -1
      setLikeCount(prev => prev + likeCounterAdd)
    }
  }

  return (
    <>
      <DialogPost
        open={openDialogPost}
        setOpen={setOpenDialogPost}
        post={post}
      />
      <Card className="w-[500px]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <Link to={`/profile/${post.profile.username}`}>
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage src={profileImage}/>
                </Avatar>
                <p className="text-sm font-medium">{post.profile.username}</p>
              </div>
            </Link>
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
              <Button onClick={onLikeClick} variant={"ghost"} size={"icon"}>
                <Heart fill={isLiked ? "red" : "none"} strokeWidth={isLiked ? 0 : 2}/>
              </Button>
              <Button onClick={() => setOpenDialogPost(true)} variant={"ghost"} size={"icon"}>
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
          <p className="text-sm font-medium">{likeCount} curtidas</p>
          <p className="break-all">
            <span className="font-medium">{post.profile.username}</span> {post.description}
          </p>
        </CardFooter>
      </Card>
    </>
  )
}