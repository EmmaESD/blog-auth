import { Client } from "pg";

const client = new Client({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "your_database",
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
