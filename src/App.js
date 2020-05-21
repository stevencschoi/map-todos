import React, {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./App.css";
import Nav from "./components/Nav";
import Register from "./components/Register";
import TodoForm from "./components/TodoForm";
import Login from "./components/Login";

function App() { 
  const [isLogin, setIslogin] = useState(Cookies.get('userId') ? true : false )

  const logout = () => {
    setIslogin(false)
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
      {!isLogin && <Register setIslogin={setIslogin}/>}
      {!isLogin && <Login setIslogin={setIslogin}/>}
      {isLogin && <button onClick={logout}>Logout</button>}
      {isLogin && <TodoForm />}
    </div>
  );
}

export default App;
