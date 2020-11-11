import React, { useState, useRef, useCallback } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const TodoApp = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'TDD 배우기',
      done: true,
    },
    {
      id: 2,
      text: 'react testing library practice',
      done: false,
    },
  ]);
  const nextId = useRef(3);

  const onInsert = useCallback(
    (text) => {
      setTodos(
        todos.concat({
          id: nextId.current,
          text,
          done: false,
        }),
      );
      //nextId +1
      nextId.current += 1;
    },
    [todos],
  );
  return (
    <>
      <TodoForm data-testid="helloworld" onInsert={onInsert} />
      <TodoList todos={todos} />
    </>
  );
};

export default TodoApp;
