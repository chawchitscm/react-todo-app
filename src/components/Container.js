import React, { useState } from "react";
import TodoItem from "./TodoItem";

const Container = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const handleEnter = event => {
    if (event.keyCode === 13) {
      console.log(event.target.value);
      setTodos(todos => [...todos, event.target.value]);
      setText("");
    }
  }

  return (
    <div className="container">
      <h1 className="todo-title">TODO</h1>
      <div className="input-wrapper">
        <input type="text" value={text} onChange={e => setText(e.target.value)} onKeyDown={handleEnter} />
      </div>
      <div className="todo-list">
      {
        todos.map((todo, index) => 
          <TodoItem key={index} todo={todo} />
        )
      }
      </div>
    </div>
  )
}

export default Container;