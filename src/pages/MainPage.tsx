import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import styled from 'styled-components';
import { dummy } from '../constants/dummy';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

const MainPage = () => {
  const [selected, setSelected] = useState<any>([...dummy]);

  const handleStatusFilter = (filteredTodos: any) => {
    setSelected(filteredTodos);
  };

  return (
    <Container>
      <Header todos={[...dummy]} handleStatusFilter={handleStatusFilter} />
      <TodoList selected={selected} />
      <TodoInput />
    </Container>
  );
};

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
`;

export default MainPage;
