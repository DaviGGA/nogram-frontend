import { Like } from "./like"
import { User } from "./user"

export type Post = {
  id: number,
  image: string,
  description: string,
  user: User,
  likes: Omit<Like, "post">[]
}