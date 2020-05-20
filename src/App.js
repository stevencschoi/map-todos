import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./App.css";
import Nav from "./components/Nav";
import Register from "./components/Register";
import TodoForm from "./components/TodoForm";
import Login from "./components/Login";

function App() {
  const logout = () => {
    Cookies.remove("userId");
    axios
      .get(`http://localhost:4000/logout`)
      .then(res => {
        console.log(res);
      })
      .catch(error => console.log(error));
  };
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
      <Register />
      <Login />
      <button onClick={logout}>Logout</button>
      <TodoForm />
    </div>
  );
}

export default App;
