import client from "../config/database.config";
import { Request, Response } from "express";
import { IPostDTO } from "./post.type";
import pool from "../config/database.config";

const getAll = async (req: Request, res: Response) => {
  client.query("SELECT * from posts", function (error, results) {
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }

    res.status(200).send(results.rows);
  });
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("end point get one (id): ", id);

  const sql = "SELECT * FROM posts WHERE id = $1";
  const values = [id];

  try {
    const result = await client.query(sql, values);

    if (result.rows.length === 0) {
      res.status(404).send({ error: "User not found" });
      return;
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user", error);
    res.status(500).send({ error: "Error while fetching data" });
  }
};

const create = async (postDTO: IPostDTO) => {
  const values = [postDTO.title, postDTO.image, postDTO.content];

  const query =
    "INSERT INTO public.posts (title, image, content) VALUES ($1, $2, $3) RETURNING id";

  try {
    await pool.query(query, values);

    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("end point update (id): ", id);
  console.log("end point update (body): ", req.body);

  client.query("SELECT * FROM travel WHERE id = ?", [id], (error, results) => {
    console.log("results: ", results);
    console.log("error: ", error);
    if (error) {
      console.log("error: ", error);
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }
    if (Array.isArray(results) && results.length === 0) {
      res.status(404).send({ error: "Travel not found" });
      return;
    }

    if (Array.isArray(results) && results.length === 1) {
      const currentPost = results[0];
      const newPost = {
        ...currentPost,
        ...req.body,
      };

      console.log("newPost: ", newPost);

      const sqlUpdate =
        "UPDATE posts SET title = ?, image = ?, content = ?, WHERE id = ?";
      const values = [newPost.title, newPost.image, newPost.content, id];

      client.query(sqlUpdate, values, (error, results) => {
        if (error) {
          res.status(500).send({ error: "Error while updating data" });
          return;
        }

        res.status(200).send({ message: "Travel updated successfully" });
      });
    }
  });
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("end point delete (id): ", id);

  const sqlSelect = "SELECT * FROM posts WHERE id = $1"; // Utilisation de $1 pour PostgreSQL
  const sqlDelete = "DELETE FROM posts WHERE id = $1"; // Utilisation de $1 pour PostgreSQL
  const values = [id];

  try {
    const result = await client.query(sqlSelect, values);

    if (result.rows.length === 0) {
      res.status(404).send({ error: "Post not found" });
      return;
    }

    await client.query(sqlDelete, values);

    res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error during delete operation", error);
    res.status(500).send({ error: "Error while deleting post" });
  }
};

export default {
  getAll,
  getOne,
  create,
  remove,
  update,
};
