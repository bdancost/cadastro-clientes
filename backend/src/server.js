const express = require("express");
const cors = require("cors");
const clientesRoutes = require("./routes/clientes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", clientesRoutes);

// Rota inicial para testar se o servidor está funcionando
app.get("/", (req, res) => {
  res.send("Bem-vindo ao sistema de cadastro de clientes");
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
