const { conectar, desConectar } = require("./src/config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("./src/schema/Usuario");
const gerarToken = require("./src/schema/token");

// Importação do Express
const express = require("express");
const app = express();
// Interpretador do JSON do Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Você esta na Rota principal!");
});

app.get("/token", async (req, res) => {
  try {
    const token = gerarToken();
    res.json({ token: token });
  } catch (error) {
    res.json({ mensagem: error });
  }
});

app.post("/search", async (req, res) => {
  let resultado;
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ mensagem: "Não autorizado." });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, "sua_chave_secreta");

    await conectar();
    resultado = await Usuario.findById(decodedToken.id);

    res.status(200).json({resultado});
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ mensagem: "Sessão expirada." });
    }
    console.log(error);
    res.status(500).json({ mensagem: error });
  } finally {
    if (resultado) {
      await desConectar();
    }
  }
});

app.post("/sign-in", async (req, res) => {
  let resultado;

  try {
    await conectar();
    resultado = await Usuario.findOne({ email: req.body.email });

    if (!resultado) {
      await desConectar();
      return res
        .status(404)
        .json({ mensagem: "Usuário e/ou senha inválidos." });
    }

    const senhaCorreta = await bcrypt.compare(req.body.senha, resultado.senha);

    if (!senhaCorreta) {
      return res
        .status(401)
        .json({ mensagem: "Usuário e/ou senha inválidos." });
    }

    const ultimo_login = resultado.ultimo_login;

    const token = gerarToken(resultado._id);

    await resultado.atualizarLogin(token);

    res.json({
      id: resultado._id,
      data_criacao: resultado.data_criacao,
      data_atualizacao: resultado.data_atualizacao,
      ultimo_login: ultimo_login,
      token: token,
    });
  } catch (error) {
    console.error("Erro no sign-in:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor." });
  } finally {
    if (resultado) {
      await desConectar();
    }
  }
});

app.post("/sign-up", async (req, res) => {
  let resultado;
  try {
    await conectar();
    const usuario = new Usuario(req.body);
    resultado = await Usuario.create(usuario);

    const token = gerarToken(resultado._id);

    await resultado.atualizarLogin(token);

    res.status(201).json({
      id: resultado._id,
      data_criacao: resultado.data_criacao,
      data_atualizacao: resultado.data_atualizacao,
      ultimo_login: resultado.ultimo_login,
      token: resultado.token,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email === 1) {
      res.status(400).json({ mensagem: "E-mail já existente." });
    } else {
      res.status(500).json({ mensagem: error });
    }
    resultado = true;
  } finally {
    if (resultado) {
      await desConectar();
    }
  }
});

// Configuração da PORT
const port = process.env.PORT || 3000;
// Escutar porta, start server e imprime no console que server início
app.listen(port, () => console.log("Servidor inicializado na porta: " + port));
