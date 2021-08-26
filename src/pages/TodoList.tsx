import React from 'react';
import styled from 'styled-components';
import { todoType } from './TodoInput';
import { AiFillDelete } from "react-icons/ai"


interface TodoCreateProps {
    createState: todoType[];
    setCreateState: React.Dispatch<React.SetStateAction<todoType[]>>;
}



const TodoList = ({ createState, setCreateState }: TodoCreateProps) => {

    const handleDelete = (id: number) => {
        setCreateState(prevState => (
            prevState.filter((item: todoType) => (
                item.id !== id
            )
            )
        ))

    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, id: number) => {
        const { value } = e.target
        setCreateState((prevState) => prevState.map((todo: todoType) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    importance: value
                }
            }
            return todo
        }))
    }




    return (
        <Container>
            {createState.map((item) => (
                <ListItem key={item.id}>
                    <input type="checkbox" name="isComplete" value={item.taskName} />
                    <span>{item.taskName}</span>
                    <span>{item.status}</span>
                    <span>{item.createdAt}</span>
                    <select name="importance" onChange={(e) => handleChange(e, item.id)}>
                        <option value="">중요도</option>
                        <option value="상">상</option>
                        <option value="중">중</option>
                        <option value="하">하</option>
                    </select>
                    <DeleteButton onClick={() => handleDelete(item.id)}>
                        <AiFillDelete size={20} />
                    </DeleteButton>
                </ListItem>
            ))}
        </Container>
    )
}


const Container = styled.article`
  text-align: center;
  border: 1px solid black;
`;

const ListItem = styled.section`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom:1px solid black;
    padding: 20px;
    width: 100%;
    :last-child{
        border:0;
    }
    input{
        width: 20%;
        text-align: left;
    }
    span{
        width: 80%;
        text-align: left;
    }

`

const DeleteButton = styled.button`
    cursor: pointer;
    svg{
        width: 50px;    
    }
`

export default TodoList

