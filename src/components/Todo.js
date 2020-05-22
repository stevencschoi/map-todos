import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Todo(props) {
  const deleteTodo = () => {
    const todoId = props.id;
    const user_id = Cookies.get("userId");
    axios
      .delete(
        `http://localhost:4000/todos/delete?user_id=${user_id}&todoId=${todoId}`
      )
      .then(res => {
        console.log(res);
      })
      .catch(error => console.error(error));
    console.log("delete");
  };

  const toggleComplete = () => {
    console.log("toggle complete");
    // axios.put(`http://localhost:4000/todos/update/${todoId}`);
  };

  return (
    <li>
      <div className="todo">
        <input type="checkbox" name="isComplete" onChange={toggleComplete} />
        <p>{props.text}</p>
        <button className="delete" onClick={deleteTodo}>
          Delete
        </button>
      </div>
    </li>
  );
}
