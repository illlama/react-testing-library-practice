import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TodoForm from './TodoForm';

describe('<TodoForm />', () => {
  it('has input and a button', () => {
    const { getByText, getByPlaceholderText } = render(<TodoForm />);
    getByPlaceholderText('할 일을 입력하세요');
    getByText('Submit'); // 버튼, 인풋창이 있는지 확인
  });

  it('change input', () => {
    const { getByPlaceholderText } = render(<TodoForm />);
    const input = getByPlaceholderText('할 일을 입력하세요');
    fireEvent.change(input, {
      target: {
        value: 'TDD 배우기',
      },
    });
    expect(input).toHaveAttribute('value', 'TDD 배우기');
  });
  it('calls onInsert and clears input', () => {
    const onInsert = jest.fn(); // Mock함수
    const { getByText, getByPlaceholderText } = render(
      <TodoForm onInsert={onInsert} />,
    );
    const input = getByPlaceholderText('할 일을 입력하세요');
    const button = getByText('Submit');
    //인풋 입력
    fireEvent.change(input, {
      target: {
        value: 'TDD 배우기',
      },
    });
    //버튼 클릭
    fireEvent.click(button);
    expect(onInsert).toBeCalledWith('TDD 배우기'); //onInsert가 TDD 배우기 파라미터가 호출됐어야함
    expect(input).toHaveAttribute('value', '');
  });
});
