import React, { useState } from "react";
import { useAppDispatch } from "../store/store";
import { addPerson } from "../store/features/personSlice";

const Form: React.FC = () => {
  const [name, setName] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addPerson({ name: name }));
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        className="w-[500px] py-1 px-2 border-2 rounded-md"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter the name of the person ..."
      />
      <button
        className="px-4 py-1 bg-green-500 hover:bg-green-600 select-none text-white rounded-md focus:ring-1 ring-offset-2 ring-green-600"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default Form;
