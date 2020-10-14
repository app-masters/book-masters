# Book Masters

**Este repositório em um fork de:** 
[DesafioAppMasters](https://github.com/IgorWestermann/DesafioAppMasters)


## Sobre o projeto
O projeto consiste na criação de um biblioteca virtual como desafio do processo de seleção de estágio da empresa [App Masters](https://appmasters.io/en/)


O pojeto inicial utilizou como base o frontend e o backend dos repositórios:
* Frontend por Igor Westermann: 
[DesafioAppMasters](https://github.com/IgorWestermann/DesafioAppMasters)

* Backend por Caio César: 
[api-node-express-mongo](https://github.com/caiocesaroliveira/api-node-express-mongo) 


## Banco de dados 

O banco de dados utilizado no projeto é o [MongoDB](https://www.mongodb.com/).

Para executar o servidor corretamente, é necessário configurá-lo localmente e informar as chaves contidas no arquivo `.env`


## Inicialização

O projeto consiste de duas partes em pastas separadas:
* O servidor, que contém nossa API: `server`
* O cliente, que é nosso frontend: `client`

Para configurar o projeto, clone o repositório atraves do comando no terminal:

`git clone https://github.com/app-masters/book-masters.git`

E caminhe para a pasta clonada:
`cd book-masters`

### Variáveis de ambiente

Tanto na pasta `server` quanto na pasta `client`, devem existir arquivos chamados `.env` com variáveis de ambiente.

Para o servidor:

* Caminhe para a pasta `server`
* Crie um arquivo `.env`
* Copie o conteúdo de `.env.sample` para o arquivo criado
* Informe os valores necessários (dados para conectar com seu banco localmente, etc)

Da mesma forma, para o cliente:

* Caminhe para a pasta `client`
* Crie um arquivo `.env`
* Copie o conteúdo de `.env.sample` para o arquivo criado
* Informe os valores necessários (url para a API, etc)

### Instalar dependências e iniciar

Feito isso, caminhe para a pasta do servidor e instale as dependências e inicialize o projeto:
```
cd server
npm i 
npm start 
```

Da mesma forma, para o cliente:
```
cd client
npm i 
npm start 
```

Você também pode usar o `Yarn` ao invés do npm, trocando:

* `npm i` por `yarn i`
* `npm start` por `yarn start`


## Contribuidores

Vários participantes do processo seletivo contribuíram para o projeto, dando sugestões e programando o sistema.

Você pode conferir quem participou navegando para a aba [contribuidores](https://github.com/app-masters/book-masters/graphs/contributors).