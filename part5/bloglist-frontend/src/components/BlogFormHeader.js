import React from "react";

const BlogFormHeader = ({ user, handleLogout }) => {
  return (
    <div className="subtitle-login-info">
      <p>
        <span className="username">
          Hi!
          <span role="img" aria-label="user-emoji">
            🦊
          </span>
          {"   "}
          {user.username}
        </span>
      </p>
      <button className="btn logout-btn" onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default BlogFormHeader;
