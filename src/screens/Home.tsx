import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  addUser,
  deleteUser,
  updateUserName,
} from "../store/features/userSlice";

const Home: React.FC = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [newUserName, setNewUserName] = useState("");

  const userList = useSelector((state: RootState) => state.users.value);
  const dispatch = useDispatch();

  return (
    <div className="w-full min-h-screen h-full pt-16 gap-5 flex flex-col items-center bg-gray-50">
      <div className="w-[600px] h-12 space-x-5 flex justify-center">
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="outlined-basic"
          label="Name ..."
          variant="outlined"
        />
        <TextField
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          id="outlined-basic"
          label="User Name ..."
          variant="outlined"
        />
        <button
          onClick={() => {
            dispatch(
              addUser({
                id: userList.length + 1,
                name: name,
                userName: userName,
              })
            );
            setName("");
            setUserName("");
          }}
          className="btnGreen h-full"
          type="button"
        >
          add
        </button>
      </div>
      <div className="space-y-5">
        {userList.map((user) => {
          return (
            <div
              key={user.id}
              className="w-[600px] py-2 flex flex-col justify-center items-center border rounded-lg shadow-md drop-shadow-md font-bold"
            >
              <h1>
                <span className="font-medium">Name: </span>
                {user.name}
              </h1>
              <h1>
                <span className="font-medium">Username: </span>
                {user.userName}
              </h1>
              <div className="flex justify-center items-end gap-3">
                <TextField
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  id="standard-basic"
                  label="Update Username ..."
                  variant="standard"
                />
                <button
                  onClick={() =>
                    dispatch(
                      updateUserName({ id: user.id, newUserName: newUserName })
                    )
                  }
                  className="btnGreen h-8"
                  type="button"
                >
                  Update
                </button>
                <button
                  onClick={() => dispatch(deleteUser({ id: user.id }))}
                  className="btnGreen h-8"
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
