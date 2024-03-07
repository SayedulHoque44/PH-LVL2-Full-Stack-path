export const Logger = (state) => (next) => (action) => {
  console.log("PrevState", state.getState()); //prev
  console.log("action", action);
  next(action);
  console.log("currentState  2", state.getState());
  //   console.log(state);
  //   console.log(next);
  //   console.log(action);
};
