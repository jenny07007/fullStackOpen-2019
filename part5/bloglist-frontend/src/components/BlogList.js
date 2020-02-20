import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, onHandleLikes, onHandleRemove }) => {
  return (
    <>
      {blogs &&
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              onHandleLikes={() => onHandleLikes(blog.id)}
              onHandleRemove={() => onHandleRemove(blog.id)}
            />
          ))}
    </>
  );
};

export default BlogList;
