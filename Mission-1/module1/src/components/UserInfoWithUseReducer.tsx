import React, { ChangeEvent, useReducer } from "react";

type TAction = {
  type: string;
  payload: string;
};

const initialState = {
  name: "",
  age: "",
  hobbies: [] as string[],
};
// currentState,action both are get abilable in reducer via default using react useReducer, currentState is our current state and action come from dispatch that's it
const reducer = (currentState: typeof initialState, action: TAction) => {
  // its like a dicition making so we can use switch

  switch (
    action.type // acion.type mean using type we can detect our request action type
  ) {
    case "addName":
      return { ...currentState, name: action.payload };
    case "addAge":
      return { ...currentState, age: action.payload };
    case "addHobbies":
      return {
        ...currentState,
        hobbies: [...currentState.hobbies, action.payload],
      };
    default:
      return currentState; // if we did any fault then it will retrun current state
  }
};

const UserInfoWithUseReducer = () => {
  // using dispatch function sending a value is as action,
  //  currentState will be first state which state not change after call dispatch in input field sended a action and we manipulate in reducer and which we returend it will be next changed state that's it
  const [state, dispatch] = useReducer(reducer, initialState);
  {
    /*Benifte
    1. its reduce so many use of state ,
    2. increse code readabilty
    3. we can use all state in one single object
    4. manipulate all state that we have to use and change in single function call reducer
    5. calling dispatch any time we can use multiple state value
    6. calling single state we can get all state that we are using
  *

  */
  }
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  console.log(state);
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <input
        onChange={(e) => dispatch({ type: "addName", payload: e.target.value })}
        value={state?.name}
        className="p-3 border-[1px] border-pink-400 "
        type="text"
        name="name"
        placeholder="name"
      />
      <input
        onChange={(e) => dispatch({ type: "addAge", payload: e.target.value })}
        className="p-3 border-[1px] border-pink-400 "
        type="number"
        name="name"
        placeholder="age"
      />
      <input
        onBlur={(e) =>
          dispatch({ type: "addHobbies", payload: e.target.value })
        }
        className="p-3 border-[1px] border-pink-400 "
        type="text"
        name="name"
        placeholder="hobbies"
      />
      <button className="px-5 py-4 bg-black text-white" type="submit">
        submit
      </button>
    </form>
  );
};

export default UserInfoWithUseReducer;
