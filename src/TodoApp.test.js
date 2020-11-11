import React from 'react';
import TodoApp from './TodoApp';
import { render, fireEvent } from '@testing-library/react';

describe('<TodoApp />', () => {
  it('renders TodoForm and TodoList', () => {
    const { getByText, getByTestId } = render(<TodoApp />);
    getByText('Submit');
    getByTestId('TodoList');
  });

  it('renders two defaults todos', () => {
    const { getByText } = render(<TodoApp />);
    getByText('TDD 배우기');
    getByText('react testing library practice');
  });

  //새로운 항목을 추가
  it('creates new todo', () => {
    const { getbyPlaceholderText, getByText } = render(<TodoApp />);
    fireEvent.change(getbyPlaceholderText('할 일을 입력하세요'), {
      target: {
        value: '새 항목 추가하기',
      },
    });
    fireEvent.click(getByText('Submit'));
    getByText('새 항목 추가하기');
  });
});
