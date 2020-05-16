const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  schema {
    mutation: RootMutation
    query: RootQuery
  }

  type RootMutation {
    signup(signupData: SignupInputData): Token!
  }

  type RootQuery {
    login(loginData: LoginInputData): Token!
    home: [User!]!
  }

  type Token {
    token: String!
    userId: String!
  }

  type User {
    _id: ID!
    email: String
    username: String!
    name: String
    bio: String
    website: String
    location: String
    createdAt: String!
    updatedAt: String
  }

  input SignupInputData {
    email: String!
    username: String!
    password: String!
    confirm_password: String!
  }

  input LoginInputData {
    email: String!
    password: String!
  }



`);