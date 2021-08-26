import React, { useState } from 'react';
import styled from 'styled-components';
import { todoType } from '../pages/MainPage';
import { AiFillDelete } from 'react-icons/ai';

interface TodoCreateProps {
  createState: todoType[];
  setCreateState: React.Dispatch<React.SetStateAction<todoType[]>>;
  setSelected: any;
  selected: todoType[];
}

const initialDragData = {
  target: null,
  index: -1,
  moveUp: [],
  moveDown: [],
  updateList: [],
};

const TodoList = ({
  createState,
  setCreateState,
  setSelected,
  selected,
}: TodoCreateProps) => {
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
      updateList: [...selected],
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
    setSelected([...dragData.updateList]);
    console.log([...dragData.updateList]);
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
    setSelected((prevState: any) =>
      prevState.filter((item: todoType) => item.id !== id),
    );
  };

  const handleImportanceChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number,
  ) => {
    const { value } = e.target;
    setSelected((prevState: todoType[]) =>
      prevState.map((todo: todoType) => {
        if (todo.id === id) {
          return {
            ...todo,
            importance: value,
          };
        }
        return todo;
      }),
    );
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>, id: number,) => {
    const { value } = e.target;
    setSelected((prevState: todoType[]) =>
      prevState.map((todo: todoType) => {
        if (todo.id === id) {
          return {
            ...todo,
            status: value,
          };
        }
        return todo;
      })
    )
  }

  return (
    <Container onDragOver={onDragOver}>
      {selected.map((item, i) => {
        let defaultClass = '';

        dragData.moveDown.includes(i) && (defaultClass = 'move_down');

        dragData.moveUp.includes(i) && (defaultClass = 'move_up');

        return (
          <ListContainer key={item.id}>
            <input type="checkbox" name="isComplete" value={item.taskName} />

            <ListItem
              data-index={i}
              draggable
              onDragStart={onDragStart}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDragEnd={onDragEnd}
              className={defaultClass}
              isDrag={isDrag}
            >
              <span>{item.taskName}</span>
              <span>{item.createdAt}</span>
            </ListItem>
            <StatusSelect name="status" onChange={(e) => handleStatusChange(e, item.id)}>
              <option value="시작안함">시작안함</option>
              <option value="완료">완료</option>
              <option value="진행중">진행중</option>
            </StatusSelect>

            <ImportanceSelect
              name="importance"
              onChange={(e) => handleImportanceChange(e, item.id)}
            >
              <option value="중요도">{item.importance || "중요도"}</option>
              {item.importance === '상' ? '' : <option value="상">상</option>}
              {item.importance === '중' ? '' : <option value="중">중</option>}
              {item.importance === '하' ? '' : <option value="하">하</option>}
            </ImportanceSelect>
            <DeleteButton onClick={() => handleDelete(item.id)}>
              <AiFillDelete size={20} />
            </DeleteButton>
          </ListContainer>
        );
      })}
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  background-color: white;
  border-radius: 5px;
`;

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  :not(:last-child) {
    border-bottom: 1px solid black;
  }
  padding: 10px 20px;
`;

const ListItem = styled.li<{ isDrag: boolean }>`
  width: 760px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  display: flex;
  cursor: pointer;
  svg {
    width: 50px;
  }
`;

const StatusSelect = styled.select`
width: 80px;
margin-right: 10px;
`

const ImportanceSelect = styled.select`
  width: 100px;
`;

export default TodoList;
