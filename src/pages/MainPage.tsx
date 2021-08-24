import React from 'react';
import Header from 'components/Header';
import styled from 'styled-components';
import TodoInput from './TodoInput';

const MainPage = () => {
  return (
    <Container>
      <Header />
      <TodoInput />
    </Container>
  );
};

const Container = styled.div`
  max-width: 768px; 
  margin:0 auto;

`

export default MainPage;
