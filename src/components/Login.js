import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../App.css";

export default function Login({ setIslogin }) {
  const [inputs, setInputs] = useState({
    logemail: "",
    logpassword: "",
  });

  const validate = obj => {
    axios
      .post(`http://localhost:4000/register`, obj)
      .then(res => {
        // console.log("logged in", res.data);
        Cookies.set("userId", res.data);
        setIslogin(true);
        // return res;
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
    validate(inputs);
  };

  return (
    <form className="login-form">
      <input
        placeholder="email"
        name="logemail"
        value={inputs.logemail}
        onChange={handleInputChange}
      />
      <input
        type="password"
        placeholder="password"
        name="logpassword"
        value={inputs.logpassword}
        onChange={handleInputChange}
      />
      <button onClick={handleLogin}>Login</button>
    </form>
  );
}
