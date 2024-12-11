import client from "../config/database.config";
import { Request, Response } from "express";
import pool from "../config/database.config";
import { IPost, IPostDTO } from "./post.type";

const getAll = async (req: Request, res: Response) => {
  client.query("SELECT * from posts", function (error, results) {
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }

    res.status(200).send(results.rows);
  });
};

const getOne = async (id: number): Promise<IPost | null> => {
  const sql = "SELECT * FROM public.posts WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(sql, values);
    const user = result.rows[0];

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

const getAllByUser = async (userId: number) => {
  const query = "SELECT * FROM public.posts WHERE user_id = $1";
  const values = [userId];

  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error fetching posts for user:", error);
    throw new Error("Failed to fetch posts for user");
  }
};

const create = async (postDTO: IPostDTO) => {
  const values = [
    postDTO.title,
    postDTO.image,
    postDTO.content,
    postDTO.user_id,
  ];

  const query =
    "INSERT INTO public.posts (title, image, content, user_id) VALUES ($1, $2, $3, $4) RETURNING id";

  try {
    await pool.query(query, values);

    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
};

const update = async (
  id: number,
  postDTO: IPostDTO
): Promise<IPostDTO | null> => {
  try {
    const { rows } = await client.query(
      "SELECT * FROM public.posts WHERE id = $1",
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    const sqlUpdate =
      "UPDATE public.posts SET title = $1, image = $2, content = $3, user_id=$4 WHERE id = $5 RETURNING *";
    const values = [
      postDTO.title,
      postDTO.image,
      postDTO.content,
      postDTO.user_id,
      id,
    ];

    const updatedPost = await client.query(sqlUpdate, values);

    return updatedPost.rows[0];
  } catch (error) {
    console.error("Error during update:", error);
    throw new Error("Failed to update post");
  }
};

const remove = async (id: number, user_id: number): Promise<boolean> => {
  const sqlSelect = "SELECT * FROM posts WHERE id = $1 AND user_id = $2";
  const sqlDelete = "DELETE FROM posts WHERE id = $1 AND user_id = $2";
  const values = [id, user_id];

  try {
    const result = await client.query(sqlSelect, values);

    if (result.rows.length === 0) {
      // Post non trouvé ou l'utilisateur n'est pas autorisé
      return false;
    }

    await client.query(sqlDelete, values);
    return true;
  } catch (error) {
    console.error("Error during delete operation", error);
    throw new Error("Failed to delete post");
  }
};

export default {
  getAll,
  getAllByUser,
  getOne,
  create,
  remove,
  update,
};
