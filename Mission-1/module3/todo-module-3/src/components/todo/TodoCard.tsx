import { useDeleteTodoMutation, useUpdateTodoMutation } from "@/redux/api/api";
import { TTodo } from "@/redux/features/todoSlice";
import { Button } from "../ui/button";

type TTodoCardProps = {
  todo: TTodo;
};
const TodoCard = ({ todo }: TTodoCardProps) => {
  const { _id, isCompleted, description, title, piority } = todo;
  const [updateTodo, { data, isLoading }] = useUpdateTodoMutation();
  const [deleteTodo, {}] = useDeleteTodoMutation();
  // const dispatch = useAppDispatch();

  const handleComplete = () => {
    const taskData = {
      isCompleted: !isCompleted,
      description,
      title,
      piority,
    };
    updateTodo({ data: taskData, id: _id });
  };

  return (
    <div className="bg-white rounded-md flex justify-between items-center p-3 border">
      <input
        className="mr-2"
        type="checkbox"
        name="complete"
        defaultChecked={isCompleted}
        id="complete"
        onChange={handleComplete}
      />
      <p className="font-semibold flex-1">{todo?.title}</p>
      <div className="font-semibold flex gap-2 items-center flex-1">
        <span
          className={`p-1 rounded-full ${
            todo.piority === "high"
              ? "bg-red-500"
              : todo.piority === "medium"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}></span>
        <span>{todo.piority}</span>
      </div>
      <div className="flex-1">
        {todo.isCompleted ? (
          <p className="text-green-500">Done</p>
        ) : (
          <p className="text-red-500">Pending</p>
        )}
      </div>

      <p className="flex-[2]">{todo?.description}</p>
      <div className="space-x-5">
        <Button className="bg-red-500 " onClick={() => deleteTodo(_id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </Button>
        <Button className="bg-[#5C53FE] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default TodoCard;
