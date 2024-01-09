import React, { FormEvent, useContext, useState } from "react";
import { TodoContext, actionType } from "../../../context/TodoProvider";

const TodoForm = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [task, setTask] = useState("");
  console.log(state);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const todo = {
      id: Math.random().toString(36).substring(2, 7),
      title: task,
      isCompleted: false,
    };
    dispatch({ type: actionType.addTodo, payload: todo });
  };
  return (
    <div>
      <h1>Add Todo</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="border-2 border-pink-500"
          type="text"
          name="todo"
          id="todo"
          onBlur={(e) => setTask(e.target.value)}
        />
        <button className="px-4 py-3 bg-black text-white" type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
