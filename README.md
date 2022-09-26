# <p align = "center"> Projeto #21 Sing me a song (back) </p>

<p align="center" style="height: 250px">
   <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f399-fe0f.svg">
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-SEU_NOME-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/PauloCruz06/
projeto21-sing-me-a-song-back?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Descrição

Sing me a song é uma aplicação para recomendação anônima de músicas. Quanto mais as pessoas curtirem uma recomendação, maior a chance dela ser recomendada para outras pessoas. Nesse projeto o objetivo principal é fazer testes automatizados para verificar a integridade do [back-end da aplicação](https://github.com/driven-projects/sing-me-a-song/tree/main/back-end).

***

## :computer:	 Tecnologias e Conceitos

- REST APIs
- Node.js
- TypeScript
- PrismaORM
- SQL with PostgreSQL
- Jest & Supertest


***

## 🏁 Rodando a aplicação

Este projeto foi inicializado usando a versão 16.15 do [Node.js](https://nodejs.org/en/download/) e a última versão do [npm](https://www.npmjs.com/) rodando localmente. Também foi utilizado [Prisma ORM](https://github.com/prisma/prisma) para modelagem e manipulação de banco de dados.

Para essa API são feitos testes de integração e unitários usando [Jest](https://github.com/facebook/jest) e [SuperTest](https://github.com/visionmedia/supertest).

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/PauloCruz06/projeto21-sing-me-a-song-back.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Finalizado o processo, é só inicializar o servidor
```
npm start
```

Para rodar ambos os testes automatizados (integração e unitário) basta rodar o seguinte comando:
```
npm test
```

:grey_exclamation:[template usado nesse readme](https://gist.github.com/luanalessa/7f98467a5ed62d00dcbde67d4556a1e4#file-readme-md) :)