'use strict'
const express = require('express')
const app = express()

// Get the Mongoose models used for querying the database
const { User } = require('./models.js')

// A list of the fields that are allowed to be accessed
const defaultFields = ['_id', 'username', 'group']

// Filter a user object based on the requested fields
const filterFields = async function(req, user) {
  // We assume the fields are a comma-separated list of field
  // names, if none is specified then we return all fields.
  const fieldKeys = req.query.fields
    ? req.query.fields.split(',')
    : defaultFields

  // Generate a new object that contains only those fields.
  const filteredUser = {}
  for (const field of fieldKeys) {
    // If the field is a function then we expect it to return
    // a promise which we will immediately resolve.
    if (typeof user[field] === 'function') {
      filteredUser[field] = await user[field]()
    } else {
      filteredUser[field] = user[field]
    }
  }
  return filteredUser
}

// Listen for all GET requests to /users/:id URL (where the
// ID is the ID of the user account)
app.get('/users/:id', (req, res) => {
  // Try to find the user by their id (_id field), using the ID
  // parameter from the URL.
  User.findById(req.params.id, async (err, user) => {
    if (err) {
      // The DB returned an error so we return a 500 error
      return res.status(500).end()
    }

    if (!user) {
      // No user was found so we return a 404 error
      return res.status(404).end()
    }

    // Return the user to the client (automatically serialized
    // as a JSON string). We need to wait for all of the fields
    // to load before we can return the results.
    res.send(await filterFields(req, user))
  })
})

// Listen for all GET requests to /users
app.get('/users', (req, res) => {
  // Find all of the users in the database collection (we pass in
  // an empty collection as we aren't filtering the results)
  User.find({}, async (err, users) => {
    if (err) {
      // The DB returned an error so we return a 500 error
      return res.status(500).end()
    }

    // Return the array of users to the client (automatically
    // serialized as a JSON string) We need to wait for all
    // of the Promises to resolve for all of the users.
    res.send(
      await Promise.all(users.map(async user => await filterFields(req, user)))
    )
  })
})

// Start the application, listening on port 3000
app.listen(3000)
