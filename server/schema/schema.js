
'use strict'

const _                        = require('lodash');
// const { makeExecutableSchema } = require('graphql-tools');

const Question = require('./question');
const Solution = require('./solution');

const schemas = [ Question, Solution ];

module.exports = {
  typeDefs: _.map(schemas, 'typeDef'),
  resolvers: {},
};
// makeExecutableSchema();
