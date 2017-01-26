import express from 'express';
import fs from 'fs';
import path from 'path';
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

// TODO: create error log!!

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir(__dirname + '/uploads/' + file.fieldname, function(err) {
      if (err) {
        if (err.code == 'EEXIST'){
          // folder already exists
        } else {
          console.log('Error while creating folder for user!' + err);
        }
      }
    });
    cb(null, 'uploads/' + file.fieldname + '/')
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage });

graphQLServer.post('/ups', upload.any(), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
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
