import React from 'react';
import TodoList from './TodoList';
import { fireEvent, render } from '@testing-library/react';

describe('<TodoList />', () => {
  const sampleTodos = [
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
  ];

  it('renders todos properly', () => {
    const { getByText } = render(<TodoList todos={sampleTodos} />);
    getByText(sampleTodos[0].text);
    getByText(sampleTodos[1].text); // todos 배열을 넣을때 두 TodoItem이 렌더링 되는지 확인
  });

  it('calls onToggle and onRemove', () => {
    const onToggle = jest.fn();
    const onRemove = jest.fn();
    const { getByText, getAllByText } = render(
      <TodoList todos={sampleTodos} onToggle={onToggle} onRemove={onRemove} />,
    );

    fireEvent.click(getByText(sampleTodos[0].text));
    expect(onToggle).toBeCalledWith(sampleTodos[0].id);

    fireEvent.click(getAllByText('delete')[0]); // 첫번째 삭제 버튼 클릭
    expect(onRemove).toBeCalledWith(sampleTodos[0].id);
  });
});
