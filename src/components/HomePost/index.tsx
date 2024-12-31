import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from "../ui/avatar"
import blankProfile from "@/assets/imgs/blank-profile-picture.png"
import { Ellipsis, Heart, Send, MessageCircle, Bookmark  } from 'lucide-react';
import { Button } from "../ui/button";


export function HomePost() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={blankProfile}/>
            </Avatar>
            <p className="text-sm font-medium">John Dark Souls</p>
          </div>
          <Ellipsis className="cursor-pointer"/>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full bg-gray-400 h-[460px]">
        </div>
      </CardContent>
      <CardFooter className="block">
        <div className="w-full flex justify-between">
          <div className="flex">
            <Button variant={"ghost"} size={"icon"}>
              <Heart/>
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
        <p className="text-sm font-medium">1.245 likes</p>
        <p className="break-all">
          <span className="font-medium">john.dark.souls</span> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </p>
      </CardFooter>
    </Card>
  )
}