import React from "react";
import { useCounter } from "../hooks/useCounter";

const CounterButton: React.FC = () => {
  const [count, handleIncrement, handleDecrement, handleReset] = useCounter(
    10,
    20
  );

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};
export default CounterButton;
