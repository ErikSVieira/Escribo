# Desafio de código

### Objetivo

- Este projeto tem por objetivo receber um número inteiro positivo, somar todos os número divisíveis por 3 ou 5, sendo menores que o número recebido.

- Neste projeto foi utilizado HTML e CSS para criar um layout simples, buscando usar a cores padrões da empresa, é o JavaScript para criar a função que realiza a soma de todos os números divisíveis por 3 ou 5, imprimindo o resultado dos números localizado e o total da soma na página.


### Execução

- Para testar o código pode acessar o link da página: [Desafios](https://eriksvieira.github.io/Escribo/) ou clonar o repositório https://github.com/ErikSVieira/Escribo.git e rodá-lo diretamente em seu computador abrindo o index.html, não precisa de realizar nenhuma configuração específica.

        # git clone https://github.com/ErikSVieira/Escribo.git

- Porém, se você gostaria de passar um arquivo JSON e receber uma respostas, então pode executar os seguinte comando no seu terminal:

        # npm install express

- depois

        # npm run start

- Usando um programa como Composer ou Thunder Client passe o parâmetro JSON abaixo, nesta rota: http://localhost:3000/api/postNumber.

        { 
            "number": 10
        }

- Se tudo funcionar você deve receber esta resposta:

        {
            "total": 23,
            "array": [
                9,
                6,
                5,
                3
            ]
        }

- No caso de enviar uma letra ou um número negativo esta mensagem será retornada.

        {
            "erro": "Número inválido. Forneça um número inteiro."
        }

#
- Para dúvidas e esclarecimento fico inteiramente à disposição.