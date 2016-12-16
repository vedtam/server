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
}
# the schema allows the following query:
type Query {
  products: [Products]
  comments(prodid: ID): [Comments]
  likes(prodid: Int, fbid: String): [Likes]
  mutation: Mutation
}
`;


export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
