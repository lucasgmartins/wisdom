'use strict'

const { gql } = require('apollo-server-hapi');

const schema = gql`
  type Question {
    title: String
    description: String
    solutions: [Solution]
  }

  type Query {
    questions: [Question]
  }
`;

module.exports.typeDef = schema;
