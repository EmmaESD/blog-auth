import { useState } from "react";
import PostsList from "../components/PostsList";
import { PostType } from "../types/post.type";
import { findAll } from "../services/post.service";

const HomePage = () => {
  const [postsList, setPostsList] = useState<PostType[]>([]);

  const fetchPosts = async () => {
    try {
      const posts = await findAll();
      setPostsList(posts);
    } catch (error) {
      console.log("Error to fetch posts", error);
    }
  };
  return (
    <section>
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-bold">Liste des posts</h1>
        <PostsList postsList={postsList} fetchPosts={fetchPosts} />
      </div>
    </section>
  );
};

export default HomePage;
