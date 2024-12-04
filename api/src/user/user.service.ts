import { Request, Response } from "express";
import pool from "../config/database.config";

const getAll = async (req: Request, res: Response) => {
  res.send("getAll user");
};

const getOne = async (id: number) => {
  const query = "SELECT * FROM users WHERE id = $1";
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

const create = async (userDTO) => {
  const { username, password } = req.body;

  const query = "INSERT INTO users (username, password) VALUES ($1, $2)";
  const values = [username, password];

  try {
    await pool.query(query, values);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
  getOne,
  create,
  update,
  remove,
};
