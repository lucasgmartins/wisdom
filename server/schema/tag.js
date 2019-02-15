'use strict'

const { gql } = require('apollo-server-hapi');

const schema = gql`
  type Tag {
    title: String
  }
`;

module.exports.typeDef = schema;
