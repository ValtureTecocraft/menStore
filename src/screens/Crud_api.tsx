import { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  // getUserData,
  createUser,
  updateUser,
  deleteUser,
} from "../store/features/userApiSlice";
import { red } from "@mui/material/colors";

export const Crud_api = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [newUserName, setNewUserName] = useState("");

  // const userList = useSelector((state: RootState) => state.usersApi.value);
  const userList = useSelector((state: RootState) => state.usersApi.value);
  const dispatch = useDispatch();

  // const data = dispatch(getUserData.fulfilled);

  // console.log(userList);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const response = await axios
      .get(`http://localhost:4000/users`)
      .then((res) => setData(res.data));
  };

  console.log(data);

  return (
    <div className="w-full min-h-screen h-full pt-16 pb-8 gap-5 flex flex-col items-center bg-gray-50">
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
              createUser({
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
              className="w-[600px] py-2 flex flex-col justify-center items-center border rounded-lg hover:shadow-md hover:drop-shadow-md font-bold"
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
                  onChange={(e) => setNewUserName(e.target.value)}
                  id="standard-basic"
                  label="Update Username ..."
                  variant="standard"
                />
                <button
                  onClick={() =>
                    dispatch(
                      updateUser({ id: user.id, newUserName: newUserName })
                    )
                  }
                  className="btnOrange h-8"
                  type="button"
                >
                  Update
                </button>
                <button
                  onClick={() => dispatch(deleteUser({ id: user.id }))}
                  className="btnRed h-8"
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
