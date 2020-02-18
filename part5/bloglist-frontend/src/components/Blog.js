import React, { useState } from "react";

const Blog = React.forwardRef(({ blog }, ref) => {
  const [visible, setVisible] = useState(false);

  const showStyle = {
    display: visible ? "" : "none",
    lineHeight: "1.8",
    paddingTop: ".8em",
    transition: "display 1s ease"
  };

  const toggleVisibility = () => setVisible(!visible);

  const renderIcons = visible ? (
    <i className="fas fa-arrow-circle-up fas-arrow"></i>
  ) : (
    <i className="fas fa-arrow-circle-down fas-arrow"></i>
  );

  return (
    <div className="blog-style">
      <li onClick={toggleVisibility} className="blog-list-toggle">
        <div className="blog-list-title">
          {blog.title}
          <span> - Author: {blog.author}</span>
        </div>
        <button onClick={toggleVisibility} className="blog-list-toggle-btn">
          {renderIcons}
        </button>
      </li>
      <div style={showStyle}>
        <li>
          <a href={blog.url}>{blog.url}</a>
        </li>
        <li className="blog-list">
          {`Likes: ${blog.likes}`}
          <button className="like-btn">
            <i className="fas fa-heart"></i>
          </button>
        </li>
        <li className="blog-list">{`addd by ${blog.user.name}`}</li>
      </div>
    </div>
  );
});

export default Blog;
