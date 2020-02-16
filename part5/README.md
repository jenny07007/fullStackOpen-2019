# Exercises

- 5.1 Bloglist frontend

  - Implement login functionality to the frontend. The token returned with a successful login is saved to the application's state `user`
  - if a user is not logged in, show log in form
  - if a user is logged in, show the user name and a list of blogs belong to the user

  #

  - 🌟 **my takeaways**
    - use `[name]: value` to handle multiple input values (may refactor to hooks later on)
    - need to use `callback` function when updating a state based on the pevious state
      ```javascript
      const onNewblogChange = e => {
        const { name, value } = e.target;
        setNewBlog(prev => ({ ...prev, [name]: value }));
      };
      ```

#

- 5.2 Bloglist frontend

  - use local storage to let a user's login/logout state is permanent
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
  - allow a logged in user to add new blogs
  - implement the token from frontend so that users must have the `token` to create a new blog
    - we've got the `JWT token` object when users passed the password validation (at backend logginRouter through the `jwt.sign` function)
    - export the `setToken` function for the `handleLogin` event
    - set the config object with `headers: {Authorization: token}` in the `create` function

#

- 5.4 Bloglist frontend
  - implement notifications
    - successfully added a new blog
    - error states (wrong username/password)
