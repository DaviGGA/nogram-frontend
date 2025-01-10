import { Entity } from "@/types/Entity"
import { Post } from "./post"
import { Profile } from "./profile"

export type FeedPost = Entity<Post> & {
  profile: Entity<Profile>,
  is_liked: boolean
}