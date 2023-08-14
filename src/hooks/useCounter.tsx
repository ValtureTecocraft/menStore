import { useState } from "react";

export const useCounter = (initialValue: number = 0, value: number = 1) => {
  const [count, setCount] = useState<number>(initialValue);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + value);
  };

  const handleDecrement = () => {
    setCount((prevCount) => prevCount - value);
  };

  const handleReset = () => {
    setCount(initialValue);
  };
  return [count, handleIncrement, handleDecrement, handleReset] as const;
};
