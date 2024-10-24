require("dotenv").config(); // Carrega as variáveis de ambiente do .env
const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Verificar a conexão com o banco de dados
pool.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados!");
  }
});

// Middleware para parsear JSON
app.use(express.json());

// Rota inicial para testar se o servidor está funcionando
app.get("/", (req, res) => {
  res.send("Bem-vindo ao sistema de cadastro de clientes");
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
