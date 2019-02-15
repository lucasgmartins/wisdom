
'use strict'

const _                        = require('lodash');
const { gql }                  = require('apollo-server-hapi');

const Question                 = require('./question');
const Solution                 = require('./solution');
const Tag                      = require('./tag');
const User                     = require('./user');

const Query = gql`
  type Query {
    _empty: String
  }
`;

const Mutation = gql`
  type Mutation {
    empyt(empty: String): Boolean
  }
`;

const schemas = [ Question, Solution, Tag, User ];

module.exports = {
  typeDefs: [ Query, Mutation, ..._.map(schemas, 'typeDef')],
  resolvers: {},
};
// makeExecutableSchema();
