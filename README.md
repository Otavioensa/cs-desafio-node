API criada com o propósito de atender aos requisitos do desafio proposto pela Concrete Solutions.

Endpoints:

Criação de Cadastro

POST:

https://cs-desafio-node-otavioensa.c9users.io/usuario

API responsável pelo cadastro de usuários.

Parâmetros 

Request (Exemplo):

{
  "nome": "usuario",
  "email": "usuario@email.com",
  "senha": "123456",
  "telefones": [
    {"ddd": "11", "numero": "1111111"}
  ]
}

Response:

{
    "usuario": {
        "_id": "348d373a-a561-a4df-ff51-0829fddc3ec6",
        "nome": "usuario",
        "email": "usuario@email.com",
        "senha": "123456",
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE0NjAzNDM0NDR9.NQn05X4gRrRf8pIWth1Wllsxamd8fanhvzydQZmQiYc",
        "telefones": [
            {
                "ddd": "11",
                "numero": "1111111"
            }
        ]
    },
    "data_criacao": "2016-04-11",
    "data_atualizacao": "2016-04-11",
    "ultimo_login": "2016-04-11"
}
______________________________________________________________________________________________________________________________________
SigIn

PUT:

https://cs-desafio-node-otavioensa.c9users.io/signIn

API responsável por realizar o login. Irá gerar um token com validade de 30 minutos em caso de sucesso no login. 

Parâmetros 

Request (Exemplo):

{
  "email": "usuario@email.com",
  "senha": "123456"
}

Response (Exemplo):

{
    "sigIn": true,
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE0NjAzNDM2OTEsImV4cCI6MTQ2MDM0NTQ5MX0.zdDcMRhYUjrYD95YviXKcy2jPgmbKWo2Ipc9Jh5uMLk"
}

______________________________________________________________________________________________________________________________________


Buscar Usuário

GET:

https://cs-desafio-node-otavioensa.c9users.io/usuario/:idUsuario

API responsável por recuperar usuário previamente cadastrado. Para realizar a consulta, deverá informar o token no Header (Authorization), token gerado previamente no login/cadastro.

Header (Exemplo):

Authorization 

Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE0NjAzNDM2OTEsImV4cCI6MTQ2MDM0NTQ5MX0.zdDcMRhYUjrYD95YviXKcy2jPgmbKWo2Ipc9Jh5uMLk

Request (Exemplo):
https://cs-desafio-node-otavioensa.c9users.io/usuario/348d373a-a561-a4df-ff51-0829fddc3ec6

Response (Exemplo):
{
    "_id": "348d373a-a561-a4df-ff51-0829fddc3ec6",
    "nome": "usuario",
    "email": "usuario@email.com",
    "senha": "123456",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE0NjAzNDM2OTEsImV4cCI6MTQ2MDM0NTQ5MX0.zdDcMRhYUjrYD95YviXKcy2jPgmbKWo2Ipc9Jh5uMLk",
    "telefones": [
        {
            "ddd": "11",
            "numero": "1111111"
        }
    ],
    "ultimo_login": "2016-04-11",
    "data_atualizacao": "2016-04-11"
}




