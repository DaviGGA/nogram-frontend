import { Avatar, AvatarImage } from "@/components/ui/avatar";
import blankProfile from "@/assets/imgs/blank-profile-picture.png"
import { Link } from "react-router-dom";

export function UserChat() {
  return (
    <Link to={`/messages/john.doe`} className="flex gap-3 hover:bg-slate-100 p-3 cursor-pointer rounded">
      <Avatar className="w-14 h-14">
        <AvatarImage src={blankProfile}/>
      </Avatar>
      <div>
        <p className="font-semibold">usuario.foda</p>
        <p className="opacity-50 text-sm truncate w-1/4">E ae man bora ali no benfica calma calabreso calabreso calabreso</p>
      </div>
    </Link>
  )
}