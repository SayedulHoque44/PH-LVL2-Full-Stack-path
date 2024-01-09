/* eslint-disable no-unreachable */
import { useState } from "react";
import "./App.css";
import TodoForm from "./components/Todo/TodoForm/TodoForm";
import TodoShow from "./components/Todo/TodoShow/TodoShow";
import UserInfoWithUseReducer from "./components/userInfoWithUseReducer";
import TodoProvider from "./context/TodoProvider";

function App() {
  // module-6 -> start
  return (
    <TodoProvider>
      <div className="m-10 p-10 flex justify-center items-center flex-col">
        <TodoForm />
        <TodoShow />
      </div>
    </TodoProvider>
  );

  // module-5 -> start
  return (
    <div className="m-10 p-10">
      <UserInfoWithUseReducer />
    </div>
  );

  // module-3 -> start
  // lifting state to send child to pass data to child to parent
  // eslint-disable-next-line no-unreachable
  const [count, setCount] = useState(0);
  return (
    <div className="border-2 border-red-600 m-10 p-10">
      <button className="border-[1px] border-pink-600 py-3 px-4 bg-black text-white">
        {count}
      </button>
      {/* <CounterWithClassComponent /> */}
      <CounterWithFunctionComponent count={count} setCount={setCount} />
    </div>
  );
}

export default App;
