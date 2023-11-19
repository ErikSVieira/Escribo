// Importação do Express e do Body-Parser
const express = require('express');
const bodyParser = require('body-parser');

// Configurações 'api' e 'port'
const api = express();
const port = 3000;

// Interpretador do JSON
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

// Rota para receber numero no JSON
api.post('/api/postNumber', (req, res) => {
    const jsonData = req.body;

    const number = parseInt(jsonData.number);

    if (isNaN(number) || !Number.isInteger(number) || number < 0) {
        return res.status(400).json({ erro: 'Número inválido. Forneça um número inteiro.' });
    }

    const [total, numberArray] = calculation(number);

    if (number === numberArray[0]) {
        numberArray.shift();
    }

    console.log('Soma:', total, 'Array:', numberArray, 'Número:', number); // Log no terminal

    res.send({
        "total": total,
        "array": numberArray
    });
    // res.send(`Resultado encontrado: ${numberArray}, Soma total: ${total}`); // Uma segunda opção	de resposta
});

// Escutar porta e console que server inicio
api.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


// Função principal, executa varias função para entregar o resultado esperado
function calculation(number) {
    const numberArray = getNumberArray(number);

    const total = totalArray(numberArray, number);

    return [total, numberArray];
}

// Cria um array dos números divisíveis por 3 ou 5
function getNumberArray(number) {
    let numberArray = [];

    for (; number > 0; number--) {
        if (number % 3 === 0 || number % 5 === 0) {
            numberArray.push(number);
        }
    }

    return numberArray;
}

// Soma todos os números doa array menos se o número for igual ao número informado
function totalArray(numberArray, number) {
    let somar = numberArray.reduce((result, value) => {
        if (value < number) {
            return result + value;
        } else {
            return result;
        }
    }, 0);

    return somar;
}