import { useDispatch } from "react-redux";
import styled from "styled-components";
import useInput from "../hooks/use-input";
import { todoActions } from "../store/todo";
const Form = styled.form`
  max-width: 80%;
  height: auto;
  background-color: #524f4fa6;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & .input-control {
    display: flex;
    flex-direction: row;
  }

  & input.error-input {
    outline: 1px solid red !important;
    // border: 1px solid red !important;
  }

  & .input-control .input > label {
    color: white;
    display: block;
    font-size: 12px;
    font-weight: 600;
  }

  & .input-control .input > input {
    width: 100%;
    border-radius: 5px;
    border: none;
    padding: 5px 10px;
    outline: 1px solid orange;
  }

  @media screen and (max-width: 550px) {
    flex-direction: column;
    overflow: scroll;
    max-width: 400px;
    .input-control {
      flex-direction: column;
    }
    .input {
      margin-right: 0rem;
      margin-bottom: 1rem;
    }
    .input label {
      margin-bottom: 0.5rem;
    }
  }

  @media screen and (min-width: 551px) {
    .input:not(:last-of-type) {
      margin-right: 1rem;
    }
  }

  @media screen and (max-width: 805px) {
    flex-direction: column;
    .input label {
      margin-bottom: 0.5rem;
    }
  }

  @media screen and (min-width: 806px) {
    .input label {
      margin-bottom: 0.5rem;
    }
  }
`;

const Button = styled.button`
  border: none;
  background-color: orange;
  padding: 5px 10px;
  border-radius: 10px;
  color: white;

  &:hover {
    background-color: #ffa604de;
  }

  &:disabled,
  &:focus:disabled,
  &:hover:disabled,
  &:active:disabled {
    background-color: white;
    color: black;
    border: none;
  }

  @media screen and (max-width: 550px) {
    margin-top: 1rem;
  }

  @media screen and (max-width: 805px) {
    margin-top: 1rem;
  }
`;

const validator = (value) => value.trim().length >= 3;

const TodoForm = (props) => {
  const dispatch = useDispatch();
  const {
    value: nameInputValue,
    inputHasError: nameHasError,
    isInputValid: isNameInputValid,
    reset: resetNameInput,
    onBlurHandler: nameInputBlurhandler,
    inputChangeChandler: nameInputChangehandler,
  } = useInput(validator);
  const {
    value: descInputValue,
    inputHasError: descHasError,
    isInputValid: isDescInputValid,
    reset: resetDescInput,
    onBlurHandler: descInputBlurhandler,
    inputChangeChandler: descInputChangehandler,
  } = useInput(validator);
  let formIsValid = isNameInputValid && isDescInputValid;

  const nameInputClass = nameHasError ? "error-input" : "";
  const descInputClass = descHasError ? "error-input" : "";

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!isNameInputValid || !isDescInputValid) {
      return;
    }
    dispatch(
      todoActions.add({ name: nameInputValue, description: descInputValue })
    );
    resetNameInput();
    resetDescInput();
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <div className="input-control">
        <div className="input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={nameInputChangehandler}
            onBlur={nameInputBlurhandler}
            value={nameInputValue}
            className={nameInputClass}
          />
        </div>
        <div className="input">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            onChange={descInputChangehandler}
            onBlur={descInputBlurhandler}
            value={descInputValue}
            className={descInputClass}
          />
        </div>
      </div>
      <Button type="submit" disabled={!formIsValid}>
        Add Todo
      </Button>
    </Form>
  );
};

export default TodoForm;
