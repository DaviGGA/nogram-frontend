import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { UserChat } from "./components/UserChat";
import { Message } from "@/models/message";
import { ChatMessage } from "./components/ChatMessage";
import { useParams } from "react-router-dom";
import * as UserService from "@/api/user-service";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useProfileImage } from "@/hooks/use-profile-image";
import { useAuthUserContext } from "@/context/authUserProvider";
import { Textarea } from "@/components/ui/textarea";
import { ProfileUserResponse } from "@/api/user-service";

type ReceivedMessage = {sender: string, message: string};

export function Messages() {

  const { username } = useParams();
  const [chatProfile, setChatProfile] = useState<ProfileUserResponse | undefined>();

  const { profileImage } = useProfileImage(chatProfile?.image);
  const { profile } = useAuthUserContext();

  const { toast } = useToast();

  const [socket, setSocket] = useState<Socket>();

  const [messageInput, setMessageinput] = useState("");
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState([])

  useEffect(() => {
    if(!chatProfile || !profile || !socket) return; 
    
    socket?.emit("join room", {
      sender: profile.username, 
      receiver: chatProfile.username
    })
    
    socket.on("chat message", onReceiveMessage);
  },[chatProfile, profile,socket])

  useEffect(() => {
    const socket = io("http://localhost:3002");
    setSocket(socket);

    if(!username) {
      setChatProfile(undefined);
      return
    }
    
    if(profile?.username == username) {
      setChatProfile(undefined)
      return
    }

    loadChatProfile(username);
    
  }, [username])

  async function loadChatProfile(username: string) {
    const [err, response] = await UserService.getProfileByUsername(username);

    if(err?.name === "ProfileNotFoundException") {
      setChatProfile(undefined)
      return
    }

    if(err) {
      toast({
        title:"Erro no chat",
        description: "Algo ocorreu e não foi possível buscar um perfil para conversar"
      })
      return
    }

    if(response) {
      console.log(response);
      setChatProfile(response.data)
    }
      
  }

  async function sendMessage(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if(e.key !== "Enter") return;
    socket?.emit("send message", {
      sender: profile?.username,
      receiver: chatProfile?.username,
      message: messageInput
    });
    setMessageinput("");
  }

  function onReceiveMessage({message, sender}: ReceivedMessage)  {

    const newMessage: Message = {
      content: message,
      sender: sender === profile?.username ? profile! : chatProfile!,
      created_at: new Date()
    }

    setMessages(prev => [...prev, newMessage])
  }


  return (
    <div>
      <h1 className="text-2xl font-bold mb-10">Caixa de mensagens</h1>
      <div className="flex gap-3">
        <ScrollArea className="h-screen w-1/6">
          <div className="flex flex-col gap-3">
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>  
          </div>
        </ScrollArea>
        <div className="w-full flex flex-col justify-between pb-5 px-5">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <Avatar className="w-14 h-14">
                <AvatarImage src={profileImage}/>
              </Avatar>
              <p className="font-semibold">{chatProfile?.username}</p>
            </div>
            <ScrollArea className="h-[800px]">
              {messages.map((message, idx) => <ChatMessage key={idx} message={message}/>)}
            </ScrollArea>
          </div>
          <Textarea
          value={messageInput}
          onChange={e => setMessageinput(e.target.value)}
          onKeyDown={sendMessage}
          />
        </div>
      </div>
    </div>
  )
}