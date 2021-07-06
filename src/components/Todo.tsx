import { TodoItem } from '../api/todo';

interface Props {
  todo: TodoItem;
  index: number;
  completeTodo: (index: number) => void;
  removeTodo: (index: number) => void;
}

export const Todo = ({ todo, index, completeTodo, removeTodo }: Props): JSX.Element => {
  return (
    <div className="todo" style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}>
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
};
