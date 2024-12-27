import { CreateProfile } from "@/views/CreateProfile"
import { Login } from "@/views/Login"
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
    element: <div>HOME</div>
  }
]