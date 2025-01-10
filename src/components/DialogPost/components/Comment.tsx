import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useProfileImage } from "@/hooks/use-profile-image"
import { PostComment } from "@/models/post-comment"
import { Link } from "react-router-dom"

type Props = {
  comment: PostComment
}

export function Comment({ comment }: Props) {

  const { profileImage } = useProfileImage(comment.profile.image);

  return (
    <div className="flex gap-5">
      <Avatar className="w-10 h-10">
        <AvatarImage src={profileImage}/>
      </Avatar>
      <div>
        <p className="break-all">
          <Link to={`/profile/${comment.profile.username}`} className="font-semibold">{comment.profile.username}</Link>
          <span>{" "}{comment.text}</span></p>
      </div>
    </div>
  )
}