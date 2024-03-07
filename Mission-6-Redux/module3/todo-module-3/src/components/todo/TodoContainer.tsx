import { useGetTodosQuery } from "@/redux/api/api";
import { TTodo } from "@/redux/features/todoSlice";
import { useState } from "react";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";

const TodoContainer = () => {
  // const { todos } = useAppSelector((state) => state.todos);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [piority, setPiority] = useState("");
  const { data: todos, isLoading, isError } = useGetTodosQuery(piority);
  //{ pollingInterval: 1000 }

  if (isLoading) {
    return <p>Loading....</p>;
  }
  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal />
        <TodoFilter piority={piority} setPiority={setPiority} />
      </div>
      <div className="w-full h-full rounded-xl bg-primary-gradient p-[5px] ">
        {todos.data.length > 0 ? (
          <div className="bg-white p-5 w-full h-full rounded-lg space-y-4">
            {todos?.data?.map((todo: TTodo, index: number) => (
              <TodoCard key={index} todo={todo} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-3 flex justify-center items-center rounded-md text-2xl font-bold">
            <p>There is no task pending!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoContainer;
