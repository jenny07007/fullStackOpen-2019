import React from "react";

const BlogForm = ({ onNewblogChange, onAddNewBlog, newBlog }) => (
  <form onSubmit={onAddNewBlog} className="create-new-form">
    <div className="form-item">
      <label>title</label>
      <input value={newBlog.title} name="title" onChange={onNewblogChange} />
    </div>
    <div className="form-item">
      <label>author</label>
      <input value={newBlog.author} name="author" onChange={onNewblogChange} />
    </div>
    <div className="form-item">
      <label>url</label>
      <input value={newBlog.url} name="url" onChange={onNewblogChange} />
    </div>

    <button className="btn submit-btn" type="submit">
      Create
    </button>
  </form>
);

export default BlogForm;
