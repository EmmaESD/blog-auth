import { Request, Response, Router } from "express";
import UserService from "./user.service";

const UserController = Router();

UserController.get("/", UserService.getAll);
UserController.post("/", UserService.create);
UserController.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.getOne(+id);
  if (!user) {
    res.status(404).send("User not found");
  }

  res.send(user);
});
UserController.get("/:id", UserService.update);
UserController.get("/:id", UserService.remove);

export default UserController;
