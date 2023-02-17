import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  todos: [
    // {
    //   id: 1,
    //   name: "Task 1",
    //   description: "Do something in the next 10 minutes",
    //   completed: true,
    // },
  ],
  changed: false,
};
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    add(state, { payload }) {
      let newTodoItem = {
        id: (Math.random() * 1500).toFixed(1),
        name: payload.name,
        description: payload.description,
      };
      state.todos = [...state.todos, newTodoItem];
      state.changed = true;
    },
    complete(state, type) {
      const todos = [...state.todos];
      const todoItemIndex = todos.findIndex((item) => item.id === type.payload);
      const item = { ...todos[todoItemIndex] };
      item.completed = !item.completed;
      todos[todoItemIndex] = item;
      state.todos = [...todos];
      state.changed = true;
    },
    delete(state, type) {
      const newTodos = state.todos.filter((item) => item.id !== type.payload);
      state.todos = [...newTodos];
      state.changed = true;
    },
    replace(state, action) {
      state.todos = action.payload || [];
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;
