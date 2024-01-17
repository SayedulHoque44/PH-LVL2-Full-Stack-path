import "./App.css";
import {
  decrement,
  increment,
  incrementByValue,
} from "./redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

function App() {
  const dispatch = useAppDispatch();
  const { count } = useAppSelector((state) => state.counter);
  return (
    <div className="flex gap-2 justify-center h-screen items-center ">
      <div className=" p-10 border-2 border-purple-500">
        <div className="flex gap-3">
          <button
            onClick={() => dispatch(increment())}
            className="px-3 py-2 rounded-md bg-green-500 text-xl text-white">
            Increament
          </button>
          <button
            onClick={() => dispatch(incrementByValue(5))}
            className="px-3 py-2 rounded-md bg-yellow-500 text-xl text-white">
            Increament by 5
          </button>
          <h1 className="text-3xl">{count}</h1>
          <button
            onClick={() => dispatch(decrement())}
            className="px-3 py-2 rounded-md bg-red-500 text-xl text-white">
            Decreament
          </button>
        </div>
        {/*  */}
        <div></div>
      </div>
    </div>
  );
}

export default App;
