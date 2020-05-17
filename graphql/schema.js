const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  schema {
    mutation: RootMutation
    query: RootQuery
  }

  type RootMutation {
    signup(signupData: SignupInputData): Token!
    follow(followunfollowData: FollowUnfollowInputData): String!
    unfollow(followunfollowData: FollowUnfollowInputData): String!
    dedicate(dedicateData: DedicateInputData): Dedicate!
  }

  type RootQuery {
    login(loginData: LoginInputData): Token!
    home: [User!]!
    followers: [Follower!]!
    following: [Following!]!
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

  type Follower {
    _id: ID!
    from: User!
    to: String!
  }

  type Following {
    _id: ID!
    from: String!
    to: User!
  }

  type Dedicate {
    _id: ID!
    sender: String!
    reciever: String!
    previewUrl: String!
    artworkUrl: String!
    releasedDate: String!
    genre: String!
    trackName: String!
    artistName: String!
    createdAt: String!
    updatedAt: String!
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

  input FollowUnfollowInputData {
    _id: ID!
  }

  input DedicateInputData {
    reciever: String!
    previewUrl: String!
    artworkUrl: String!
    releasedDate: String!
    genre: String!
    trackName: String!
    artistName: String!
  }


`);