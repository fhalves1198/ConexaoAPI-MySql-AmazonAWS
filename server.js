const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");

app.use(cors());

// Configurações de conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: "db4free.net",
  port: 3306,
  user: "fabinhuui9",
  password: "Tunado98@@",
  database: "projectbasee"
});

// Conectar ao banco de dados MySQL
connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conexão bem-sucedida ao banco de dados.");

  // Defina suas rotas aqui

  app.listen("3000", () => {
    console.log("Servidor iniciado na porta 3000.");
  });
});

// Middleware para adicionar o cabeçalho 'Access-Control-Allow-Origin'
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Middleware para fazer o parse do corpo das requisições como JSON
app.use(express.json());

app.route("/cadastro").post((req, res) => {
  const { email, senha } = req.body;
  const query = "INSERT INTO cadastro (email, senha) VALUES (?, ?)";
  connection.query(query, [email, senha], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao cadastrar usuário.");
    } else {
      res.status(200).send("Usuário cadastrado com sucesso.");
      console.log(req.body)
    }
  });
});
