import React, { useState, useEffect } from "react";
import { getAll, setToken, create } from "./services/blogs";
import { login } from "./services/login";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const [userLoginInfo, setUserLoginInfo] = useState({
    username: "",
    password: ""
  });
  const [notification, setNotification] = useState();

  useEffect(() => {
    (async () => {
      const res = await getAll();
      setBlogs(res);
    })();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("LoggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = async e => {
    e.preventDefault();
    const { username, password } = userLoginInfo;
    try {
      const user = await login({ username, password });
      setToken(user.token);

      window.localStorage.setItem("LoggedInUser", JSON.stringify(user));

      setUser(user);
      setUserLoginInfo({ username: "", password: "" });
    } catch (error) {
      showNotification("Error!", `incorrect username or password!`);
    }
  };

  const handleLogout = e => {
    window.localStorage.removeItem("LoggedInUser");
    setUser(null);
    setToken(null);
  };

  const onNewblogChange = e => {
    const { name, value } = e.target;
    setNewBlog(prev => ({ ...prev, [name]: value }));
  };

  const onUserLoginInfoChange = e => {
    const { name, value } = e.target;
    setUserLoginInfo(prev => ({ ...prev, [name]: value }));
  };

  const onAddNewBlog = async e => {
    e.preventDefault();
    const { title, author, url } = newBlog;
    try {
      const newBlogObj = {
        title,
        author,
        url
      };
      const createdBlog = await create(newBlogObj);
      setNewBlog([...blogs, createdBlog]);
      showNotification("success!", `${title} by ${author} has been created!`);
      setNewBlog({ title: "", author: "", url: "" });
    } catch (error) {
      showNotification("Error!", `all information is required!`);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>username</label>
        <input
          type="text"
          value={userLoginInfo.username}
          name="username"
          onChange={onUserLoginInfoChange}
        />
      </div>
      <div>
        <label>password</label>
        <input
          type="password"
          value={userLoginInfo.password}
          name="password"
          onChange={onUserLoginInfoChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const blogForm = () => (
    <form onSubmit={onAddNewBlog}>
      <div>
        <label>title</label>
        <input value={newBlog.title} name="title" onChange={onNewblogChange} />
      </div>
      <div>
        <label>author</label>
        <input
          value={newBlog.author}
          name="author"
          onChange={onNewblogChange}
        />
      </div>
      <label>
        <label>url</label>
        <input value={newBlog.url} name="url" onChange={onNewblogChange} />
      </label>
      <button type="submit">Create</button>
    </form>
  );

  return (
    <div>
      {user ? (
        <div>
          <h2>blogs</h2>
          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
            />
          )}
          <div>
            {user.username} logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </div>
          <h4>create new</h4>
          {blogForm()}
          <ul>
            {blogs && blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
          </ul>
        </div>
      ) : (
        <div>
          <h2>Log in</h2>
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
            />
          )}
          {loginForm()}
        </div>
      )}
    </div>
  );
}

export default App;
