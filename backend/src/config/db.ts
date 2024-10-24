import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cadastro_clientes",
  password: "Dev2024full",
  port: 5432,
});

pool.on("connect", () => {
  console.log("Conectado ao PostgreSQL");
});

pool.on("error", (err: Error) => {
  console.error("Erro ao conectar ao banco de dados:", err);
});

export default pool;
