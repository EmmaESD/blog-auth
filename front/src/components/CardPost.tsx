import { PostType } from "../types/post.type";

type CardPostProps = {
  post: PostType;
};

const CardPost = ({ post }: CardPostProps) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.image} alt="" />
      <p>{post.content}</p>
    </div>
  );
};

export default CardPost;
