import React from "react";

const TodoItem = props => {
  return (
    <div className="todo-item-wrapper">
      <p className="todo-text">{props.todo}</p>
    </div>
  )
}

export default TodoItem;