import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import Cookies from "js-cookie";

export default function TodoForm(props) {
  const [text, setText] = useState("");

  const clearText = () => {
    setText("");
  };

  const submitTodo = e => {
    const user_id = Cookies.get("userId");
    e.preventDefault();
    axios
      .post(`http://localhost:4000/todos`, { user_id, text })
      .then(res => {
        console.log(res.data);
        console.log("Pushed");
        props.reRender();
      })
      .catch(error => console.log(error));
    clearText();
  };

  return (
    <form className="todo-form" onSubmit={submitTodo}>
      <input
        type="text"
        name="text"
        value={text}
        placeholder="What do you need to do?"
        onChange={e => setText(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
