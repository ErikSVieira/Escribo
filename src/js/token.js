const jwt = require('jsonwebtoken');

// Função que geradora de Token
function gerarToken(id) {

  const payload = {
    id: id,
    exp: Math.floor(Date.now() / 1000) + (30 * 60), 
  };

  const token = jwt.sign(payload, 'sua_chave_secreta'); 
  // "sua_chave_secreta" deve ser alterado para aumentar a segurança

  return token;
}

module.exports = gerarToken;