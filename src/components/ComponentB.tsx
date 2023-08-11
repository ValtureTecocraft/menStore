import React, { useContext } from "react";
import { CounterContext } from "./Counter";

const ComponentB = () => {
  const counterContext = useContext(CounterContext);

  return (
    <div>
      <button
        onClick={() => counterContext?.counterDispatch({ type: "increment" })}
      >
        Increment
      </button>
      <button
        onClick={() => counterContext?.counterDispatch({ type: "decrement" })}
      >
        Decrement
      </button>
      <button
        onClick={() => counterContext?.counterDispatch({ type: "reset" })}
      >
        Reset
      </button>
    </div>
  );
};

export default ComponentB;
