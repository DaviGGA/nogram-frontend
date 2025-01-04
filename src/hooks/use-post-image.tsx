import { useEffect, useState } from "react";
import { getPostImage } from "@/api/post-service";


export function usePostImage(image: string | undefined) {
  const [postImage, setPostImage] = useState<string>("");

  useEffect(() => {
    if(!image) return 
    getAndSetPostImage(image);
  }, [image])

  async function getAndSetPostImage(image: string) {
    const [_, response] = await getPostImage(image);
    if(!response) return 
    
    const fileReader = new FileReader();

    fileReader.onload = event => {
      setPostImage(event.target?.result as string)
    }

    fileReader.readAsDataURL(response);
  }

  return {postImage}
  
}