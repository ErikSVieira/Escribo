// Import Mongoose
const mongoose = require("mongoose");

// URI de conexão da sua implantação do MongoDB.
// Aqui você deve substituir para seu usuario e senha do MongoDB
const uri =
  "mongodb+srv://<user>:<password>@cluster0.zgx7can.mongodb.net/<database>?retryWrites=true&w=majority";

// Conexão no MongoDB
async function conectar(req, res) {
  try {
    await mongoose.connect(uri);
    console.log("Conectado no MongoDB");
  } catch (error) {
    console.error("Error ao conectar ao MongoDB", error);
    throw error;
  }
}

// Desconecta do MongoDB
async function desConectar() {
  try {
    await mongoose.disconnect();
    console.log("Desconectado do MongoDB");
  } catch (error) {
    console.error(error);
  }
}

module.exports = { conectar, desConectar };
