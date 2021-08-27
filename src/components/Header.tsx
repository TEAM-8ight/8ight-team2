import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { status } from 'constants/status';
import { importance } from 'constants/importance';
import {
  AiOutlineSearch,
  AiFillPushpin,
  AiOutlineFileDone,
} from 'react-icons/ai';

const Header = ({ todos, handleStatusFilter, setFilterByImportance }: any) => {
  const [filterByStatus, setFilterByStatus] = useState<any>([...todos]);

  const handleFilterByImportance = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFilterByImportance(e.target.value);
  };

  const handleFilterByStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterByStatus(e.target.value);
    handleStatusFilter(e.target.value);
  };

  const onCheckCompleteTodos = () => {
    let checkedTodos = todos.filter((todo: any) => todo.done === true);
    setCompletedTodos(checkedTodos.length);
  };

  useEffect(() => {
    onCheckCompleteTodos();
  }, [todos]);

  return (
    <Nav>
      <NavContainer>
        <NavLogo>
          <AiFillPushpin />
          TodoList
        </NavLogo>
        <NavMenu>
          <NavItem>
            <AiOutlineFileDone />
            {`${completedTodos}/${todos.length}`}
          </NavItem>
          <NavItem>
            <Select name="importance" onChange={handleFilterByImportance}>
              <option value="">중요도 선택</option>
              <option value={importance.HIGH}>상</option>
              <option value={importance.INTERMEDIATE}>중</option>
              <option value={importance.LOW}>하</option>
            </Select>
            <Select name="status" onChange={handleFilterByStatus}>
              <option value="">상태 선택</option>
              <option value={status.NOT_STARTED}>시작안함</option>
              <option value={status.ONGOING}>진행중</option>
              <option value={status.FINISHED}>완료함</option>
            </Select>
          </NavItem>
        </NavMenu>
      </NavContainer>
    </Nav>
  );
};

const Nav = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 720px;
`;

const NavLogo = styled.span`
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;

  & > svg {
    margin-right: 1rem;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  height: 60px;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &:hover {
    border-bottom: 3px solid lightgray;
  }

  & > svg {
    font-size: 24px;
    margin-right: 5px;
  }
`;

const Select = styled.select`
  width: 100px;
  padding: 0.8em 0.5em;
  border: 1px solid #999;
  font-family: inherit;
  border-radius: 0px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  select::-ms-expand {
    display: none;
  }
`;

export default Header;
