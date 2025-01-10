import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { usePostImage } from "@/hooks/use-post-image"
import { FeedPost } from "@/models/feed-post"
import { UseStateSet } from "@/types/UseStateSet"
import { Avatar, AvatarImage } from "../ui/avatar"
import { useProfileImage } from "@/hooks/use-profile-image"
import { Bookmark, Ellipsis, Heart, MessageCircle, Send } from "lucide-react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import * as CommentService from "@/api/comment-service"
import * as LikeService from "@/api/like-service";
import { toast } from "@/hooks/use-toast"
import { Comment } from "./components/Comment"
import { ScrollArea } from "../ui/scroll-area"
import { useAuthUserContext } from "@/context/authUserProvider"

type Props = {
  open: boolean,
  setOpen: UseStateSet<boolean>,
  post: FeedPost
}

export function DialogPost({open, setOpen, post}: Props) {

  const { postImage } = usePostImage(post.image);
  const { profileImage } = useProfileImage(post.profile.image);

  const { profile } = useAuthUserContext();

  const [isLiked, setIsliked] = useState(post.is_liked);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  
  const [comments, setComments] = useState(post.comments)
  const [commentInput, setCommentInput] = useState("");

  async function comment(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if(event.key !==  "Enter") return;
    const [err, response] = await CommentService.commentPost(commentInput, post.id);

    if(err) {
      return toast({
        title: "Erro no comentário",
        description: "Algo ocorreu e não foi possível comentar nessa postagem.",
        variant: "destructive"
      })
    }

    if(response) {
      setCommentInput("");
      setComments([...comments, {text: commentInput, profile: profile!}])
    }
  }

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
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="w-10/12">
      <div className="flex gap-5">
        <img className="w-1/2"src={postImage} alt="" />
        <div className="w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-3 border-b mb-5">
              <div className="flex gap-3 items-center">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={profileImage}/>
                </Avatar>
                <p className="font-semibold">{post.profile.username}</p>
              </div>
              <Ellipsis className="cursor-pointer"/>
            </div>
            <p className="break-all">
              <span className="font-medium">{post.profile.username}</span> {post.description}
            </p>
            <ScrollArea className="mt-5 h-[600px]">
              <div className="flex flex-col gap-3">
                {comments.map(comment => <Comment comment={comment}/>)}
              </div>
            </ScrollArea>
          </div>
          <div>
            <div className="flex justify-between">
              <div className="flex">
                <Button onClick={onLikeClick}  variant={"ghost"} size={"icon"}>
                  <Heart fill={isLiked ? "red" : "none"} strokeWidth={isLiked ? 0 : 2}/>
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
            <p className="text-sm font-medium">{likeCount} curtidas</p>
            <Textarea
            onChange={e => setCommentInput(e.target.value)}
            onKeyDown={comment}
            value={commentInput}
            className="mt-3"
            placeholder="Adicione um comentário..."
            />
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
  )
}