import { useEffect } from "react";
import { PostType } from "../types/post.type";
import CardPost from "./CardPost";

type PostsListProps = {
  postsList: PostType[];
  fetchPosts: () => void;
};

const PostsList = ({ postsList, fetchPosts }: PostsListProps) => {
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex overflow-x-auto space-x-4 w-full pb-4">
      {postsList.map((post) => (
        <div className="flex-shrink-0">
          <CardPost post={post} key={post.id} />
        </div>
      ))}
    </div>
  );
};

export default PostsList;
