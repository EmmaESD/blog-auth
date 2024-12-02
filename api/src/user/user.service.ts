import client from "../config/database.config";
import { Request, Response } from "express";

const getAll = async (req: Request, res: Response) => {
  client.query("SELECT * from users", function (error, results) {
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }

    res.status(200).send(results);
  });
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("end point get one (id): ", id);

  const sql = "SELECT * FROM users WHERE id = $1";
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

const create = async (req: Request, res: Response) => {
  const { pseudo, age } = req.body;

  const sql = "INSERT INTO users (pseudo, age) VALUES ($1, $2) RETURNING id";
  const values = [pseudo, age];

  try {
    const result = await client.query(sql, values);

    if (result.rows.length > 0) {
      console.log("inserted id: ", result.rows[0].id);
      res
        .status(200)
        .send({ message: "User created successfully", id: result.rows[0].id });
    } else {
      res.status(500).send({ error: "Error while creating data" });
    }
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send({ error: "Error while creating data" });
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("end point delete (id): ", id);

  const sqlDelete = "DELETE FROM users WHERE id = ?";
  const sqlSelect = "SELECT * FROM users WHERE id = ?";
  const values = [id];

  client.query(sqlSelect, values, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }
    if (Array.isArray(results) && results.length === 0) {
      res.status(404).send({ error: "user not found" });
      return;
    }
  });

  client.query(sqlDelete, values, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }

    console.log("results", results);

    res.status(200).send({ message: "Success to delete" });
  });
};

export default {
  getAll,
  getOne,
  create,
  remove,
};
