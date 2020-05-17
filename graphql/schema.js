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
    editUser(editUserData: EditUserInputData): User!
  }

  type RootQuery {
    login(loginData: LoginInputData): Token!
    home: Home!
    followers: [Follower!]!
    following: [Following!]!
    searchUser(term: String!): [User!]!
    showUser(_id: String!): User!
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
    receiver: String!
    previewUrl: String!
    artworkUrl: String!
    releasedDate: String!
    genre: String!
    trackName: String!
    artistName: String!
    createdAt: String!
    updatedAt: String!
  }

  type ReceivedDedication {
    _id: ID!
    sender: User!
    receiver: String!
    previewUrl: String!
    artworkUrl: String!
    releasedDate: String!
    genre: String!
    trackName: String!
    artistName: String!
    createdAt: String!
    updatedAt: String!
  }

  type SendedDedication {
    _id: ID!
    sender: String!
    receiver: User!
    previewUrl: String!
    artworkUrl: String!
    releasedDate: String!
    genre: String!
    trackName: String!
    artistName: String!
    createdAt: String!
    updatedAt: String!
  }

  type Notification {
    _id: ID!
    sender: String!
    receiver: String!
    type: String!
    dedicateId: Dedicate,
    createdAt: String!
    updatedAt: String!
  }

  type Home {
    users: [User!]!
    receivedDedications: [ReceivedDedication!]!
    sendedDedications: [SendedDedication!]!
    notifications: [Notification!]!
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
    receiver: String!
    previewUrl: String!
    artworkUrl: String!
    releasedDate: String!
    genre: String!
    trackName: String!
    artistName: String!
  }

  input EditUserInputData {
    name: String
    bio: String
    website: String
    location: String
  }
`);