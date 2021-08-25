import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import styled from 'styled-components';
import TodoInput from './TodoInput';


const MainPage = () => {
  const [selected, setSelected] = useState<any>([]);

  const handleStatusFilter = (filteredTodos: any) => {
    setSelected(filteredTodos);
  };

  return (
    <Container>
      <Header handleStatusFilter={handleStatusFilter} />
      <TodoInput />
    </Container>
  );
};

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
`;

export default MainPage;
