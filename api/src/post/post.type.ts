export interface IPost {
  id: number;
  title: string;
  image: string;
  content: string;
  user_id: string;
}

export interface IPostDTO {
  title: string;
  image: string;
  content: string;
  user_id: string;
}
