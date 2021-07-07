// const apiURL = `${process.env.REACT_APP_API_URL}/todos`;
const apiURL = '/api/todos';

export type TodoItem = {
  id: number | '';
  text: string;
  isCompleted: boolean;
};

export const getTodos = async (): Promise<TodoItem[] | undefined> => {
  let result: TodoItem[] | undefined;
  const response = await fetch(apiURL);
  if (response.ok && response.body) {
    result = await response.json();
  }
  return result;
};

export const saveTodo = async (item: TodoItem): Promise<TodoItem | undefined> => {
  let result: TodoItem | undefined;
  const response = await fetch(apiURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  if (response.ok && response.body) {
    result = await response.json();
  }
  return result;
};

export const updateTodo = async (item: TodoItem): Promise<TodoItem | undefined> => {
  let result: TodoItem | undefined;
  const response = await fetch(`${apiURL}/${item.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  if (response.ok && response.body) {
    result = await response.json();
  }
  return result;
};

export const removeTodo = async (id: number): Promise<boolean> => {
  let result = false;
  const response = await fetch(`${apiURL}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok && response.body) {
    result = true;
  }
  return result;
};

const api = {
  getTodos,
  saveTodo,
  updateTodo,
  removeTodo
};

export default api;
