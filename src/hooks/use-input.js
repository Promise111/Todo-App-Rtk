import { useReducer } from "react";
const initialState = {
  value: "",
  inputTouched: false,
};
const inputReducer = (state, action) => {
  switch (action.type) {
    case "input":
      return { ...state, value: action.value };

    case "blur":
      return { ...state, inputTouched: true };

    case "reset":
      return { value: "", inputTouched: false };

    default:
      return state;
  }
};
const useInput = (validatorFunction) => {
  const [state, dispatch] = useReducer(inputReducer, initialState);
  const isInputValid = validatorFunction(state.value);
  const inputHasError = !isInputValid && state.inputTouched;
  const inputChangeChandler = (e) => {
    dispatch({ type: "input", value: e.target.value });
  };
  const onBlurHandler = () => {
    dispatch({ type: "blur" });
  };
  const reset = () => {
    dispatch({ type: "reset" });
  };

  return {
    value: state.value,
    inputHasError,
    isInputValid,
    inputChangeChandler,
    onBlurHandler,
    reset,
  };
};

export default useInput;
