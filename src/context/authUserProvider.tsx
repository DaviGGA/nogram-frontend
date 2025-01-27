import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Profile } from "@/models/profile";
import * as userService from "@/api/user-service";
import { useLocation } from "react-router-dom";
import { User } from "@/models/user";
import { Entity } from "@/types/Entity";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: User | undefined
  profile: Profile | undefined
}

// as => garantindo o tipo;

export const AuthUserContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthUserProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const location = useLocation();

  const [user, setUser] = useState<Entity<User> | undefined>();
  const [profile, setProfile] = useState<Entity<Profile> | undefined>();

  useEffect(() => {

    verifyUserLogin();
  }, [location.pathname])

  const verifyUserLogin = async () => {

    const isAuthorizedRoutes = ["/login", "/signup"].includes(location.pathname);
    if (isAuthorizedRoutes) return
    
    const [userErr, userResponse] = await userService.getLoggedUser();

    if(userErr) {
      window.location.href = "/login"
      return
    }

    if (userResponse) {
      setUser(userResponse.data);
    }

    const isCreateProfileRoute = location.pathname === "/create-profile";
    if(isCreateProfileRoute) return

    const [profileErr, profileResponse] = await userService.getLoggedUserProfile();

    if(profileErr) {
      window.location.href = "/create-profile"
      return
    }

    if(profileResponse) {
      setProfile(profileResponse.data);
    }

  };

  return (
    <AuthUserContext.Provider
      value={{ user, profile }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUserContext = () => useContext(AuthUserContext);