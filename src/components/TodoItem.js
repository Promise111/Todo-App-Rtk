import { useDispatch } from "react-redux";
import { todoActions } from "../store/todo";
import styled from "styled-components";
const List = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  overflow: scroll;
  text-overflow: ellipsis;

  &:not(:last-of-type) {
    border-bottom: 1px solid #2c2b2b;
  }

  & .todo {
    display: flex;
    flex-direction: column;
  }

  & .todo.completed > p {
    text-decoration: line-through;
    color: gray;
  }

  & .todo .name {
    font-size: 25px;
    font-weight: 700;
    color: orange;
    margin: 0;
    padding: 0;
  }

  & .todo .description {
    font-size: 10px;
    color: white;
    margin: 0;
    padding: 0;
  }

  & .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  & .buttons button:not(:last-of-type) {
    margin-right: 5px;
  }

  @media screen and (max-width: 705px) {
    .buttons {
      flex-direction: column;
    }
    & .buttons button:not(:last-of-type) {
      margin-bottom: 5px;
    }
  }

  @media screen and (max-width: 540px) {
    flex-direction: column;
    .todo {
      text-align: center;
    }
    .buttons {
      margin-top: 1rem;
      flex-direction: row;
    }
  }
`;
const CompleteButton = styled.button`
  outline: 1px solid green;
  padding: 3px 10px;
  border: none;
  background-color: white;
  color: green;
  border-radius: 10px;
  &:hover {
    background-color: #d4cece;
  }
`;
const DeleteButton = styled.button`
  outline: 1px solid red;
  padding: 3px 10px;
  border: none;
  background-color: white;
  color: red;
  border-radius: 10px;
  &:hover {
    background-color: #d4cece;
  }
`;

/*const EditButton = styled.button`
  outline: 1px solid blue;
  padding: 3px 10px;
  border: none;
  background-color: white;
  color: blue;
  border-radius: 10px;
  &:hover {
    background-color: #d4cece;
  }
`;*/

const TodoItem = ({ data }) => {
  const dispatch = useDispatch();
  const todoClasses = `todo ${data.completed ? "completed" : ""}`;
  const completeHandler = () => {
    dispatch(todoActions.complete(data.id));
  };
  const deleteHandler = () => {
    dispatch(todoActions.delete(data.id));
  };
  return (
    <List>
      <div className={todoClasses}>
        <p className="name">{data.name}</p>
        <p className="description">{data.description}</p>
      </div>
      <div className="buttons">
        <CompleteButton className="button" onClick={completeHandler}>
          Complete
        </CompleteButton>
        {/* <EditButton className="button">Edit</EditButton> */}
        <DeleteButton className="button" onClick={deleteHandler}>
          Delete
        </DeleteButton>
      </div>
    </List>
  );
};
export default TodoItem;
