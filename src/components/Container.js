import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const Container = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [clear, setClear] = useState(false);
  const [type, setType] = useState("all");

  useEffect(() => {
    if (type === "all") {
      setFilteredTodos(todos);
    } else if (type === "active") {
      setFilteredTodos(todos.filter(todo => todo.checked === false));
    } else if (type === "completed") {
      setFilteredTodos(todos.filter(todo => todo.checked === true));
    }
  }, [type, todos]);

  const handleEnter = event => {
    if (event.keyCode === 13) {
      setTodos(todos => [...todos, {
        text: event.target.value,
        checked: false
      }]);
      setText("");
    }
  }

  const handleDelete = (id) => {
    var todosArray = [...todos];
    if (id !== -1) {
      todosArray.splice(id, 1);
      setTodos(todosArray);
    }
  }

  const handleCheck = (id, checkedParam) => {
    var todosArray = [...todos];
    var todo = {...todosArray[id]}
    if (checkedParam) {
      todo.checked = true;
      setClear(false);
    } else {
      todo.checked = false;
    }
    todosArray[id] = todo;
    setTodos(todosArray);
  }

  const handleClear = () => {
    setTodos(todos => todos.filter(todo => todo.checked === false));
    setClear(true);
  }

  const handleAll = () => {
    setType("all");
  }

  const handleActive = () => {
    setType("active");
  }

  const handleCompleted = () => {
    setType("completed");
  }

  return (
    <div className="container">
      <h1 className="todo-title">TODO</h1>
      <div className="input-wrapper">
        <input type="text" value={text} onChange={e => setText(e.target.value)} onKeyDown={handleEnter} />
      </div>
      <div className="todo-list">
      {
        filteredTodos.map((todo, index) => 
          <TodoItem 
            key={index}
            id={index}
            todo={todo}
            clear={clear}
            handleDelete={handleDelete}
            handleCheck={handleCheck} />
        )
      }
        <div className="todo-item-wrapper foot-nav">
          <p className="left-item">{todos.filter(todo => todo.checked === false).length} items left</p>
          <div className="action-btns">
            <button className={(type==="all" ? "active" : "")} onClick={handleAll}>All</button>
            <button className={(type==="active" ? "active" : "")} onClick={handleActive}>Active</button>
            <button className={(type==="completed" ? "active" : "")} onClick={handleCompleted}>Completed</button>
          </div>
          <button onClick={handleClear} className="clear-btn">Clear Completed</button>
        </div>
      </div>
    </div>
  )
}

export default Container;