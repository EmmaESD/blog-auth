import { Client } from "pg";

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

client.connect((error: Error | null) => {
  if (error) {
    console.error("Erreur de connexion à PostgreSQL :", error.message);
  } else {
    console.log("Connecté à la base de données PostgreSQL");
  }
});

export default client;
