import { Request, Response } from "express";

const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(username, password);
  res.send("signin");
};

const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(username, password);
  res.send("signup");
};

export default {
  signin,
  signup,
};
