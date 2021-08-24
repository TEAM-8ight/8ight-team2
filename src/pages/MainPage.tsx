import React from 'react';
import Header from 'components/Header';
import TodoList from './TodoList';
import styled from 'styled-components';

const MainPage = () => {
  return (
    <Container>
      <Header />
      <TodoList />
    </Container>
  );
};

const Container = styled.div`
  max-width: 768px; 
  margin:0 auto;

`

export default MainPage;
