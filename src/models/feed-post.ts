import { Post } from "./post"
import { Profile } from "./profile"

export type FeedPost = Post & {
  profile: Profile,
  is_liked: boolean
}