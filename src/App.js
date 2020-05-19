import React from "react";
// import logo from './logo.svg';
import "./App.css";
import Nav from "./components/Nav";
import Register from "./components/Register";
import TodoForm from "./components/TodoForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
      <Register />
      <TodoForm />
    </div>
  );
}

export default App;
