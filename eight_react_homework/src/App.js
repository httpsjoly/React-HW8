import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  fetchTodosSuccess,
} from "./store/actions";

function App() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://64c1582bfa35860baea06bca.mockapi.io/todos"
      );
      const data = await response.json();
      dispatch(fetchTodosSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTodo = async () => {
    if (text.trim() !== "") {
      try {
        const response = await fetch(
          "https://64c1582bfa35860baea06bca.mockapi.io/todos",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text, completed: false }),
          }
        );
        const data = await response.json();
        dispatch(addTodo(data));
        setText("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      await fetch(`https://64c1582bfa35860baea06bca.mockapi.io/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todos.find((todo) => todo.id === id).completed,
        }),
      });
      dispatch(toggleTodo(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await fetch(`https://64c1582bfa35860baea06bca.mockapi.io/todos/${id}`, {
        method: "DELETE",
      });
      dispatch(deleteTodo(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Список тудушек</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAddTodo}>Добавить тудушку</button>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <button onClick={() => handleDeleteTodo(todo.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;