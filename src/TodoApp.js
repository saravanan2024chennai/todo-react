import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    axios.get('http://44.201.114.173:9086/api/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.log(error));
  }, []);

  const addTodo = () => {
    const newTodo = { task, completed: false };
    axios.post('http://44.201.114.173:9086/api/todos', newTodo)
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
