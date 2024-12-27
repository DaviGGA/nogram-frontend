import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Profile } from "@/types/Profile";
import * as userService from "@/api/user-service";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "@/models/user";

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

  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<User | undefined>();
  const [profile, setProfile] = useState<Profile | undefined>();

  useEffect(() => {

    verifyUserLogin();
  }, [location.pathname])

  const verifyUserLogin = async () => {

    const isAuthorizedRoutes = ["/login", "/signup"].includes(location.pathname);
    if (isAuthorizedRoutes) return
    
    const [userErr, userResponse] = await userService.getLoggedUser();

    if(userErr) {
      navigate("/login")
      return
    }

    if (userResponse) {
      setUser(userResponse.data);
    }

    const isCreateProfileRoute = location.pathname === "/create-profile";
    if(isCreateProfileRoute) return

    const [profileErr, profileResponse] = await userService.getLoggedUserProfile();

    if(profileErr) {
      navigate("/create-profile");
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