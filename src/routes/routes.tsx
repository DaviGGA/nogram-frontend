import { CreateProfile } from "@/views/CreateProfile"
import { Home } from "@/views/Home"
import { Login } from "@/views/Login"
import { Messages } from "@/views/Messages"
import { ProfilePage } from "@/views/ProfilePage"
import { Signup } from "@/views/Signup"
import { ReactElement } from "react"

export type RouteElement = {
  path: string,
  element: ReactElement
}

export const routes: RouteElement[] = [
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/create-profile",
    element: <CreateProfile/>
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/profile/:username",
    element: <ProfilePage/>
  },
  {
    path: "/messages/:username?",
    element: <Messages/>
  }
]