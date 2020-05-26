import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./App.css";
import Register from "./components/Register";
import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo";
import Login from "./components/Login";

export default function App() {
  const [isLogin, setIslogin] = useState(Cookies.get("userId") ? true : false);
  const [data, setData] = useState(null);
  const [change, setChange] = useState(null);

  useEffect(() => {
    getTodos();
    console.log("something", change);
  }, [isLogin, change]);

  const reRender = () => {
    setChange(Math.random());
  };

  const getTodos = () => {
    const user_id = Cookies.get("userId");
    axios
      .get(`http://localhost:4000/todos?user_id=${user_id}`)
      .then(res => {
        const todos = res.data.map(todo => {
          return (
            <Todo
              key={todo._id}
              id={todo._id}
              text={todo.text}
              isComplete={todo.isComplete}
              reRender={reRender}
            />
          );
        });
        setData(todos);
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
      {isLogin && (
        <button className="logout" onClick={logout}>
          Logout
        </button>
      )}
      {isLogin && <TodoForm reRender={reRender} />}
      {isLogin && data}
    </div>
  );
}
