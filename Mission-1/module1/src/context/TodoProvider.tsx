import React, { ReactNode, createContext, useReducer } from "react";

export const TodoContext = createContext<
  | {
      state: TTodo[];
      dispatch: React.Dispatch<TAction>;
    }
  | undefined
>(undefined);
// component props type
type TodoProviderPros = {
  children: ReactNode;
};
// todo type
export type TTodo = {
  id: string;
  title: string;
  isCompleted: boolean;
};
// todo type
type TAction = { type: string; payload: TTodo };
// initial state
const initialState: TTodo[] = [];
// action type value
export const actionType = {
  addTodo: "addTodo",
  taskCompleted: "taskCompleted",
};
// reducer Function
const reducer = (currentState: TTodo[], action: TAction) => {
  switch (action.type) {
    case actionType.addTodo:
      return [...currentState, action.payload];
    case actionType.taskCompleted:
      return currentState.map((todo) =>
        todo.id === action.payload.id ? { ...todo, isCompleted: true } : todo
      );
    default:
      return currentState;
  }
};

// Component
const TodoProvider = ({ children }: TodoProviderPros) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const values = {
    state,
    dispatch,
  };
  //
  return <TodoContext.Provider value={values}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
