const clienteModel = require("../models/clienteModel");

// Controlador para criar um novo cliente
const criarCliente = async (req, res) => {
  const { nome, telefone, email, senha, preferencias, foto } = req.body;

  if (!nome || !telefone || !email || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const novoCliente = await clienteModel.criarCliente({
      nome,
      telefone,
      email,
      senha,
      preferencias,
      foto,
    });
    res
      .status(201)
      .json({ message: "Cliente criado com sucesso", novoCliente });
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    res.status(500).json({ error: "Erro ao criar cliente" });
  }
};

// Controlador para listar todos os clientes
const listarClientes = async (req, res) => {
  try {
    const clientes = await clienteModel.listarClientes();
    res.status(200).json(clientes);
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    res.status(500).json({ error: "Erro ao listar clientes" });
  }
};

// Outros controladores (buscarClientePorId, atualizarCliente, deletarCliente) podem ser adicionados aqui

module.exports = {
  criarCliente,
  listarClientes,
  // Outros controladores aqui
};
