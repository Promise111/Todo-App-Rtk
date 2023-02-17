import { uiActions } from "./ui-slice";
import { todoActions } from "./todo";

const FIREBASE_URL =
  "https://react-https-2-default-rtdb.firebaseio.com/todos.json";

export const fetchTodoItems = () => {
  return async (dispatch) => {
    const fetchTodos = async () => {
      const response = await fetch(FIREBASE_URL);
      if (!response.ok) {
        throw new Error("Something went wrong with fetch items!");
      }
      const data = await response.json();
      return data;
    };

    try {
      const todoItems = await fetchTodos();
      dispatch(todoActions.replace(todoItems));
      dispatch(
        uiActions.showNotification({
          message: "Todo items successfully fetched!",
          title: "success!",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: "Fetching todo items failed!",
          title: "error!",
          status: "error",
        })
      );
    }
  };
};

export const sendTodoItems = (todos) => {
  return async (dispatch) => {
    const sendTodos = async () => {
      dispatch(
        uiActions.showNotification({
          message: "Loading...",
          title: "fetching todo items...",
          status: "loading",
        })
      );
      const response = await fetch(FIREBASE_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todos),
      });
      if (!response.ok) {
        throw new Error("Som ething went wrong!");
      }
    };

    try {
      await sendTodos();
      dispatch(
        uiActions.showNotification({
          message: "Sending todo items successful!",
          title: "success!",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: "Sending todo items failed!",
          title: "error!",
          status: "error",
        })
      );
    }
  };
};
