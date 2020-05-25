import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Todo(props) {

  const [isedit, setIsedit] = useState(false);
  const [text, setText] = useState(props.text);

  const deleteTodo = i => {
    const todoId = props.id
    const user_id = Cookies.get("userId");
    axios
      .delete(`http://localhost:4000/todos/delete?user_id=${user_id}&todoId=${todoId}`)
      .then(res => {
        console.log(res);
      })
      .catch(error => console.error(error));
    console.log("delete");
  };

  const toggleComplete = i => {
    // todo[i].isComplete = !todo[i].isComplete
    console.log("toggle complete");
  };

  const handleEdit = () => {
    setIsedit(true)
  }

  const handleSave = () => {
    console.log("THISS ID", props.id)
    console.log("THISS", text)
  }

  return (
    <li>
      <div className="todo">
        <input type="checkbox" name="isComplete" onChange={toggleComplete} />
        {!isedit ? <p>{props.text}</p> :
          <input
            type="text"
            name="text"
            value={text}
            onChange={e => setText(e.target.value)}
          />}
        {!isedit ? <button onClick={handleEdit}>Edit</button> : isedit &&
          <button
            onClick={handleSave}
          >Save</button>}
        <button className="delete" onClick={deleteTodo}>
          Delete
        </button>
      </div>
    </li>
  );
}
