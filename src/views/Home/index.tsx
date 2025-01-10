import { HomePost } from "@/components/HomePost"
import * as PostService from "@/api/post-service"
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { FeedPost } from "@/models/feed-post";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Home() {

  const {toast} = useToast();

  const [posts, setPosts] = useState<FeedPost[]>([]);


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
    <ScrollArea className="h-screen px-10">
      <div className="flex flex-col gap-10">
        {
          posts.map((post, idx) => {
            return <HomePost key={idx} post={post}/>
          })
        }
      </div>
    </ScrollArea>
  )
}