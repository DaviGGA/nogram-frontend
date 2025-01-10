import { usePostImage } from "@/hooks/use-post-image"
import { Post } from "@/models/post"

type Props = {
  post: Post
}

export function ProfilePost({ post }: Props) {
  const { postImage } = usePostImage(post.image)

  return (
    <div className=" cursor-pointer w-[400px] h-[400px]">
      <img className="w-full h-full" src={postImage}/>
    </div>
  )
}