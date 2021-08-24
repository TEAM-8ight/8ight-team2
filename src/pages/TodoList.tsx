import React from 'react'
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

    return (
        <Container>
            {createState.map((item) => (
                <ListItem key={item.id}>
                    <input type="checkbox" name="isComplete" value={item.taskName} />
                    <span>{item.taskName}</span>
                    <span>{item.status}</span>
                    <span>{item.createdAt}</span>
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
    border:1px solid black;

`

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
