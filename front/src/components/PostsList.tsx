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
    <div>
      <ul>
        {postsList.map((post) => (
          <CardPost post={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
