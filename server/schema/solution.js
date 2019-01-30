'use strict'

const { gql } = require('apollo-server-hapi');

const schema = gql`
  type Solution {
    message: String
  }
`;

module.exports.typeDef = schema
// export const typeDef = schema;

// export const typeDef = `
//   type Author {
//     id: Int!
//     firstName: String
//     lastName: String
//     books: [Book]
//   }
// `;