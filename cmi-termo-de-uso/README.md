# cmi-termo-de-uso

1. [Descrição](#1-descrição)
2. [Início rápido](#2-início-rápido)
3. [Componentes](#3-componentes)
4. [Testes](#4-testes)


## 1. Descrição

O cmu-autenticacao é um microsserviço que visa prover ...

Este projeto é codificado em [TypeScript](<https://www.typescriptlang.org/docs/home.html>) e utiliza as tecnologias [NodeJS](<https://pt.wikipedia.org/wiki/Node.js>) e [Express](https://expressjs.com/pt-br/).


## 2. Início rápido

Para rodar o projeto, execute o comando:

``` bash
npm run docker
```

Para checar o status da execução, utilize o comando:

``` bash
docker-compose ps
```

## 3. Componentes

Este microsserviço possui a seguinte estrutura de componentes:

| Componente                 | Descrição             | Endpoint                | Saiba mais em |
| :---                   | :----:                | :----:                   | ---:         |
| **_Info_**                   | Obtém as informações sobre versão da aplicação, commit e dependências            | <http://localhost:3000/info>             | [info](#31-info) |
| **_Documentação das APIs_**  | Realiza a documentação automática das apis e endpoints        | <http://localhost:3000/api-docs> | [api-docs](#32-documentação-da-api)     |


### 3.1. Info

A fim de expor as váriaveis de ambiente, versão da aplicação e outras informações deste projeto, foi configurado o seguinte endpoint: <http://localhost:3000/info>


### 3.2. Documentação da API

Para acessar a documentação da API no Swagger UI, acesse o endpoint: <http://localhost:3000/api-docs>

A documentação deve ser escrita no padrão [openApi](https://swagger.io/specification/).
Como as bibliotecas usadas ja definem a estrutura base da documentação sera necessario realizar a documentação das rotas e dos modelos nos arquivos presentes nas pastas model e routes.
Para as rotas deve se usar o Path Item Object, ja nos modelos deve se usar o Definitions.

Path Item Object

```ts
/**
 * @swagger
 * /errors:
 *   get:
 *     description: List of errors
 *     summary: List of errors that application can throw.
 *     tags:
 *       - Errors
 *     responses:
 *       200:
 *         description: Errors
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Error'
 */
```

Definitions

```ts
/**
 * @swagger
 *
 * definitions:
 *   Error:
 *     type: object
 *     properties:
 *       errorCode:
 *         type: integer
 *       errorMessage:
 *         type: string
 *     example:
 *       errorCode: 1404
 *       errorMessage: "Nenhum Registro Encontrado"
 */
```

## 4. Testes

### 4.1 Testes unitários

Neste projeto foram incluídos exemplos de testes unitários implementados em [Jest](<https://jestjs.io/docs/en/getting-started>).

Para editar os testes unitários, edite os scripts do diretório: **/src/test/unit**.

Para executar os testes unitários, execute o comando:

``` bash
npm run test
```
