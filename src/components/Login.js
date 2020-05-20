import React, { useState } from "react";
import axios from "axios";
import "../App.css";

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const validate = e => {
    axios
      .post(`http://localhost:4000/login`, inputs)
      .then(res => {
        console.log("logged in", res);
        return res;
      })
      .catch(err => console.error(err));
  };

  const handleInputChange = e => {
    e.persist();
    setInputs(inputs => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = e => {
    e.preventDefault();
    validate();
  };

  return (
    <form className="login-form">
      <input
        placeholder="username"
        name="username"
        value={inputs.username}
        onChange={handleInputChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={inputs.password}
        onChange={handleInputChange}
      />
      <button onClick={handleLogin}>Login</button>
    </form>
  );
}
