import { Profile } from "@/models/profile"

export type Message = {
  content: string
  sender: Profile
  created_at: Date
}

export function messageisFromUser(
  message: Message, 
  loggedProfile: Profile | undefined
): boolean {
  if(!loggedProfile) return false
  return message.sender.username === loggedProfile.username
}