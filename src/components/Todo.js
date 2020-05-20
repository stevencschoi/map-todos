import React from "react";
import Button from "./Button";

export default function Todo(props) {
  const deleteTodo = i => {
    // delete todo[i]
    console.log("delete");
  };

  const toggleComplete = i => {
    // todo[i].isComplete = !todo[i].isComplete
    console.log("toggle complete");
  };

  return (
    <div className="todo">
      <input type="checkbox" name="isComplete" onChange={toggleComplete} />
      <p>{props.text}</p>
      <Button onClick={deleteTodo}>Delete</Button>
    </div>
  );
}
