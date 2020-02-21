import React from "react";
import PropTypes from "prop-types";

const LoginForm = ({ handleLogin, username, password }) => {
  return (
    <form onSubmit={handleLogin} className="form-login">
      <div className="form-item">
        <label>username</label>
        <input
          type={username.type}
          value={username.value}
          name="username"
          onChange={username.handleChange}
        />
      </div>
      <div className="form-item">
        <label>password</label>
        <input
          type={password.type}
          value={password.value}
          name="password"
          onChange={password.handleChange}
        />
      </div>
      <button className="btn submit-btn" type="submit">
        Login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;
