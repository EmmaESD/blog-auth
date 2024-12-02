import { Router } from "express";
import PostService from "./post.service";

const PostController = Router();

PostController.get("/", PostService.getAll);
PostController.post("/", PostService.create);
PostController.get("/:id", PostService.getOne);
PostController.delete("/:id", PostService.remove);
PostController.put("/:id", PostService.update);

export default PostController;
