import React from "react";

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
      <button onClick={deleteTodo}>Delete</button>
    </div>
  );
}
