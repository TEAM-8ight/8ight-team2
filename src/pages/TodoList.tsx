import React, { useState } from 'react';
import { dummy } from 'constants/dummy';
import styled from 'styled-components';

const TodoList = ({ optionValue }: { optionValue: string }) => {
  interface todoType {
    id: number;
    taskName: string;
    isComplete: boolean;
    status: string;
  }
  const [todoState, setTodoState] = useState<todoType>({
    id: 1,
    taskName: '',
    isComplete: false,
    status: '',
  });

  const { id, taskName, isComplete } = todoState;
  return (
    <Container>
      {optionValue
        ? dummy
            .filter((item) => item.status === optionValue)
            .map((item) => (
              <ListItem key={item.id}>
                <input
                  type="checkbox"
                  name="isComplete"
                  value={item.taskName}
                />
                <span>Todo: {item.taskName}</span>
                <span>상태: {item.status}</span>
              </ListItem>
            ))
        : dummy.map((item) => (
            <ListItem key={item.id}>
              <input type="checkbox" name="isComplete" value={item.taskName} />
              <span>Todo: {item.taskName}</span>
              <span>상태: {item.status}</span>
            </ListItem>
          ))}
    </Container>
  );
};

const Container = styled.article`
  text-align: center;
  border: 1px solid black;
`;

const ListItem = styled.section`
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid black;
  padding: 20px;
  width: 100%;
  input {
    width: 20%;
    text-align: left;
  }
  span {
    width: 80%;
    text-align: left;
  }
`;

export default TodoList;
