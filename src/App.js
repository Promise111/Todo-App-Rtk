import classes from "./App.module.css";
import Notification from "./components/Notification";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { sendTodoItems, fetchTodoItems } from "./store/actions";
import { useDispatch } from "react-redux";
let initial = true;

function App() {
  const notification = useSelector((state) => state.ui.notification);
  const todo = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodoItems());
  }, [dispatch]);

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }

    if (todo.changed) {
      dispatch(sendTodoItems(todo.todos));
    }

    return () => console.log("useEffect clean up function...");
  }, [todo, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          title={notification?.title}
          status={notification?.status}
          message={notification?.message}
        />
      )}
      <div className={classes.App}>
        <h1>My Todos Redux</h1>
        <TodoForm />
        <TodoList />
      </div>
    </>
  );
}

export default App;
