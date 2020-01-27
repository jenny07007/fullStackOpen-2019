# Exercises

- 3.1 The phonebook backend - Implement a Node application that returns a hardcoded list of phonebook entries from the address `http://localhost:3000/api/persons`

#

- 3.2 The phonebook backend - Implement a page at address `http://localhost:3001/info` that shows the numbers of people from database, and the timestamp of processing the request

#

- 3.3 The phonebook backend - Implement functionality for displaying the information for a single phonebook entry `http://localhost:3001/api/persons/5` and server should respond with the appropriate status code

#

- 3.4 The phonebook backend - Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL. Test the functionailty works with either Postman or the Visual Studio Code REST client

#

- 3.5 The phonebook backend - Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address `http://localhost:3001/api/persons`. Generate a new id for the phonebook entry with `Math.random` function

#

- 3.6 The phonebook backend - implement error handling for creating new entries. If
  - The name or number is missing
  - The name already exists in the phonebook
    respond the appropriate status code and send back message `{error: 'name must be unique'}`

#

- 3.7 The phonebook backend - add `morgan` middleware to the application for logging
  sent in HTTP POST request
  - [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
  - [creating new tokens](https://github.com/expressjs/morgan#creating-new-tokens)
