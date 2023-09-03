# Bruno Ferreira


## Baixando, instalando e rodando projeto
Realize o clone do projeto pelo github. Para realizar é necessario o git instalado
```js
git clone https://github.com/BrunoFerreira95/manterusuarios.git
```

Entre na pasta de use o NPM para instalar as dependencias.

```js
npm i
```

Para rodar o projeto utilize este comando

```js
npm run dev
```

Em outro terminal instale o json-server

```js
npm install -g json-server
```

rode o mock da api com o comando na porta 3004
```js
json-server --watch ./src/db/db.json --port 3004
```

A um erro na hora de editar, ele não mostra a data antiga, está dando trabalho, então deixei para a proxima.