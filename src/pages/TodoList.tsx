import React, { useState } from 'react';
import styled from 'styled-components';
import { todoType } from './TodoInput';
import { AiFillDelete } from 'react-icons/ai';

interface TodoCreateProps {
  createState: todoType[];
  setCreateState: React.Dispatch<React.SetStateAction<todoType[]>>;
}

const initialDragData = {
  target: null,
  index: -1,
  moveUp: [],
  moveDown: [],
  updateList: [],
};

const TodoList = ({ createState, setCreateState }: TodoCreateProps) => {
  const [dragData, setDragData] = useState<any>(initialDragData);
  const [isDrag, setIsDrag] = useState<boolean>(false);

  const onDragOver = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    return true;
  };

  const onDragStart = (e: any) => {
    setIsDrag(true);

    setDragData({
      ...dragData,
      target: e.target,
      index: Number(e.target.dataset.index),
      updateList: [...createState],
    });

    e.dataTransfer.setData('text/html', '');
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnter = (e: any) => {
    let dragged = Number(dragData.target.dataset.index);
    let draggedIndex = Number(dragData.index);
    let targetIndex = Number(e.target.dataset.index);

    let moveUp = [...dragData.moveUp];
    let moveDown = [...dragData.moveDown];

    let data = [...dragData.updateList];
    data[draggedIndex] = data.splice(targetIndex, 1, data[draggedIndex])[0];

    if (dragged > targetIndex) {
      moveDown.includes(targetIndex)
        ? moveDown.pop()
        : moveDown.push(targetIndex);
    } else if (dragged < targetIndex) {
      moveUp.includes(targetIndex) ? moveUp.pop() : moveUp.push(targetIndex);
    } else {
      moveUp = [];
      moveDown = [];
    }
    setDragData({
      ...dragData,
      updateList: data,
      index: targetIndex,
      moveUp,
      moveDown,
    });
  };

  const onDragLeave = (e: any) => {
    if (e.target === dragData.target) {
      e.target.style.visibility = 'hidden';
    }
  };

  const onDragEnd = (e: any) => {
    setIsDrag(false);
    setCreateState([...dragData.updateList]);

    setDragData({
      ...dragData,
      move_down: [],
      move_up: [],
      updateLists: [],
    });

    e.target.style.visibility = 'visible';
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDelete = (id: number) => {
    setCreateState((prevState) =>
      prevState.filter((item: todoType) => item.id !== id),
    );
  };

  console.log(createState);

  return (
    <Container onDragOver={onDragOver}>
      {createState.map((item, i) => {
        let defaultClass = '';

        dragData.moveDown.includes(i) && (defaultClass = 'move_down');

        dragData.moveUp.includes(i) && (defaultClass = 'move_up');

        return (
          <div style={{ display: 'flex' }}>
            <ListItem
              key={item.id}
              data-index={i}
              draggable
              onDragStart={onDragStart}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDragEnd={onDragEnd}
              className={defaultClass}
              isDrag={isDrag}
            >
              <input type="checkbox" name="isComplete" value={item.taskName} />
              <span>{item.taskName}</span>
              <span>{item.status}</span>
              <span>{item.createdAt}</span>
            </ListItem>
            <DeleteButton onClick={() => handleDelete(item.id)}>
              <AiFillDelete size={20} />
            </DeleteButton>
          </div>
        );
      })}
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 1px solid black;
  background-color: white;
  border-radius: 5px;
`;

const ListItem = styled.li<{ isDrag: boolean }>`
  width: 760px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  padding: 15px 8px;
  user-select: none;
  touch-action: none;
  cursor: grab;
  height: 66px;

  ${(props) => props.isDrag && 'transition: transform 200ms ease 0s'};

  /* &.move_up {
    transform: translate(0, -65px);
    z-index: 1;
  }

  &.move_down {
    transform: translate(0, 65px);
    z-index: 1;
  } */

  & > * {
    pointer-events: none;
  }

  :last-child {
    border: 0;
  }
  input {
    width: 20%;
    text-align: left;
  }
  span {
    width: 80%;
    text-align: left;
  }
`;

const DeleteButton = styled.button`
  cursor: pointer;
  svg {
    width: 50px;
  }
`;

export default TodoList;
