import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TodoList from './TodoList';
import { importance } from '../constants/importance';

const status = {
  FINISHED: '완료',
  ONGOING: '진행중',
  NOT_STARTED: '시작안함',
};

export interface todoType {
  id: number;
  taskName: string;
  status: string;
  isComplete: boolean;
  createdAt: string;
  updatedAt: string;
  importance: string;
}

const getFormatDate = (date: Date) => {
  let year: number = date.getFullYear();
  let month: string | number = 1 + date.getMonth();
  month = month >= 10 ? month : '0' + month;
  let day: string | number = date.getDate();
  day = day >= 10 ? day : '0' + day;
  return [year, month, day].join('-');
};

const TodoInput = ({ selected }: any) => {
  let initialTodos: todoType[] = [];
  const id: number = Date.now();

  const [value, setValue] = useState<string>('');
  const [createState, setCreateState] = useState(initialTodos);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === '') {
      return;
    }
    const today: Date = new Date();

    createList({
      id,
      taskName: value,
      status: status.NOT_STARTED,
      isComplete: false,
      createdAt: getFormatDate(today),
      updatedAt: '',
      importance: importance.INTERMEDIATE,
    });

    setValue('');
  };

  const handleClick = () => {
    if (value === '') {
      setErrorMsg('내용을 입력하세요');
      return;
    }
    setErrorMsg('');
    // todo validatation
  };

  const createList = (todo: todoType) => {
    setCreateState((prevState) =>
      [
        {
          ...todo,
          id,
        },
      ].concat(prevState),
    );
  };

  useEffect(() => {
    let data = localStorage.getItem('todos');
    if (data === undefined) {
      data = '';
    }
    setCreateState(JSON.parse(data!));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(createState));
  }, [createState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };
  return (
    <Container>
      <CreateForm onSubmit={handleSubmit}>
        <Input placeholder="할일 적기" value={value} onChange={handleChange} />
        <InputButton onClick={handleClick}>할일 추가</InputButton>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </CreateForm>

      <TodoList createState={createState} setCreateState={setCreateState} />
    </Container>
  );
};

const Container = styled.div``;

const CreateForm = styled.form`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.4);
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 3px;
`;

const InputButton = styled.button`
  margin-left: 20px;
  background-color: black;
  color: white;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
`;

const ErrorMsg = styled.span`
  margin-left: 20px;
  color: red;
`;

export default TodoInput;
