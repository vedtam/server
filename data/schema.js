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
# the schema allows the following query:
type Query {
  products: [Products]
}
`;

// # this schema allows the following mutation:
// type Mutation {
//   upvotePost (
//     postId: Int!
//   ): Post
// }
// type Subscription {
//   postUpvoted: Post
// }

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
