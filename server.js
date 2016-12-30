import express from 'express';
import bodyParser from 'body-parser';
//import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import graphqlExpress from 'express-graphql';
import cors from 'cors';

var multer  = require('multer');

import schema from './data/schema.js';
import myResolver from './data/resolvers';

const PORT = 8888;
const graphQLServer = express().use('*', cors());

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {},
  graphiql: true,
  //formatError: (err) => { console.log(err.stack); return err },
}));


/* FILE UPLOAD */

// TODO: create folder named by user's email address or fbID ???

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage });

graphQLServer.post('/ups', upload.single('img'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.status(204).end()
});

/* End File Upload */


graphQLServer.use('/uploads', express.static('uploads'))

// graphQLServer.use('/graphiql', graphiqlExpress({
//   endpointURL: '/graphql',
// }));

graphQLServer.listen(PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${PORT}/graphql`
));
