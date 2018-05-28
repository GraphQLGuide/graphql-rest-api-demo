'use strict'
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const express = require('express')
const server = express()

// Get the Mongoose models used for querying the database
const { User, Group } = require('./models.js')

// Start up a GraphQL endpoint listening at /graphql
server.use(
  '/graphql',
  graphqlHTTP({
    // We construct our GraphQL schema which has three types:
    // The User, Group, and Query types (through which all
    // queries for data are defined)
    schema: buildSchema(`
        type Group {
            _id: String
            name: String
        }

        type User {
            _id: String
            username: String
            group: Group
        }

        type Query {
            user(id: String!): User
            users: [User]
            group(id: String!): Group
            groups: [Group]
        }
    `),
    // The query fields that we'll use to get the data for our
    // main queries
    rootValue: {
      // Get a user based on the ID and return it as a Promise
      user({ id }) {
        return User.findById(id)
      },
      // Get an array of users and return them as a Promise
      users() {
        return User.find({})
      },
      // Get a group based on the ID and return it as a Promise
      group({ id }) {
        return Group.findById(id)
      },
      // Get an array of groups and return them as a Promise
      groups() {
        return Group.find({})
      }
    },
    // Display the GraphiQL web interface (for easy usage!)
    graphiql: true
  })
)

// Start the application, listening on port 3000
server.listen(3000, () =>
  console.log(`Listening on port 3000.

http://localhost:3000/graphql
`)
)
