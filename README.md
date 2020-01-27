##### My submissions for [Fullstack Open 2019](https://fullstackopen.com/en/)

### Part 0

- Fundamentals

### Part 1

- React
- Javascript
- State
- Hooks
- Props

### Part 2

- Modules
- Forms (Controlled)
- Fetch data from server
- Alter data in server
  - RESTful API
- Styling

### Part 3

- Node.js and Express
  - [transitive dependencies](https://lexi-lambda.github.io/blog/2016/08/24/understanding-the-npm-dependency-model/)
  - [semantic versioning](https://docs.npmjs.com/about-semantic-versioning)
  - Change a string into a number `Number(req.params.id)`
  - Server responds with stauts code when something wrong `res.status(404).end()`
  - Server responds with status code when deleting resources successfully `res.status(204).end()`
  - [REST client - Visual Studio Code plugin](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
  - Receiving data - [body-parser](https://github.com/expressjs/body-parser)
  - Finding out what headers have been set in the HTTP Reauest when debugging `req.get('Content-Type')`
  - Spotting the missing Content-Type header `console.log(req.headers)`
  - The HTTP GET request show be [safe](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)
  - The HTTP requests except POST shold be **idempotent**
  - `POST` is the only HTTP request type that is neither safe nor idempotent.
- Deploying app to the interent
- Saving data to MongoDB
- Validation and ESLint
