import React from 'react';
import styled from 'styled-components';
import {
  AiOutlineSearch,
  AiFillPushpin,
  AiOutlineFileDone,
} from 'react-icons/ai';

const Header = () => {
  return (
    <Nav>
      <NavContainer>
        <NavLogo>
          <AiFillPushpin />
          TodoList
        </NavLogo>
        <NavMenu>
          <NavItem>
            <AiOutlineSearch />
          </NavItem>
          <NavItem>
            <AiOutlineFileDone />0 / 5
          </NavItem>
          <NavItem>
            {/* Todo: 스타일 개선 */}
            <Select>
              <option value="" hidden>
                Example Placeholder
              </option>
              <option>시작 안함</option>
              <option>진행 중</option>
              <option>완료</option>
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
  width: 200px;
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
