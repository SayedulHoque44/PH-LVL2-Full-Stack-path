import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//
export type TTodo = {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  piority: string;
};

type TInitialState = {
  todos: TTodo[];
};
//
const initialState: TInitialState = {
  todos: [],
};

//
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos.push({ ...action.payload, isCompleted: false });
    },
    removeTodo: (state, action) => {
      const deletedTodoArray = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      state.todos = deletedTodoArray;
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.todos.find((todo) => todo.id === action.payload);
      // task!.isCompleted = !task?.isCompleted;// it directly can change but in this current time its not still changed that's why we have to manipulate it toggle way
      const otherTask = state.todos.filter(
        (todo) => todo.id !== action.payload
      );

      if (task) {
        // toggle way
        if (task.isCompleted) {
          //
          state.todos = [{ ...task, isCompleted: false }, ...otherTask];
        } else {
          state.todos = [...otherTask, { ...task, isCompleted: true }];
        }
      }
    },
  },
});

//
export const { addTodo, removeTodo, toggleComplete } = todoSlice.actions;
//
export default todoSlice.reducer;
