import { useEffect, useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { Todo } from './components/Todo';
import api, { TodoItem } from './api/todo';
import './App.css';

function App(): JSX.Element {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = async (text: string) => {
    let newTodo: TodoItem = { id: '', text, isCompleted: false };
    const todoFromServer = await api.saveTodo(newTodo);
    if (todoFromServer) {
      const newTodos = [...todos, todoFromServer];
      setTodos(newTodos);
    }
  };

  const completeTodo = async (index: number) => {
    const completedTodo = todos[index];
    completedTodo.isCompleted = true;
    const todoFromServer = await api.updateTodo(completedTodo);
    if (todoFromServer) {
      const newTodos = [...todos];
      newTodos[index] = todoFromServer;
      setTodos(newTodos);
    }
  };

  const removeTodo = async (index: number) => {
    const result = await api.removeTodo(todos[index].id as number);
    if (result) {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    }
  };

  useEffect(() => {
    const getTodos = async () => {
      const todosFromServer = await api.getTodos();
      if (todosFromServer) {
        setTodos(todosFromServer);
      }
    };
    getTodos();
  }, []);

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
