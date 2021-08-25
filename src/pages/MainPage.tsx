import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import styled from 'styled-components';
import TodoInput from './TodoInput';

const MainPage = () => {
  const storage = JSON.parse(localStorage.getItem('todos') || '[]');
  const [selected, setSelected] = useState<any>([...storage]);
  const handleStatusFilter = (filteredTodos: any) => {
    setSelected(filteredTodos);
  };
  return (
    <Container>
      <Header todos={[...storage]} handleStatusFilter={handleStatusFilter} />
      <TodoInput selected={selected} />
    </Container>
  );
};

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
`;

export default MainPage;
