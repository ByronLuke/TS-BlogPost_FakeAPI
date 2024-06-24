import { type ReactNode, useEffect, useState } from "react";
import { get } from "./util/http";
import BlogPosts, { BlogPost } from "./components/BlogPosts.tsx";
import fetchingImage from './assets/data-fetching.png'

type RawDataBlogPost = {
  id: number;
  userId: string;
  title: string;
  body: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();

  useEffect(() => {
    async function fetchPosts() {
      const data = (await get(
        "https://jsonplaceholder.typicode.com/posts"
      )) as RawDataBlogPost[];

      const blogPosts : BlogPost[]= data.map((rawPost) => {
        return {
          id: rawPost.id,
          title: rawPost.title,
          text: rawPost.body,
        };
      });

      setFetchedPosts(blogPosts);
    }
    fetchPosts();
  }, []);

  let content : ReactNode;

  if(fetchedPosts){
    content = <BlogPosts posts={fetchedPosts}/>
  }

  return <main>
    <img src={fetchingImage} alt="Abstract Data fetching image process"/>
  {content}
  </main>;
}

export default App;
