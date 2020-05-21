import React, { useState } from "react";
import Button from "./Button";
import "../App.css";
import axios from "axios";

export default function TodoForm() {
  const [text, setText] = useState("");

  const clearText = () => {
    setText("");
  };

  // useState(Cookies.get('userId')

  const submitTodo = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:4000/todos`, { text })
      .then(res => {
        console.log("Pushed:", res);
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
      <Button type="submit">Submit</Button>
    </form>
  );
}
