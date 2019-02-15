'use strict'

const { gql } = require('apollo-server-hapi');

const schema = gql`

  extend type Query {
    user(id: String!): User!
    users(pageSize: Int after: String): [User]
  }

  extend type Mutation {
    user(name: String!, email: String!): User
  }

  type User {
    _id: ID!
    name: String!
    email: String!,
    photo: String!
  }
`;

module.exports.typeDef = schema
