import React, { useState } from 'react';
import Header from 'components/Header';
import TodoList from './TodoList';
import styled from 'styled-components';

const MainPage = () => {
  const [optionValue, setOptionValue] = useState('');
  return (
    <Container>
      <Header setOptionValue={setOptionValue} />
      <TodoList optionValue={optionValue} />
    </Container>
  );
};

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
`;

export default MainPage;
