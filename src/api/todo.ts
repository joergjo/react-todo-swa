const apiURL = `${process.env.REACT_APP_API_URL}/todos`;

const wait = async (ms: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

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

export const removeTodo = async (id: number): Promise<TodoItem | undefined> => {
  let result: TodoItem | undefined;
  const response = await fetch(`${apiURL}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok && response.body) {
    result = await response.json();
  }
  return result;
};

export default {
  getTodos,
  saveTodo,
  updateTodo,
  removeTodo
};
