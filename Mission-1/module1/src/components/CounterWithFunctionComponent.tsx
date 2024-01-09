import React from "react";
import AnotherChildComponent from "./AnotherChildComponent";

type TProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

// here count not used but for anotherChildComponent purpose we have pass it which is props drilling ,here in CounterWithFunctionComponent  count is now as unnecessary value which is not recommanded
const CounterWithFunctionComponent = ({ count, setCount }: TProps) => {
  //   const [count, setCount] = useState(0);
  //   let count = 0;
  // not work cz react not able to know somthing is changed
  //   return <button onClick={() => (count = count + 1)}>{count}</button>;
  return (
    <div className="border-2 border-green-600 m-10 p-10">
      <button
        className="border-[1px] border-pink-600 py-3 px-4 bg-black text-white"
        onClick={() => setCount((prev) => prev + 1)}>
        update count
      </button>
      <AnotherChildComponent count={count} />
    </div>
  );
};

export default CounterWithFunctionComponent;
