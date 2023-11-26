// Importado Mongoose e Bcrypt
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Definição do esquema Mongoose
const usuarioSchema = new mongoose.Schema(
  {
    nome: String,
    email: {
      type: String,
      required: [true, "Email é obrigatório!"],
      unique: true,
    },
    senha: String,
    telefone: {
      numero: Number,
      ddd: Number,
    },
    ultimo_login: {
      type: Date,
      default: Date.now,
    },
    token: String, // optional token
  },
  {
    timestamps: {
      createdAt: "data_criacao",
      updatedAt: "data_atualizacao",
    },
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    versionKey: false,
  },
);

// Criptografa a senha
usuarioSchema.pre("save", async function (next) {
  const usuario = this;
  if (!usuario.isModified("senha")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(usuario.senha, salt);
    usuario.senha = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

// Atualização do ultimo login e do novo token gerado, esta com opcional 
usuarioSchema.methods.atualizarLogin = function (token) {
  this.ultimo_login = new Date();
  this.token = token;
  return this.save();
};

module.exports = mongoose.model("Usuario", usuarioSchema);
