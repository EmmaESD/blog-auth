import express, { Request, Response } from "express";
import cors from "cors";
import UserController from "./user/user.controller";
import PostController from "./post/post.controller";
import AuthController from "./auth/auth.controller";
import logger from "./middleware/logger.middleware";
import authMiddleware from "./middleware/auth.middleware";
import { IUser } from "./user/user.types";

const app = express();
const port = 8000;

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello !");
});

app.use(logger);

app.use("/auth", AuthController);

app.use("/users", UserController);

app.use("/posts", PostController);

app.get("/private", authMiddleware, (req, res) => {
  console.log("Get user with authMiddleware: ", req.user);
  res.send("Private route");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
