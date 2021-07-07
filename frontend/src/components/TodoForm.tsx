import { FormEvent, useState } from 'react';

interface Props {
  addTodo: (value: string) => void;
}

export const TodoForm = ({ addTodo }: Props): JSX.Element => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className="input" value={value} onChange={e => setValue(e.target.value)} />
    </form>
  );
};
