const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolver');

const AuthMiddleware = require('./middleware/AuthMiddleware');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

app.use(require('cors')());

app.get('/', (req, res, next) => {
  res.status(200).write('<h1>Hii, there</h1>');
});

app.use(AuthMiddleware);

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true,
  customFormatErrorFn(err) {
    if (err.originalError) {
      const { code, data, message } = err.originalError
      err = { status: code, errors: data, message: message };
    }
    return err;
  },
}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@node-jvfv6.mongodb.net/${process.env.MONGO_DATABASE}?authSource=admin&replicaSet=Node-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`)
  .then(result => {
    console.log('connected!');
    app.listen(PORT);
  })
  .catch(err => console.log(err));