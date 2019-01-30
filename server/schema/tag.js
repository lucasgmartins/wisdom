'use strict'

const { gql } = require('apollo-server-hapi');

const schema = gql`
  type Tag {
    name: String
  }
`;

module.exports.typeDef = schema;
