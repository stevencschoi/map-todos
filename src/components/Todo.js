import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import { set } from "mongoose";

export default function Todo(props) {
  const [isedit, setIsedit] = useState(false);
  const [text, setText] = useState(props.text);
  const [isComplete, setIsComplete] = useState(props.isComplete);

  const deleteTodo = () => {
    const todoId = props.id;
    const user_id = Cookies.get("userId");
    axios
      .delete(
        `http://localhost:4000/todos/delete?user_id=${user_id}&todoId=${todoId}`
      )
      .then(res => {
        props.reRender();
      })
      .catch(error => console.error(error));
    // console.log("delete");
  };

  const toggleComplete = () => {
    isComplete ? setIsComplete(false) : setIsComplete(true);
    const todoId = props.id;
    axios
      .put(`http://localhost:4000/todos/update`, { todoId, isComplete })
      .then(res => {
        console.log(res);
      })
      .catch(error => console.error(error));
  };

  const handleEdit = () => {
    setIsedit(true);
  };

  const handleSave = () => {
    const todoId = props.id;
    const todoText = text;
    axios
      .put(`http://localhost:4000/todos/edit`, { todoId, todoText })
      .then(res => {
        props.reRender();
      })
      .catch(error => console.error(error));
    setIsedit(false);
  };

  return (
    <li>
      <div className="todo">
        <input
          type="checkbox"
          name="isComplete"
          onChange={toggleComplete}
          checked={isComplete}
        />
        {!isedit ? (
          <p>{props.text}</p>
        ) : (
          <input
            type="text"
            name="text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        )}
        {!isedit ? (
          <button onClick={handleEdit}>Edit</button>
        ) : (
          <button onClick={handleSave}>Save</button>
        )}
        <button className="delete" onClick={deleteTodo}>
          Delete
        </button>
      </div>
    </li>
  );
}
