/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Label } from "@radix-ui/react-dropdown-menu";
import { Label } from "@/components/ui/label";
import { useAddTodoMutation } from "@/redux/api/api";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import AddPiority from "./AddPiority";

const AddTodoModal = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [piority, setPiority] = useState("high");

  //
  // [addFunctionForMutation,{...response}]
  const [addTodo, { data, isLoading, isError, isSuccess }] =
    useAddTodoMutation(undefined);
  // const dispatch = useAppDispatch();

  //
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // const id = Math.random().toString(24).substring(2, 7);
    const taskDetails = {
      isCompleted: false,
      title: task,
      description,
      piority,
    };

    addTodo(taskDetails);
    // console.log(taskDetails);
  };

  //
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-gradient text-xl font-semibold ">
          Add todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Add your task that you want to finish
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="task" className="text-right">
              Task
            </Label>
            <Input
              onBlur={(e) => setTask(e.target.value)}
              id="task"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              description
            </Label>
            <Input
              onBlur={(e) => setDescription(e.target.value)}
              id="description"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <AddPiority setPiority={setPiority} piority={piority} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            <DialogClose>Save changes</DialogClose>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoModal;
