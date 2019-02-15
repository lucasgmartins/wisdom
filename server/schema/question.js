'use strict'

const { gql } = require('apollo-server-hapi');

const schema = gql`

  extend type Query {
    questions(text: String): [Question]
    question(id: String!): Question!
  }

  extend type Mutation {
    question(title: String!, message: String!, tags: [String], user: String): Question
  }

  type Question {
    """
      title of question
    """
    _id: ID!
    title: String!
    message: String!
    solutions: [Solution]
    tags: [String]
    user: User!
  }

`;

module.exports.typeDef = schema;
