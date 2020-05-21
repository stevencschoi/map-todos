import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./App.css";
import Register from "./components/Register";
import TodoForm from "./components/TodoForm";
import Login from "./components/Login";

function App() {
  const [isLogin, setIslogin] = useState(Cookies.get("userId") ? true : false);

  const getTodos = () => {
    const user_id = Cookies.get("userId");
    axios
      .get(`http://localhost:4000/todos?user_id=${user_id}`)
      .then(res => {
        console.log("res", res);
      })
      .catch(error => console.error(error));
  };

  const logout = () => {
    setIslogin(false);
    Cookies.remove("userId");
    axios
      .get(`http://localhost:4000/logout`)
      .then(res => {
        console.log(res);
      })
      .catch(error => console.error(error));
  };
  return (
    <div className="App">
      <header className="App-header"></header>
      {!isLogin && <Register setIslogin={setIslogin} />}
      {!isLogin && <Login setIslogin={setIslogin} />}
      {isLogin && <button onClick={logout}>Logout</button>}
      {isLogin && <TodoForm />}
      {isLogin && <ul className="todos">{getTodos()}</ul>}
    </div>
  );
}

export default App;
