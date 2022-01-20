import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";
import "./style.scss";
import axios from "axios";

export default function Login() {
  const { userHasAuthenticated } = useAppContext();
  const history = useHistory();

  var [username, setUsername] = useState("");
  var [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:4000/users/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.username);
        userHasAuthenticated(true);
        history.push("/");
      });
  }

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  return (
    <div className="base-container">
      <h2>Food Tracer</h2>
      <div className="header">Login</div>
      <div className="content">
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button
          type="button"
          className="btn"
          disabled={!validateForm()}
          onClick={handleSubmit}
        >
          LogIn
        </button>
      </div>
    </div>
  );
}
