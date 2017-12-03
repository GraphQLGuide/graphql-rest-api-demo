# GraphQL/REST API Demo

A demo of what an equivalent REST API and GraphQL interface look like. This code is used in the first chapter of the forthcoming [The GraphQL Guide](https://graphql.guide/) by [John Resig](https://johnresig.com/) and [Loren Sands-Ramshaw](http://lorensr.me/).

## Installation

To install you'll want to run `npm install` or `yarn` to install all of the Node modules.

Additionally, you'll need to have a copy of [MongoDB](https://www.mongodb.com/) running. If you're on OSX you can use [Homebrew](https://brew.sh/) to install MongoDB by running: `brew install mongodb`. That should also start the database server in the background, as well. If it's not running you can run `brew services stop mongodb` to start it.

You'll also want to populate the database with some data to test your queries. You can do this by running the `mongo testdb` command on the command-line and executing the following commands to create a new database, some collections, and the data inside of them:

```
db.users.insert({_id: "123", username: "jeresig", groupId: "dev"})
db.groups.insert({_id: "dev", name: "Developers"})
```

By default the servers are expecting to find data on your local computer in a database named "testdb". You can configure this by changing the settings in `models.js`.

## Data Models


Our data models representing the MongoDB database are in `models.js`. We use [Mongoose](http://mongoosejs.com/) to do the object modeling and provide a convenient way of accessing and mutating the data in the MongoDB collections.


## REST API

The REST API is implemented using [Node Express](https://expressjs.com/) and provides a couple endpoints for accessing user data.

You can run it using:

```
node rest-server.js
```

You can access the REST API by opening your browser and visiting either of the following URLs:

* [http://localhost:3000/users](http://localhost:3000/users) - All users.
* [http://localhost:3000/users/123](http://localhost:3000/users/123) - An individual user record.

## GraphQL Server

The GraphQL server is implemented using [Node Express](https://expressjs.com/), [GraphQL.js](https://github.com/graphql/graphql-js), and [GraphQL Express](https://github.com/graphql/express-graphql). It provides access to both the User and Group type.

You can run it using:

```
node graphql-server.js
```

You can access the GraphQL data by opening your browser and visiting the [GraphiQL](https://github.com/graphql/graphiql) view at:

* [http://localhost:3000/graphql](http://localhost:3000/graphql)

You should see a console interface into which you can run GraphQL queries and see their results. You should also be able to browse the full schema and see all of the types that are available to you and what data they provide.
