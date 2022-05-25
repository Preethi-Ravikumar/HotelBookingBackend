const express = require('express');
const mongoose = require('mongoose');
const TypeDefs = require('./schema');
const Resolvers = require('./resolvers');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const dotenv = require('dotenv');
dotenv.config();

//const url = process.env.MONGODB_URL;

const connect = mongoose.connect("mongodb+srv://root:root@cluster0.v59zn.mongodb.net/hotelBooking?retryWrites=true&w=majority",
      {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
      });

connect.then((db) => {
      console.log('Sucessfully connected to MongoDB');
}, (err) => {
      console.log(err);
});

const server = new ApolloServer({
      typeDefs: TypeDefs.typeDefs,
      resolvers: Resolvers.resolvers
});

const app = express();
app.use(bodyParser.json());
app.use('*', cors());
server.applyMiddleware({ app });

app.listen({ port: "5000" }, () =>
       console.log(`Server ready at http://localhost:5000${server.graphqlPath}`)
      );