import { Router, Request, Response } from "express";
import PostService from "./post.service";

const PostController = Router();

PostController.get("/", PostService.getAll);
PostController.post("/", async (req: Request, res: Response) => {
  const { title, image, content } = req.body;
  const postDTO = { title, image, content };
  const user = await PostService.create(postDTO);

  res.status(201).send(user);
});
PostController.get("/:id", PostService.getOne);
PostController.delete("/:id", PostService.remove);
PostController.put("/:id", PostService.update);

export default PostController;
