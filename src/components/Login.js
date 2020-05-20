import React from "react";
import Button from "./Button";
import "../App.css";

export default function Login() {
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
      <Button onClick={handleLogin}></Button>
    </form>
  );
}
