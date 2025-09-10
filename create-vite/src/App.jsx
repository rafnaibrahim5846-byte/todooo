import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newTodo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div style={styles.container}>
      <h1>Todo List</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          placeholder="Add a new task..."
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddTodo} style={styles.button}>
          Add
        </button>
      </div>

      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} style={styles.listItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span
              style={{
                ...styles.todoText,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#999' : '#000',
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={styles.deleteBtn}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div style={styles.footer}>
        <span>{activeCount} task{activeCount !== 1 ? 's' : ''} left</span>
        <button onClick={clearCompleted} style={styles.clearBtn}>
          Clear Completed
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '400px',
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  input: {
    flex: 1,
    padding: '8px',
    fontSize: '16px',
  },
  button: {
    padding: '8px 12px',
    marginLeft: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '1rem',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '6px 0',
  },
  todoText: {
    flex: 1,
    marginLeft: '10px',
    textAlign: 'left',
  },
  deleteBtn: {
    marginLeft: '10px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#555',
  },
  clearBtn: {
    backgroundColor: '#888',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default TodoList;
