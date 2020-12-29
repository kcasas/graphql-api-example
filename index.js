const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

const resolvers = {
  Query: { books: () => books },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

const apolloServer = new ApolloServer({
  schema,
});

apolloServer.applyMiddleware({
  app,
  cors: {
    origin: process.env.GRAPHQL_CORS_ORIGIN,
  },
})

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Go to http://localhost:${process.env.PORT}/graphql to run queries!`);
});
