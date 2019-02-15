'use strict'

const { gql } = require('apollo-server-hapi');

const schema = gql`
  type Solution {
    message: String!
    vote: Int
    created_by: User!
  }
`;

module.exports.typeDef = schema
