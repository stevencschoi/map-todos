import React, { useState } from "react";
// import "./styles.5t6css";
import axios from "axios";
import Button from "./Button";

import { Redirect } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const [toHome, setToHome] = useState(false);

  const clearInputs = () => {
    setInputs({
      username: "",
      email: "",
      password: "",
      passwordConf: "",
    });
  };

  const handleInputChange = e => {
    e.persist();
    setInputs(inputs => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    /* now we want to setUser from app */
    console.log("inputs:", inputs);
    axios
      .post(`http://localhost:4000/register`, inputs)
      .then(() => {
        clearInputs();
        setToHome(true);
      })
      .catch(error => console.log(error));
  }

  return (
    <>
      {/* if user registers, redirect to home page */}
      {toHome && <Redirect to="/" />}
      <form onSubmit={handleSubmit} className="registerform">
        <input
          placeholder="username"
          name="username"
          value={inputs.username}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={inputs.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={handleInputChange}
        />
        <input
          type="passwordConf"
          placeholder="password confirmation"
          name="passwordConf"
          value={inputs.passwordConf}
          onChange={handleInputChange}
        />

        <Button register type="submit">
          Create Account
        </Button>
      </form>
    </>
  );
};

export default Register;