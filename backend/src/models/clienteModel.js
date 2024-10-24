const pool = require("../config/db");

// Função para criar um novo cliente
const criarCliente = async (cliente) => {
  const { nome, telefone, email, senha, preferencias, foto } = cliente;
  const result = await pool.query(
    "INSERT INTO clientes (nome, telefone, email, senha, preferencias, foto) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [nome, telefone, email, senha, preferencias, foto]
  );
  return result.rows[0];
};

// Função para listar todos os clientes
const listarClientes = async () => {
  const result = await pool.query("SELECT * FROM clientes");
  return result.rows;
};

// Função para buscar um cliente por ID
const buscarClientePorId = async (id) => {
  const result = await pool.query("SELECT * FROM clientes WHERE id = $1", [id]);
  return result.rows[0];
};

// Função para atualizar um cliente por ID
const atualizarCliente = async (id, cliente) => {
  const { nome, telefone, email, senha, preferencias, foto } = cliente;
  const result = await pool.query(
    "UPDATE clientes SET nome = $1, telefone = $2, email = $3, senha = $4, preferencias = $5, foto = $6 WHERE id = $7 RETURNING *",
    [nome, telefone, email, senha, preferencias, foto, id]
  );
  return result.rows[0];
};

// Função para deletar um cliente por ID
const deletarCliente = async (id) => {
  await pool.query("DELETE FROM clientes WHERE id = $1", [id]);
};

module.exports = {
  criarCliente,
  listarClientes,
  buscarClientePorId,
  atualizarCliente,
  deletarCliente,
};
