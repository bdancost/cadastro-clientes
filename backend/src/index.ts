import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pool from "./config/db";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir requisições de diferentes origens
app.use(cors());
app.use(bodyParser.json());

// Rota inicial para testar se o servidor está funcionando
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Verifica a conexão com o banco de dados
pool.query("SELECT NOW()", (err: Error | null, result: { rows: any[] }) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Resultado da consulta:", result.rows);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
