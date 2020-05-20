import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import logo from './logo.svg';
import "./App.css";
import Nav from "./components/Nav";
import Register from "./components/Register";
import TodoForm from "./components/TodoForm";

function App() {
  const logout = () => {
    Cookies.remove('userId');
    axios
      .get(`http://localhost:4000/logout`)
      .then((res) => {
        console.log(res)
      })
      .catch(error => console.log(error));
  }
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
      <Register />
      <TodoForm />
      <button
      onClick={logout}
      >Logout</button>
    </div>
  );
}

export default App;
