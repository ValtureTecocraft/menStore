import React from "react";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Home: React.FC = () => {
  const userList = useSelector((state: RootState) => state.users.value);

  return (
    <div className="w-full min-h-screen h-full pt-16 gap-5 flex flex-col items-center bg-gray-50">
      <div className="w-[600px] h-12 space-x-5">
        <TextField id="outlined-basic" label="Name ..." variant="outlined" />
        <TextField
          id="outlined-basic"
          label="User Name ..."
          variant="outlined"
        />
        <button className="btnGreen h-full" type="submit">
          add
        </button>
      </div>
      <div>
        {userList.map((user) => {
          return <h1 key={user.id}>{user.name}</h1>;
        })}
      </div>
    </div>
  );
};

export default Home;
