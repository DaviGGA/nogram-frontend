import { useEffect, useState } from "react";
import blankProfile from "@/assets/imgs/blank-profile-picture.png"
import { getProfileImage } from "@/api/user-service";


export function useProfileImage(image: string | undefined) {
  const [profileImage, setProfileImage] = useState<string>(blankProfile);

  useEffect(() => {
    if(!image) return 
    getAndSetProfileImage(image);
  }, [image])

  async function getAndSetProfileImage(image: string) {
    const [_, response] = await getProfileImage(image);
    if(!response) return 
    
    const fileReader = new FileReader();

    fileReader.onload = event => {
      setProfileImage(event.target?.result as string)
    }

    fileReader.readAsDataURL(response);
  }

  return {profileImage}
  
}