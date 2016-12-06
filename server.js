import express from 'express';
import bodyParser from 'body-parser';
//import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import graphqlExpress from 'express-graphql';
import cors from 'cors';
import schema from './data/schema.js';
import myResolver from './data/resolvers';

const PORT = 8888;
const graphQLServer = express().use('*', cors());

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {},
  //formatError: (err) => { console.log(err.stack); return err },
}));

// graphQLServer.use('/graphiql', graphiqlExpress({
//   endpointURL: '/graphql',
// }));

graphQLServer.listen(PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${PORT}/graphql`
));
