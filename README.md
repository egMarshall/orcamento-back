# The Budget App - Back-End

## O que é necessário para testar essa aplicação?

- Ter o [Node.js](https://nodejs.org/en) instalado na versão 21.4.0 ou acima;
- Ter o gerenciador de pacotes [Yarn](https://yarnpkg.com/) instalado;
- Algum Rest Client: [Insomnia](https://insomnia.rest/download), [Postman](https://www.postman.com/), [cURL](https://curl.se/), [Thunder](https://www.thunderclient.com/);

## Tecnologias utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Prisma](https://prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Swagger](https://swagger.io/)

## Rotas pelo Postman

### Usuários

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/17588262-7b1495a5-e6b8-4d81-a3ae-a542fbd6a47a?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D17588262-7b1495a5-e6b8-4d81-a3ae-a542fbd6a47a%26entityType%3Dcollection%26workspaceId%3Dab6ab9d4-059d-4e5c-96d7-f1818f42883c)

### Itens

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/17588262-c0291fff-12d9-44d7-b2bc-3ab9687ff152?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D17588262-c0291fff-12d9-44d7-b2bc-3ab9687ff152%26entityType%3Dcollection%26workspaceId%3Dab6ab9d4-059d-4e5c-96d7-f1818f42883c)

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

**DB**

`DATABASE_URL`

**JWT**

`JWT_SECRET`

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/egMarshall/the_budget_back
```

Entre no diretório do projeto

```bash
  cd the_budget_back
```

Instale as dependências

```bash
  yarn
```

Inicie o banco de dados

```bash
 npx prisma generate
```

```bash
npx prisma migrate deploy
```

Inicie o servidor

```bash
  yarn start:dev
```

## Rodando no Docker

```bash
  docker-compose up --build
```

## Funcionalidades

**Usuários:**

- [x] Cadastrar Usuário;
- [x] Login de Usuário;
- [x] Validar Sessão do Usuário;
- [x] Atualizar dados de Usuário;
- [x] Deletar Usuário;
- [x] Buscar Usuário por ID;
- [x] Buscar todos os usuários.

**Itens:**

- [x] Cadastrar Item (Receita ou Despesa) por ID do Usuário;
- [x] Atualizar Item por ID;
- [x] Deletar Item por ID;
- [x] Buscar Item por ID;
- [x] Buscar todos os Items do usuário por ID do usuário.

## Endpoints

#### Swagger Documentation

```http
  GET /api-docs
```

#### Criar Usuário

```http
  POST /users/signup
```

| Parâmetro  | Tipo     | Descrição                          |
| :--------- | :------- | :--------------------------------- |
| `name`     | `string` | **Obrigatório**. Nome do usuário   |
| `email`    | `string` | **Obrigatório**. e-mail do usuário |
| `password` | `string` | **Obrigatório**. Senha do usuário  |

#### Login do Usuário

```http
  POST /users/login
```

| Parâmetro  | Tipo     | Descrição                         |
| :--------- | :------- | :-------------------------------- |
| `name`     | `string` | **Obrigatório**. Nome do usuário  |
| `password` | `string` | **Obrigatório**. Senha do usuário |

#### Validar Sessão do Usuário

```http
  GET /users/login/session
```

| Parâmetro | Tipo     | Descrição                         |
| :-------- | :------- | :-------------------------------- |
| `token`   | `string` | **Obrigatório**. Token do usuário |

#### Atualizar dados do Usuário (apenas nome ou senha)

```http
  PUT /users/:id
```

| Parâmetro  | Tipo     | Descrição                         |
| :--------- | :------- | :-------------------------------- |
| `name`     | `string` | **Obrigatório**. Nome do usuário  |
| `password` | `string` | **Obrigatório**. Senha do usuário |

#### Deletar Usuário

```http
  DELETE /users/:id
```

#### Buscar Usuário

```http
  GET /users/:id
```

#### Buscar todos os Usuários

```http
  GET /users
```

#### Criar Item

```http
  POST /budget-items
```

| Parâmetro | Tipo     | Descrição                                          |
| :-------- | :------- | :------------------------------------------------- |
| `user_id` | `string` | **Obrigatório**. ID do Usuário                     |
| `name`    | `string` | **Obrigatório**. Nome do Item                      |
| `vale`    | `Number` | **Obrigatório**. Valor do item                     |
| `type`    | `string` | **Obrigatório**. Tipo do item (Receita ou Despesa) |
| `date`    | `Date`   | **Obrigatório**. Data do Gasto ou Receita          |

#### Editar Item

```http
  PUT /budget-items/:id
```

| Parâmetro | Tipo     | Descrição                                          |
| :-------- | :------- | :------------------------------------------------- |
| `name`    | `string` | **Obrigatório**. Nome do Item                      |
| `vale`    | `Number` | **Obrigatório**. Valor do item                     |
| `type`    | `string` | **Obrigatório**. Tipo do item (Receita ou Despesa) |
| `date`    | `Date`   | **Obrigatório**. Data do Gasto ou Receita          |

#### Deletar Item

```http
  DELETE /budget-items/:id
```

#### Buscar Item

```http
  GET /budget-items/:id
```

#### Buscar todos os Itens do Usuário

```http
  GET /budget-items/all/:user_id
```

- Exemplo de Requisição:

```sh
curl -X POST \
  http://localhost:3001/users/login \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
	"email": "kukac@kukac.com",
    "password": "kukac123"
}'
```
