# Exercises

- 5.1 Bloglist frontend

  - Implement login functionality to the frontend. The token returned with a successful login is saved to the application's state `user`
  - if a user is not logged in, show log in form
  - if a user is logged in, show the user name and a list of blogs belong to the user

  #

  - 🌟 **my takeaways**
    - use `[name]: value` to handle multiple input values (may refactor to hooks later on)
    - need using `callback` function when updating the state based on the previous state
      ```javascript
      const onNewblogChange = e => {
        const { name, value } = e.target;
        setNewBlog(prev => ({ ...prev, [name]: value }));
      };
      ```

#

- 5.2 Bloglist frontend

  - use local storage to let a user's login/logout state permanent
    - Values in the storage stay even when the page is rerendered. The storage is [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin)-specific so each web application has its own storage.
    - Values saved to the storage are [DOMstrings](https://developer.mozilla.org/en-US/docs/Web/API/DOMString), so we cannot save a JavaScript object as is. The object has to be first parsed to JSON with the method `JSON.stringify`. Correspondigly, when a JSON object is read from the local storage, it has to be parsed back to JavaScript with `JSON.parse`.

  ```javascript
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    window.localStorage.getItem('loggedUser', JSON.parse(user))
    window.localStorage.removeItem('loggedUser)
  ```

  - use `useEffect` hook to implement localStorage so that the application checks local storage if there is a stored user logged token when entering the page

#

- 5.3 Bloglist frontend
  - allow a logged-in user to add new blogs
  - implement token in the frontend so that users must have the `token` to create a new blog
    - we've got the `JWT token` object when users passed the password validation (at backend logginRouter through the `jwt.sign` function)
    - export the `setToken` function for the `handleLogin` event
    - set the config object with `headers: {Authorization: token}` in the `create` function

#

- 5.4 Bloglist frontend
  - implement notifications
    - successfully added a new blog
    - error states (wrong username/password)

#

- 5.5 Bloglist frontend

  - a `new blog` button to be able to toggle the create blog form that is hidden as default
  - `Togglable` component
  - if a component is defined with an automatically closing `/>` tag, the `props.children` is an empty array

#

- 5.6 Bloglist frontend
  - show all content in the blog list when the list has been clicked
  - reference to components with `ref`
    - `createRef` creates a `ref` that can be attached to React elements via the ref attrubute
    - `forwardRef` creates a React component that forwards the `ref` attribute it receives to another component below the tree. It is particularly useful in two scenarios:
      - Forwarding refs to DOM components
      - Forwarding refs in higher-order-components
  - `useImperativeHandle` [hook](https://reactjs.org/docs/hooks-reference.html#useimperativehandle) is used for defining functions in a component which can be invoked from outside of the component.

#

- 5.7 Bloglist frontend
  - implement the functionality of the `like` button
  - likes are increased by making an HTTP `PUT` request
  - `/api/blogs/:id`

#

- 5.8 Bloglist frontend
  - sorting the blog list order by numbers of `likes`

#

- 5.9 Bloglist frontend
  - add a `delete` button
  - implement the logic form deleting blog posts in the backend.

#

- 5.10 Bloglist frontend
  - show the button for deleting a blog post only if the blog post was added by the user.

#

- 5.11 Bloglist frontend
  - define PropTypes for one of the components of the application
  - `npm install prop-types`

#

- 5.12 BlogList frontend
  - add ESlint to the project. fix all the linter errors
  - `npm add --save-dev eslint-plugin-jest`
  ```js
  {
    "scripts": {
      ...
      "eslint": "eslint ."
  },
  ```

#

### teseting react app

- [jest](https://jestjs.io/)
- [enzyme](https://github.com/airbnb/enzyme) (doesn't support hooks properly )
- [react-testing-library](https://github.com/testing-library/react-testing-library)

```js
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

```js
import { render } from "@testing-library/react";
```

- normally React components are rendered to the DOM. the render method we use to render the components is suitable for tests without rendering then to the DOM
- `render` returns an object. one of the properties is called `container` which contains all of the HTML rendered by the component

#### running tests

- create-react-app configures tests to be run in watch mode by default, which means that the `npm test` command will not exit once the tests have finished, and will instead wait for changes to be made to the code.

  - run tests normally

  ```js
    CI-true npm test
  ```

  - [watchman](https://facebook.github.io/watchman/)

#####

- three ways to test the content of components

  ```js
  // search for a matching text from the entire HTML code rendered by the component
  expect(component.container).toHaveTextContent("testing react app");

  // use `getByText` method returns the element that contains the given text
  // an exception occurs if no such element exists
  const element = component.getByText("testing react app");
  expect(element).toBeDefined();

  // search for a specific element that is rendered by the component with the `querySlector` method
  const title = component.container.querySelector(".title");
  expect(title).toHaveTextContent("testing react app");
  ```

- Debug method
  - [debug](https://testing-library.com/docs/react-testing-library/api#debug)
- `prettyDOM` method
  - search for a smaller part of the component and print its HTML code
  - `import { prettyDOM } from '@testing-library/dom'`
- set up `setupTests.js` in the src/
  ```js
  import "@testing-library/jest-dom/extend-expect";
  ```

###

#### clicking buttons in tests

```js
  import { render, fireEvent } from '@testing-library/react
```

- the [fireEvent method](https://testing-library.com/docs/dom-testing-library/api-events#fireevent)
- using a [mock function](https://jestjs.io/docs/en/mock-functions.html)

```js
const mockHandler = jest.fn();
```

- the test finds the button based on the text from the rendered component and clicks the element

```js
const button = component.getByTest("like");
fireEvent.click(button);
```

- the exepction of the test verifies that mock function has been called exactly once

```js
expect(mockHandler.mock.calls.length).toBe(1);
```

- [Mock objects and functions](https://en.wikipedia.org/wiki/Mock_object) are commonly used stub components in testing that are used for replacing dependencies of the components being tested. Mocks make it possible to return hardcoded responses, and to verify the number of times the mock functions are called and with what parameters.

- [toHaveStyle](https://www.npmjs.com/package/@testing-library/jest-dom#tohavestyle) to verify visible or invisble

#### testing forms

- In practice, we used `fireEvent` to create a click event for the button component. We can also use fireEvent to **simulate filling forms.**
- create a Wrapper helper to render the form and manage its state props

  ```js
  const Wrapper = props => {
    const onChange = event => {
      props.state.value = event.target.value;
    };

    return (
      <NoteForm
        value={props.state.value}
        onSubmit={props.onSubmit}
        handleChange={onChange}
      />
    );
  };
  ```

  ```js
  const Wrapper = props => {
    // ...
  };

  test("<NoteForm /> updates parent state and calls onSubmit", () => {
    const onSubmit = jest.fn();
    const state = {
      value: ""
    };
    // pass `onSubmit` mock func and state obj for representing the state
    const component = render(<Wrapper onSubmit={onSubmit} state={state} />);

    const input = component.container.querySelector("input");
    const form = component.container.querySelector("form");

    // simulate writing text into the input elem by creating a change event for the input
    fireEvent.change(input, {
      target: { value: "testing of forms could be easier" }
    });
    // form is submitted by simulating  a submit event
    fireEvent.submit(form);

    expect(onSubmit.mock.calls.length).toBe(1);
    expect(state.value).toBe("testing of forms could be easier");
  });
  ```

#### frontend integration tests

- challenges

  - data fetched from backend - [sountion](https://jestjs.io/docs/en/manual-mocks.html#content)
    - create a `__mocks__` subdirectory under the `services` directory that defines `getAll` function returns a hardcoded list, and wrapped a promise with `Promise.solve` method
    -
  - local storage for storing information - [solutions](https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests)
    - write localStorageMock in the `setupTests.js`

- re-rendering the component
  `component.rerender(<App />)`
- useing [waitForElement](https://testing-library.com/docs/dom-testing-library/api-async#waitforelement) function for verifying that the App component renders because fetching data from server is an asynchronous event

```js
await waitForElement(() => component.container.querySelector(".note"));
```

#### test coverage

- [test coverage](https://github.com/facebook/create-react-app/blob/ed5c48c81b2139b4414810e1efe917e04c96ee8d/packages/react-scripts/template/README.md#coverage-reporting)

```js
  CI=true npm test -- --coverage
```

#### snapshot testing

- [snapshot testing](https://jestjs.io/docs/en/snapshot-testing.html)
  - to compare the HTML code defined by the component after it has changed to the HTML code that exists before

#

#### end-to-end tests

- inspects the application through the same interface as real end-users
- use library like [Selenium](https://www.selenium.dev/)
- use [headless-broswer](https://en.wikipedia.org/wiki/Headless_browser)

#

- 5.13 BlogList tests
  - write a test that verifies that the component renders the title, author and amount of likes for the blog post.

#

- 5.14 BlogList tests
  - write a test that verifies that if the like button of a component is pressed twice, the event handler function passed in the component's props is called twice.

#

- 5.15 BlogList tests

  - write tests for the Blog component of your application that verify that only the name and author of the blog post are shown by default.
  - verify that when the blog post is clicked, the other information of the blog post becomes visible.

#

- 5.16 BlogList tests
  - write an integration test for your application that verifies that if the user is not logged into the application, then the application only displays a login form and no blogs are rendered.
  - use `waitForElement`

#

- 5.17 BlogList tests

  - write another test that verifies that when the user is logged in, the blog posts are rendered to the page.

  ```js
  const user = {
    username: "tester",
    token: "1231231214",
    name: "Donald Tester"
  };

  localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
  ```

#

- 5.18 Blog list and hooks
  - simplify the login form with the `useField` custom hook

#

- 5.19 Blog list and hooks
  - add a `reset` operation for clearing the field
  - use the improved hook in the form for creating a new blog post

#

- 5.20 Blog list and hooks
  - fix the `Invalid value for prop reset' on <input> tag` problem if it happens

#

- 5.21 ultimate hooks
  - extract code for the code communicating with the backend into its own `useResource` hook

#

- **Rules fo hooks**
  - don't call hooks inside loops, conditions, or nested functions. Instead, always use hooks at the top level of the React function
  - don't call hooks from regular JS function, instead:
    - call hooks from react function components
    - call hooks from custom hooks

#

- modifying `.eslintrc.js` add `eslint-plugin-react-hooks`
  ```js
  module.exports = {
    // ...
    plugins: [
      // ...
      "react-hooks"
    ],
    rules: {
      "react-hooks/rules-of-hooks": "error" // ...
    }
  };
  ```

#

- [awesome react hooks resources](https://github.com/rehooks/awesome-react-hooks)
- [Why Do React Hooks Rely on Call Order?](https://overreacted.io/why-do-hooks-rely-on-call-order/)
- [Easy to understand React Hook recipes by Gabe Ragland](https://usehooks.com/)
