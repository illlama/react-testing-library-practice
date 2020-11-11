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
    //이벤트를 발생시켜서 새로운 항목을 추가하면
    fireEvent.change(getbyPlaceholderText('할 일을 입력하세요'), {
      target: {
        value: '새 항목 추가하기',
      },
    });
    fireEvent.click(getByText('Submit'));
    getByText('새 항목 추가하기');
  });
  //Toggle
  it('toggles todo', () => {
    const { getByText } = render('TDD 배우기');
    //TDD 배우기 항목에 클릭을 발생 후 text-decoration의 속성 확인
    const todoText = getByText('TDD 배우기');
    expect(todoText).toHaveStyle('text-decoration: line-through;');
    fireEvent.click(todoText);
    expect(todoText).not.toHaveStyle('text-decoration: line-through;');
    fireEvent.click(todoText);
    expect(todoText).toHaveStyle('text-decoration: line-through;');
  });
});
