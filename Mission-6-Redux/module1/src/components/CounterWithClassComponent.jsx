import React from "react";

class CounterWithClassComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  render() {
    console.log(this);
    const { count } = this.state;
    //
    return (
      <div className="border-2 border-green-500 p-10 m-10">
        <button onClick={() => this.setState({ count: count + 1 })}>
          {count}
        </button>
      </div>
    );
  }
}

export default CounterWithClassComponent;
