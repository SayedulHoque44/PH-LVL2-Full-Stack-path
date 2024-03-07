import React, { useContext } from "react";
import { TTodo, TodoContext, actionType } from "../../../context/TodoProvider";

const TodoShow = () => {
  const { state, dispatch } = useContext(TodoContext);
  return (
    <div>
      {state.map((todo: TTodo, index: number) => (
        <p
          onClick={() =>
            dispatch({ type: actionType.taskCompleted, payload: todo })
          }
          className={`${todo.isCompleted && "line-through"} m-3`}
          key={todo.id}>
          {index + 1}.{todo.title}
        </p>
      ))}
    </div>
  );
};

export default TodoShow;
