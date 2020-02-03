# Exercises

- 4.1 Blog list - turn an application body into a functioning npm project.
  - config `nodemon`
  - create a database
  - test the backend make sure all endpoints work correctly

#

- 4.2 Bolg list - refactor the application into separate modules

#

- 4.3 Bolg list - helper functions and unit tests
  - define a `dummy` function that receives an array of blog posts as a parameter and always returns the value 1.
  - install [jest](https://jestjs.io/)
    - `npm install --save-dev jest`
    - define the `npm script` `test` to execute tests with Jest and to report about the test execution with the `verbose` style
      - `"test": "jest --verbose"` in the `script` of the `package.json`
    - specify that the execution environment is Node (package.json)
      ```javascript
        "jest": {
          "testEnvironment": "node"
        }
      ```
    - or create a configuration file with the default name `jest.config.js`
      ```javascript
      module.exports = {
        testEnvironment: "node"
      };
      ```
    - the `.eslintrc.js`
      ```javascript
        module.exports = {
        "env": {
          "commonjs": true
          "es6": true,
          "node": true,
          "jest": true,  },
        "extends": "eslint:recommended",
        "rules": {
          // ...
        },
      };
      ```

#

- 4.4 Bolg list - helper functions and unit tests
  - define a new `totalLikes` function that receives a list of blog posts as a parameter. The function returns the total sum of likes in all of the blog posts.
  - **tips**
    - run a single test with [only](https://jestjs.io/docs/en/api.html#testonlyname-fn-timeout) method
    - run a single test with [-t flag](https://jestjs.io/docs/en/cli.html)
      - `npx jest -t 'when list has only one blog equals the likes of that'`

#

- 4.5 Bolg list - helper functions and unit tests

  - define a new `favoriteBlog` function that receives a list of blogs as a parameter. The function finds out which blog has most likes. If there are many top favorites, it is enough to return one of them.

#

- 4.6, 4.7 Bolg list - helper functions and unit tests
  - can use `lodash`
  - define a function called `mostBlogs` that receives an array of blogs as a parameter. The function returns the author who has the largest amount of blogs.
  - define a function called `mostLikes` that receives an array of blogs as its parameter. The function returns the author, whose blog posts have the largest amount of likes.
