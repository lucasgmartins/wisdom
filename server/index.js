'use strict';

//###################################
// NODE_MODULES
//###################################

const nconf                 = require('nconf');
const Hapi                  = require('hapi');
const _                     = require('lodash');
const { ApolloServer }      = require('apollo-server-hapi');
const elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});


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


let x = require('./schema/schema');

const resolvers = {
  Query: {
    questions: async (parent, { text }) => {

      const search = {
        index   : 'questions',
        type    : 'question'
      };

      if (text)
        Object.assign(search, {});

      const results = await client.search(search);

      return _.map(results.hits.hits, hit => ({ _id: hit._id, ...hit._source }));
    },
    question: async (parent, { _id }, context, info) => {

      const result = await client.get({ index: 'questions', type: 'question', id: _id });

      return { _id: result._id, ...result._source };
    },
    users: async () => {

      const results = await client.search({
        index: 'users',
        type : 'user'
      });

      return _.map(results.hits.hits, hit => ({ _id: hit._id, ...hit._source }));
    },
    user: async (parent, { _id }, context, info) => {
      const result = await client.get({ index: 'users', type: 'user', id: _id });

      return { _id: result._id, ...result._source };
    }
  },
  Mutation: {
    question: async (parent, { title, text, user, solutions = [], tags = [] }, context, info) => {

      const question = await client.index({
        index : 'questions',
        type  : 'question',
        body  : {
          title,
          text,
          solutions,
          user,
          tags
        }
      });

      return { _id: question._id };
    },
    user: async (parent, { name, email }, context, info) => {

      const document = await client.index({
        index : 'users',
        type  : 'user',
        body  : {
          name,
          email
        }
      });

      return { _id: document._id };
    }
  },
  Question: {
    user: async (parent, { name, email }, context, info) => {

      const result = await client.get({ index: 'users', type: 'user', id: parent.user });

      return { _id: result._id, ...result._source };
    }
  }
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

bootstrap()
  .catch(err => console.log(err));

module.exports = server;

