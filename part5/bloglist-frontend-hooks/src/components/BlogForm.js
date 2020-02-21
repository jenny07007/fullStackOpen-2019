import React from "react";
import PropTypes from "prop-types";

const BlogForm = ({ onAddNewBlog, title, author, url }) => (
  <form onSubmit={onAddNewBlog} className="create-new-form">
    <div className="form-item">
      <label>title</label>
      <input
        type={title.type}
        value={title.value}
        name="title"
        onChange={title.handleChange}
      />
    </div>
    <div className="form-item">
      <label>author</label>
      <input
        type={author.type}
        value={author.value}
        name="author"
        onChange={author.handleChange}
      />
    </div>
    <div className="form-item">
      <label>url</label>
      <input
        type={url.type}
        value={url.value}
        name="url"
        onChange={url.handleChange}
      />
    </div>

    <button className="btn submit-btn" type="submit">
      Create
    </button>
  </form>
);

BlogForm.propTypes = {
  onAddNewBlog: PropTypes.func.isRequired
};

export default BlogForm;
