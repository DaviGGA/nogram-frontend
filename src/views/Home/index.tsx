import { HomePost } from "@/components/HomePost"
import * as PostService from "@/api/post-service"
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { PostProfile } from "@/models/post-profile";

export function Home() {

  const {toast} = useToast();

  const [posts, setPosts] = useState<PostProfile[]>([]);


  useEffect(() => {
    loadPosts();
  }, [])

  async function loadPosts() {
    const [err, response] = await PostService.getFeed();

    if (err) {
      toast({
        title: "Erro nos posts",
        description: "Algo ocorreu e não foi possível carregar o seu feed."
      })
    }

    if (response) setPosts(response.data)
  }


  return (
    <div>
      {
        posts.map((post, idx) => {
          return <HomePost key={idx} post={post}/>
        })
      }
    </div>
  )
}