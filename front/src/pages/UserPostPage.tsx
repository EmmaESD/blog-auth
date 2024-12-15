import { useState, useEffect } from "react";
import { PostType } from "../types/post.type";
import { findByUser } from "../services/post.service";

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await findByUser();
        setUserPosts(data.posts);
      } catch (error) {
        console.error("Erreur lors du chargement des posts", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Mes Posts</h1>
      {userPosts.length > 0 ? (
        userPosts.map((post: PostType) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <p>Aucun post trouvé.</p>
      )}
    </div>
  );
};

export default UserPosts;
