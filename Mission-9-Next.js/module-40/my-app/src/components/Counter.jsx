"use client";

import { useState } from "react";

const Counter = () => {
  const [count, setCout] = useState(0);
  return (
    <div>
      <button
        className="border-rose-600 border-2 p-5"
        onClick={() => setCout(count + 1)}
      >
        Inc
      </button>
      <button
        className="border-rose-600 border-2 p-5"
        onClick={() => setCout(count - 1)}
      >
        Dec
      </button>
      <h1 className="border-rose-600 b-2 p-5">{count}</h1>
    </div>
  );
};

export default Counter;
