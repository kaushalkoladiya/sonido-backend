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
  }

  type Token {
    token: String!
    userId: String!
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