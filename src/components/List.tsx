import React from "react";
import { useAppSelector } from "../store/store";

const List: React.FC = () => {
  const person = useAppSelector((state) => state.person.persons);

  return (
    <div className="w-[550px] h-fit flex flex-col">
      <h1 className="text-lg font-bold">List</h1>
      <div>
        <div className="w-1/2 text-lg font-medium border-b-2 grid grid-cols-5">
          <p>ID</p>
          <p className="col-span-4">Name</p>
        </div>

        {person.map((items) => (
          <div key={items.id} className="w-1/2 grid grid-cols-5">
            <p>{items.id}</p>
            <p className="col-span-4">{items.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
