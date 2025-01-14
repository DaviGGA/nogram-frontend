import { useAuthUserContext } from "@/context/authUserProvider"
import { cn } from "@/lib/utils"
import { Message, messageisFromUser } from "@/models/message"
import { useEffect, useState } from "react"

type Props = {
  message: Message
}


export function ChatMessage({ message }: Props) {

  const { profile } = useAuthUserContext();

  return (
    <div 
      className={cn("flex w-full gap-3 p-4", messageisFromUser(message, profile) ? "justify-end" : "justify-start")}
    >
      <div className={"flex max-w-[75%] flex-col gap-1"}>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">{message.sender.username}</span>
          <span className="text-xs text-gray-400">{message.created_at.toDateString()}</span>
        </div>

        <div
          className={cn(
            "rounded-lg px-4 py-2",
            messageisFromUser(message, profile!)
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          )}
        >
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    </div>
  )
}