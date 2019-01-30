'use strict';

//###################################
// NODE_MODULES
//###################################

const nconf                 = require('nconf');
const Hapi                  = require('hapi');
const { ApolloServer, gql } = require('apollo-server-hapi');

// // const router      = require('hapi-router');
// // const HapiSwagger = require('hapi-swagger');
// // const nconf       = require('nconf');
// // const Inert       = require('inert');
// // const Vision      = require('vision');

// //###################################
// // LOCAL MODULES
// //###################################

// const Pack = require('./package');

// const properties = process.env.PROPERTIES || './api/config/env/test.json';

// nconf
//   .argv()
//   .env({separator:'__'})
//   .file(properties);

// //###################################
// // CONST
// //###################################

// const SERVER_CONFIGURATION = nconf.get('server');

// //###################################
// // LOCAL MODULES
// //###################################

// // const Authentication = require('./api/config/auth');

// //###################################
// // INIT
// //###################################

// process.on('unhandledRejection', err => {
//   process.exit(1);
// });

const questions = [
  {
    title: 'Tradução não aparece em alguns browsers',
    solutions: [
      { message: 'Verificar a linguagem do browser e trocar para português', vote: 2 },
      { message: 'Limpar cache do navegador', vote: 1 },
    ]
  },
  {
    title: 'Empresa não gera tarefas',
    solutions: [
      { message: 'Verificar se o cliente tem a tarefa', vote: 1 },
      { message: 'Verificar se o cliente está ativo', vote: 1 }
    ]
  }
];

// const typeDefs = gql`
//   # Comments in GraphQL are defined with the hash (#) symbol.

//   # This "Book" type can be used in other type declarations.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" type is the root of all GraphQL queries.
//   # (A "Mutation" type will be covered later on.)
//   type Query {
//     books: [Book]
//   }
// `;

let x = require('./schema/schema');
const resolvers = {
  Query: {
    questions: () => questions,
  },
};

x.resolvers = resolvers;

const server = Hapi.server({ host: 'localhost', port: 9000 });

async function bootstrap() {

  server.log(['error', 'database', 'read']);

  const apollo = new ApolloServer(x);

  await apollo.applyMiddleware({ app: server });

  await apollo.installSubscriptionHandlers(server.listener);
  await server.start();

  console.log(`Server running at: ${server.info.uri}`);

};

bootstrap().catch(err => console.log(err));


module.exports = server;

