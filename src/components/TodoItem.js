import React, { useEffect, useState } from "react";

const TodoItem = props => {
  const [strike, setStrike] = useState("todo-text");

  useEffect(() => {
    if(props.clear) {
      setStrike("todo-text");
    }
    if (props.todo.checked) {
      setStrike("todo-text strikethrough");
    } else {
      setStrike("todo-text");
    }
  }, [props.clear, props.todo]);

  const handleCheck = () => {
    if (strike === "todo-text") {
      setStrike("todo-text strikethrough");
      props.handleCheck(props.id, true);
    } else {
      setStrike("todo-text");
      props.handleCheck(props.id, false);
    }
  }

  return (
    <div className="todo-item-wrapper">
      <input type="checkbox" onChange={handleCheck} checked={props.todo.checked } />
      <p className={strike}>{props.todo.text}</p>
      <button onClick={() => props.handleDelete(props.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
      </button>
    </div>
  )
}

export default TodoItem;