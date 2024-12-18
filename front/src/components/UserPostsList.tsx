import { useEffect, useState } from "react";
import { PostType } from "../types/post.type";
import CardPost from "./CardPost";

type PostsListProps = {
  postsList: PostType[];
  fetchPosts: () => void;
};

const UserPostsList = ({ postsList, fetchPosts }: PostsListProps) => {
  const [userPosts, setUserPosts] = useState<PostType[]>([]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userId = getUserIdFromToken(token);
      if (userId) {
        const filteredPosts = postsList.filter(
          (post) => post.user_id === userId
        );

        setUserPosts(filteredPosts);
      }
    }
  }, [postsList]);

  return (
    <div className="flex overflow-x-auto space-x-4 w-full pb-4">
      {userPosts.map((post) => (
        <div className="flex-shrink-0" key={post.id}>
          <CardPost post={post} />
        </div>
      ))}
    </div>
  );
};

const getUserIdFromToken = (token: string): number | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user_id;
  } catch (error) {
    console.error("Erreur lors du décodage du token:", error);
    return null;
  }
};

export default UserPostsList;
