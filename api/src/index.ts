import express, { Request, Response } from "express";
import cors from "cors";
import LoggerService from "./middleware/logger.middleware";
import connection from "./config/database.config";
import UserController from "./user/user.controller";
import PostController from "./post/post.controller";

const app = express();
const port = 8000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello !");
});

app.use(LoggerService);

app.use("/users", UserController);

app.use("/posts", PostController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
