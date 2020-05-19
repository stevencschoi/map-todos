import React from "react";
import Button from "./Button";

export default function Todo(props) {
  return (
    <div className="todo">
      <input type="checkbox" name="isComplete" />
      <p>{props.text}</p>
      <Button>Delete</Button>
    </div>
  );
}
