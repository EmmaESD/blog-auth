import { Request, Response } from "express";
import pool from "../config/database.config";
import { IUser, IUserDTO } from "./user.types";

const getAll = async (req: Request, res: Response) => {
  res.send("getAll user");
};

const getOneByUsername = async (username: string): Promise<IUser | null> => {
  const query = "SELECT * FROM public.users WHERE username = $1";
  const values = [username];

  const result = await pool.query(query, values);
  const user = result.rows[0];

  if (!user) {
    return null;
  }

  return user;
};

const getOneById = async (id: number): Promise<IUser | null> => {
  const query = "SELECT * FROM public.users WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    const user = result.rows[0];

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

const create = async (userDTO: IUserDTO) => {
  const query = "INSERT INTO public.users (username, password) VALUES ($1, $2)";
  const values = [userDTO.username, userDTO.password];

  try {
    await pool.query(query, values);

    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
};

const update = async (req: Request, res: Response) => {
  res.send("update user");
};

const remove = async (req: Request, res: Response) => {
  res.send("remove user");
};

export default {
  getAll,
  getOneById,
  create,
  update,
  remove,
  getOneByUsername,
};
