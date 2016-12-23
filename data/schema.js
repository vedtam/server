import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const schema = `
type Products {
  id: Int!
  name: String
  fbid: String
  title: String
  description: String
  brand: String
  size: String
  category: String
  color: String
  cond: String
  origprice: String
  saleprice: String
  images: String
  timestamp: String
  soldstatus: String
  views: String
  recommended: String
  likes: String
  comments: String
}

type Comments {
  id: Int!
  prodid: Int
  name: String
  fbid: String
  comment: String
  imgpath: String
  timestamp: String
}

type Likes {
  id: Int!
  prodid: String
  fbid: String
}

type User {
  id: Int!
  name: String
  email: String
  password: String
  phone: String
  fbid: String
  favorites: String
  regid: String
  validation: String  
}

# this schema allows the following mutation:
type Mutation {
  likePost (
    prodid: Int!
    fbid: String
  ): Likes
  removeLike (
    prodid: Int!
    fbid: String
  ): Likes
  registerUser (
    name: String
    email: String
    password: String
    phone: String
    fbid: String
    favorites: String
    regid: String
  ): User
}

type Login {
  user: User
  validation: String
}

# the schema allows the following query:
type Query {
  products: [Products]
  comments(prodid: ID): [Comments]
  likes(prodid: Int, fbid: String): [Likes]
  login(email: String, password: String): Login
  mutation: Mutation
}
`;


export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
