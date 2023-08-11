import React, { useReducer, createContext, Dispatch } from "react";
import ComponentA from "./ComponentA";
import ComponentB from "./ComponentB";
import ComponentC from "./ComponentC";

export interface CounterContextType {
  counterCount: number;
  counterDispatch: Dispatch<Action>;
}

export const CounterContext = createContext<CounterContextType | undefined>(
  undefined
);

interface Action {
  type: "increment" | "decrement" | "reset";
}

const initialState: number = 0;
const reducer = (state: number, action: Action): number => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return 0;
    default:
      return state;
  }
};

const Counter: React.FC = () => {
  const [count, dispatch] = useReducer(reducer, initialState);

  return (
    <CounterContext.Provider
      value={{ counterCount: count, counterDispatch: dispatch }}
    >
      <div>
        <p>Count - {count}</p>
        <ComponentA />
        <ComponentB />
        <ComponentC />
      </div>
    </CounterContext.Provider>
  );
};

export default Counter;
