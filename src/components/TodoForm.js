import React, { useState } from "react";
import Button from "./Button";
import "../App.css";

export default function TodoForm() {
  const [text, setText] = useState("");

  const clearText = () => {
    setText("");
  };

  const submitTodo = e => {
    e.preventDefault();
    console.log(text);
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
