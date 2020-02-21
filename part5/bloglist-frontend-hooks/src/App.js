import React, { useState, useEffect } from "react";
import { getAll, setToken, create, update, remove } from "./services/blogs";
import { login } from "./services/login";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import BlogFormHeader from "./components/BlogFormHeader";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useField } from "./hooks/useField";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState();
  const blogFormRef = React.createRef();
  const username = useField("text");
  const password = useField("password");
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

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
    try {
      const user = await login({
        username: username.value,
        password: password.value
      });
      setToken(user.token);

      window.localStorage.setItem("LoggedInUser", JSON.stringify(user));
      username.reset();
      password.reset();
      setUser(user);
    } catch (error) {
      showNotification("Error!", "incorrect username or password!");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("LoggedInUser");
    setUser(null);
    setToken(null);
  };

  const onAddNewBlog = async e => {
    e.preventDefault();

    blogFormRef.current.toggleVisibility();

    try {
      const newBlogObj = {
        title: title.value,
        author: author.value,
        url: url.value
      };
      const createdBlog = await create(newBlogObj);
      setBlogs([...blogs, createdBlog]);
      showNotification(
        "success!",
        `"${newBlogObj.title} by ${newBlogObj.author}" has been created!`
      );
      title.reset();
      author.reset();
      url.reset();
    } catch (error) {
      showNotification("Error!", "all information is required!");
    }
  };

  const onHandleLikes = async blogId => {
    try {
      const serverBlog = await blogs.find(b => b.id === blogId);
      const newLikes = serverBlog.likes + 1;

      const blogToUpdate = {
        ...serverBlog,
        likes: newLikes,
        user: user.id
      };
      const updatedBlog = await update(blogId, blogToUpdate);

      setBlogs(blogs.map(blog => (blog.id === blogId ? updatedBlog : blog)));
      showNotification(
        "Success!",
        `You liked "${serverBlog.title}" by ${serverBlog.author}`
      );
    } catch (error) {
      showNotification("Error!", "Something went wrong");
    }
  };

  const onHandleRemove = async blogId => {
    try {
      const serverBlog = await blogs.find(b => b.id === blogId);

      const comfirmToDelete = window.confirm(
        `Are you sure you want to delete "${serverBlog.title} by ${serverBlog.author}"? It'll be gone forever!`
      );

      if (!comfirmToDelete) return;
      await remove(blogId);

      const removedBlog = blogs.filter(blog => blog.id !== blogId);
      setBlogs(removedBlog);
      showNotification(
        "Success!",
        `"${serverBlog.title} by ${serverBlog.author}" has been deleted`
      );
    } catch (error) {
      showNotification(
        "Error!",
        "You can't delete the blog that doesn't belong to you!"
      );
    }
  };

  const blogForm = () => {
    return (
      <div className="create-new-form">
        <h2>blogs</h2>
        <BlogFormHeader user={user} handleLogout={handleLogout} />
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
          />
        )}
        <div>
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm
              onAddNewBlog={onAddNewBlog}
              title={title}
              author={author}
              url={url}
            />
          </Togglable>
        </div>
        <ul>
          <BlogList
            blogs={blogs}
            onHandleLikes={onHandleLikes}
            onHandleRemove={onHandleRemove}
          />
        </ul>
      </div>
    );
  };

  return (
    <div>
      {user ? (
        blogForm()
      ) : (
        <div className="home-login">
          <h2>Log in</h2>
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
            />
          )}
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
          />
        </div>
      )}
    </div>
  );
}

export default App;
