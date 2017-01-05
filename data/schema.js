import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const schema = `

# TYPES

type Products {
  id: Int!
  name: String
  email: String
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
  validation: String
}

type Comments {
  id: Int!
  prodid: Int
  name: String
  fbid: String
  comment: String
  imgpath: String
  timestamp: String
  validation: String
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

type Categories {
  id: Int!
  category: String
  parent: String
}

type Brands {
  id: Int!
  brand: String
}

type Bc {
  brands: [Brands]
  categories: [Categories]
}


# MUTATIONS

type Mutation {
  registerUser (
    name: String
    email: String
    password: String
    phone: String
    fbid: String
    favorites: String
    regid: String
  ): User

  likePost (
    prodid: Int!
    fbid: String
  ): Likes

  removeLike (
    prodid: Int!
    fbid: String
  ): Likes

  addComment (
    name: String
    fbid: String
    comment: String
    imgpath: String
    prodid: Int!
  ): Comments

  uploadProduct (
    name: String
    email: String
    fbid: String
    title: String
    description: String
    category: String
    brand: String
    size: String
    color: String
    condition: String
    origprice: String
    saleprice: String
    images: String
  ): Products

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
  bc: Bc
}
`;


export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
