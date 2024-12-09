import { Router, Request, Response } from "express";
import PostService from "./post.service";
import { IPostDTO } from "./post.type";
import pool from "../config/database.config";

const PostController = Router();

PostController.get("/", PostService.getAll);
PostController.get("/user/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const posts = await PostService.getAllByUser(+userId);
    res.status(200).send(posts);
  } catch (error) {
    console.error("Error fetching posts by user:", error);
    res.status(500).send({ error: "Failed to fetch posts" });
  }
});
import authMiddleware from "../middleware/auth.middleware";

PostController.post(
  "/",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const { title, image, content } = req.body;
    const user_id = req.user?.id?.toString(); // L'ID de l'utilisateur provient du token décrypté

    if (!user_id) {
      res.status(400).send({ error: "User ID is missing" });
      return;
    }

    const postDTO: IPostDTO = { title, image, content, user_id };
    const newPost = await PostService.create(postDTO);

    if (!newPost) {
      res.status(500).send({ error: "Failed to create post" });
      return;
    }

    res.status(201).send(newPost);
  }
);

PostController.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await PostService.getOne(+id);
  if (!post) {
    res.status(404).send("User not found");
  }

  res.send(post);
});
PostController.delete(
  "/:id",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const user_id = req.user?.id;

    if (!user_id) {
      res.status(400).send({ error: "User ID is missing" });
      return;
    }

    const deletedPost = await PostService.remove(+id, user_id);

    if (deletedPost === undefined) {
      res.status(404).send({ error: "Post not found or not authorized" });
      return;
    }

    res.status(200).send({ message: "Post deleted successfully" });
  }
);

PostController.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const postPutDTO: IPostDTO = req.body;
    const updatedPost = await PostService.update(+id, postPutDTO);

    if (!updatedPost) {
      res.status(404).send({ error: "Post not found" });
      return;
    }

    res.status(200).send(updatedPost);
  } catch (error) {
    console.error("Error in PUT /:id:", error);
    res.status(500).send({ error: "Failed to update post" });
  }
});

export default PostController;
