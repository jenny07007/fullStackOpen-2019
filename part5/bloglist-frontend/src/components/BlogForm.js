import React from "react";

const BlogForm = ({ onNewblogChange, onAddNewBlog, newBlog }) => (
  <form onSubmit={onAddNewBlog}>
    <div>
      <label>title</label>
      <input value={newBlog.title} name="title" onChange={onNewblogChange} />
    </div>
    <div>
      <label>author</label>
      <input value={newBlog.author} name="author" onChange={onNewblogChange} />
    </div>
    <label>
      <label>url</label>
      <input value={newBlog.url} name="url" onChange={onNewblogChange} />
    </label>

    <button type="submit">Create</button>
  </form>
);

export default BlogForm;
