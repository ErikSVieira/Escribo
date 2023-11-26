# Desafio de código

### Objetivo

- Este projeto teve por objetivo: Desenvolver uma API RESTful para autenticação de usuários, que permita operações de cadastro (sign up), autenticação (sign in) e recuperação de informações do usuário.

- Neste projeto foi utilizado MogodeDB Atlas, Postaman, JavaScript e bibliotecas Node.Js (nodemon, bcrypt, express, jsonwebtoken mongoose).

### Execução

- Para testar este código ele pode ser clonado ou usar os links da publicado no Code Sandbox.

        # git clone -b backend https://github.com/ErikSVieira/Escribo.git

- depois instalar todas as dependencias necessarias

        # npm install bcrypt express jsonwebtoken mongoose nodemon

- Muito importante você deve ir na pasta src/config e editar no db.js em "const uri" os seguintes campos `<user> <password> <database>` pelas configurações do mongodb

        const uri =
        "mongodb+srv://<user>:<password>@cluster0.zgx7can.mongodb.net/<database>?retryWrites=true&w=majority";


- depois 

        # npm run start

#### Cadastras novo usuário:

link CDS: https://gfyftz-3000.csb.app/sign-up

link local: http://localhost:3000/sign-up

Deve passar um JSON nestas rotas com mentodo POST

    {
        "nome": "teste",
        "email": "teste@postman.com",
        "senha": "123456",
        "telefone": {
            "numero": 12341234,
            "ddd": 11
        }
    }

Possiveis retornos

Usuário cadastrado com sucesso

    {
        "id": "6563a0ae49c4d3b8484ef4ec",
        "data_criacao": "2023-11-26T19:46:54.986Z",
        "data_atualizacao": "2023-11-26T19:46:56.369Z",
        "ultimo_login": "2023-11-26T19:46:56.368Z",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNTAwNzUwOC1lY2U3LTQxNmQtYWVjOC00MzUyMzI0MWFkZWUiLCJpZCI6IjY1NjNhMGFlNDljNGQzYjg0ODRlZjRlYyIsImV4cCI6MTcwMTAyOTgxNiwiaWF0IjoxNzAxMDI4MDE2fQ.ffgZfiwJm8M9xNYqXXkja79dwuH-CGbb1Hf_eoxl_og"
    }

Usuário já cadastrado?

    {
        "mensagem": "E-mail já existente."
    }


#### Conectar usuário

Link CDS: https://gfyftz-3000.csb.app/sign-in

link local: http://localhost:3000/sign-in

Deve passar um JSON nestas rotas com mentodo POST

    {
        "email": "teste@postman.com",
        "senha": "123456"
    }

Possiveis retornos

Usuário conectado com sucesso

    {
        "id": "6563a34049c4d3b8484ef4f2",
        "data_criacao": "2023-11-26T19:57:52.723Z",
        "data_atualizacao": "2023-11-26T19:58:01.630Z",
        "ultimo_login": "2023-11-26T19:57:54.084Z",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMzZkMzViMy1iMGRhLTRjMTEtOGE2Yy03ODY5NmQwZWI0NTQiLCJpZCI6IjY1NjNhMzQwNDljNGQzYjg0ODRlZjRmMiIsImV4cCI6MTcwMTAzMDQ4MSwiaWF0IjoxNzAxMDI4NjgxfQ.kE-_5Up31HWH9blZ7AEehcgz1q9xFLynSlAqJ3k-3OM"
    }

Quando senha o usuário esta errado até mesmo não cadastrado

    {
        "mensagem": "Usuário e/ou senha inválidos."
    }

ou 

    { 
        mensagem: "Erro interno do servidor." 
    }

#### Buscar usuario

Link CDS: https://gfyftz-3000.csb.app/search

link local: http://localhost:3000/search

Deve passar um Bearer Token que recebe ao conectar ou ao se cadastrar

    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMzZkMzViMy1iMGRhLTRjMTEtOGE2Yy03ODY5NmQwZWI0NTQiLCJpZCI6IjY1NjNhMzQwNDljNGQzYjg0ODRlZjRmMiIsImV4cCI6MTcwMTAzMDQ4MSwiaWF0IjoxNzAxMDI4NjgxfQ.kE-_5Up31HWH9blZ7AEehcgz1q9xFLynSlAqJ3k-3OM"

Possiveis retornos:

Encontrado usuário

    {
        "resultado": {
            "telefone": {
                "numero": 12341234,
                "ddd": 11
            },
            "nome": "teste",
            "email": "teste@postman.com",
            "senha": "$2b$10$huV82VBkMI188OFlttpnvuqwYK5XQJUXMf9605c8WqPUvP5kWV8QC",
            "ultimo_login": "2023-11-26T19:58:01.629Z",
            "data_criacao": "2023-11-26T19:57:52.723Z",
            "data_atualizacao": "2023-11-26T19:58:01.630Z",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMzZkMzViMy1iMGRhLTRjMTEtOGE2Yy03ODY5NmQwZWI0NTQiLCJpZCI6IjY1NjNhMzQwNDljNGQzYjg0ODRlZjRmMiIsImV4cCI6MTcwMTAzMDQ4MSwiaWF0IjoxNzAxMDI4NjgxfQ.kE-_5Up31HWH9blZ7AEehcgz1q9xFLynSlAqJ3k-3OM",
            "id": "6563a34049c4d3b8484ef4f2"
    }
}

Seção expeirada

    { 
        mensagem: "Sessão expirada." 
    }