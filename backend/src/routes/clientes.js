const pool = require("../config/db");
const { Router } = require("express");
const clienteController = require("../controllers/clienteController");
const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const router = Router();

router.post("/clientes", clienteController.criarCliente);
router.get("/clientes", clienteController.listarClientes);

// Rota para cadastrar um novo cliente
// Rota para cadastrar um novo cliente
router.post(
  "/clientes",
  [
    body("nome").isString().withMessage("Nome deve ser uma string."),
    body("telefone")
      .isMobilePhone("pt-BR")
      .withMessage("Telefone deve ser um número válido."),
    body("email").isEmail().withMessage("E-mail deve ser válido."),
    body("senha")
      .isLength({ min: 6 })
      .withMessage("A senha deve ter no mínimo 6 caracteres."),
    body("preferencias")
      .isArray()
      .withMessage("Preferências devem ser um array."),
    body("foto").isURL().withMessage("A foto deve ser uma URL válida."),
  ],
  async (req, res) => {
    // Captura os erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nome, telefone, email, senha, preferencias, foto } = req.body;

    try {
      // Criptografa a senha antes de armazená-la
      const hashedPassword = await bcrypt.hash(senha, 10);

      // Insere os dados no banco de dados
      const result = await pool.query(
        "INSERT INTO clientes (nome, telefone, email, senha, preferencias, foto) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [nome, telefone, email, hashedPassword, preferencias, foto]
      );

      // Retorna a resposta com o cliente cadastrado
      res.status(201).json({
        message: "Cliente cadastrado com sucesso!",
        cliente: result.rows[0], // Retorna o cliente cadastrado
      });
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      res.status(500).json({ error: "Erro ao cadastrar cliente." });
    }
  }
);

module.exports = router;
