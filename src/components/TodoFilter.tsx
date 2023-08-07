// src/TodoFilter.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../features/todoSlice";

const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();

  const handleSetFilter = (filter: "all" | "active" | "completed") => {
    dispatch(setFilter(filter));
  };

  return (
    <div className="">
      <button onClick={() => handleSetFilter("all")} className="mr-2">
        All
      </button>
      <button onClick={() => handleSetFilter("active")} className="mr-2">
        Active
      </button>
      <button onClick={() => handleSetFilter("completed")}>Completed</button>
    </div>
  );
};

export default TodoFilter;
