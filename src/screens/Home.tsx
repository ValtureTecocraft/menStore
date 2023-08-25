import React, { useState, useEffect } from "react";
import bg_img_light from "../assets/images/bg-desktop-light.jpg";
import bg_img_dark from "../assets/images/bg-desktop-dark.jpg";
import bg_img_light_mobile from "../assets/images/bg-mobile-light.jpg";
import bg_img_dark_mobile from "../assets/images/bg-mobile-dark.jpg";
import icon_sun from "../assets/images/icon-sun.svg";
import icon_moon from "../assets/images/icon-moon.svg";
import icon_check from "../assets/images/icon-check.svg";
import Tasks from "../components/Tasks";
import { signOut } from "firebase/auth";
import { db, auth } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

interface IList {
  id: string;
  task: string;
  active: boolean;
}

const Home: React.FC = () => {
  // console.log(auth?.currentUser?.email);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [input, setInput] = useState("");
  const [list, setList] = useState<IList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);

  const navigate = useNavigate();

  // const todoListRef = collection(db, "todos");
  const currentUser = auth?.currentUser;

  // console.log(currentUser);

  const user = localStorage.getItem("user");

  const getTodoList = async () => {
    setLoading(true);
    try {
      if (currentUser) {
        const userId = currentUser.uid;
        const userTodoListRef = collection(db, "users", userId, "todos");

        const data = await getDocs(userTodoListRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          task: doc.data().task,
          active: doc.data().active,
        }));
        setList(filteredData);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDarkMode);
    document.documentElement.classList.toggle("dark", prefersDarkMode);

    getTodoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/signin");
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    setLoading(true);
    try {
      // Get the currently authenticated user
      // const currentUser = auth.currentUser;

      if (currentUser) {
        const userId = currentUser.uid;
        const userTodoListRef = collection(db, "users", userId, "todos");

        await addDoc(userTodoListRef, { task: input, active: isActive });
        getTodoList();
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: string) => {
    setLoading(true);
    try {
      if (currentUser) {
        const userId = currentUser.uid;
        const userTodoListRef = collection(db, "users", userId, "todos");
        const listDoc = doc(userTodoListRef, id);
        await deleteDoc(listDoc);
        getTodoList();
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updatedActive = async (id: string, active: boolean) => {
    console.log("id", id);
    setLoading(true);
    try {
      if (currentUser) {
        const userId = currentUser.uid;
        const userTodoListRef = collection(db, "users", userId, "todos");
        const listDoc = doc(userTodoListRef, id);
        await updateDoc(listDoc, { active: active });
        getTodoList();
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input) {
      addTodo();
      setInput("");
      setIsActive(true);
    }
  };

  // const handleDragStart = (e, index) => {
  //   e.dataTransfer.setData("text/plain", index);
  // };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  // };

  // const handleDrop = (e, index) => {
  //   const droppedIndex = e.dataTransfer.getData("text/plain");
  //   const updatedList = [...list];
  //   const removedItem = updatedList.splice(droppedIndex, 1)[0];
  //   updatedList.splice(index, 0, removedItem);
  //   setList(updatedList);
  //   localStorage.setItem("taskList", JSON.stringify(updatedList));
  // };

  return (
    <section
      className={`relative w-screen h-screen flex flex-col md:justify-center items-center overflow-hidden ${
        isDarkMode ? "bg-[#1e1e28]" : "bg-[#fafafa]"
      } font-Josefin`}
    >
      <div className="w-full h-fit flex justify-center items-center">
        <img
          src={isDarkMode ? bg_img_dark : bg_img_light}
          alt="bg img"
          className="hidden md:block absolute top-0 left-0 max-w-full min-w-[1500px] w-full h-fit"
        />
        <img
          src={isDarkMode ? bg_img_dark_mobile : bg_img_light_mobile}
          alt="bg img"
          className="block md:hidden absolute top-0 left-0 max-w-full w-full h-fit"
        />
      </div>

      {user !== "" ? (
        <button onClick={logOut} className="btnRed fixed top-5 right-5 ">
          Logout
        </button>
      ) : (
        <button onClick={logOut} className="btnBlack fixed top-5 right-5 ">
          Login
        </button>
      )}

      {loading && <Loading />}
      <div className="absolute top-[70px] max-h-[calc(100%-250px)] px-6 pt-10 md:px-0 md:pt-0 md:max-w-[650px] w-full h-full gap-6 flex flex-col items-center">
        <div className="w-full flex justify-between items-center">
          <h1
            className={`text-${
              isDarkMode ? "gray-300" : "white"
            } text-3xl md:text-6xl font-semibold tracking-[16px] md:tracking-[24px]`}
          >
            TODO
          </h1>
          {
            <img
              className="cursor-pointer"
              onClick={toggleTheme}
              src={isDarkMode ? icon_sun : icon_moon}
              alt="theme icon"
            />
          }
        </div>

        <form
          onSubmit={handleSubmit}
          className={`w-full h-16 p-5 shadow-lg mt-2 flex gap-5 justify-center items-center ${
            isDarkMode ? "bg-[#2a2b3d]" : "bg-white"
          } rounded-md`}
        >
          <div
            onClick={() => setIsActive(!isActive)}
            className={`w-7 md:w-[34px] h-6 md:h-8 cursor-pointer flex justify-center items-center rounded-full ${
              !isActive && "bg-gradient-to-br"
            } from-[#7bbbf9] to-[#8064c6] border-2 ${
              isDarkMode ? "border-[#353648]" : "border-gray-300"
            }`}
          >
            {!isActive && <img src={icon_check} alt="icon check" />}
          </div>
          <input
            className={`w-full h-full ${
              isDarkMode ? "text-gray-300" : "text-gray-500"
            } text-xl bg-transparent outline-none`}
            type="text"
            name="new_task"
            id="new_task"
            placeholder="Create new todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>

        <div
          className={`w-full h-3/4 rounded-md shadow-2xl flex flex-col justify-between ${
            isDarkMode ? "bg-[#2a2b3d]" : "bg-white"
          }`}
        >
          <div
            className="overflow-y-scroll scrollbar-hide scroll-smooth"
            // onDragOver={handleDragOver}
          >
            {list.map((item: IList) => (
              <div
                key={item.id}
                draggable
                // onDragStart={(e) => handleDragStart(e, index)}
                // onDrop={(e) => handleDrop(e, index)}
              >
                <Tasks
                  item={item.task}
                  isDarkMode={isDarkMode}
                  onClick={() => deleteTodo(item.id)}
                  checked={!item.active}
                  onClickCheck={() => {
                    updatedActive(item.id, !item.active);
                  }}
                />
              </div>
            ))}
          </div>
          <div
            className={`w-full p-5 flex justify-between font-medium border-t ${
              isDarkMode
                ? "text-gray-500 border-gray-700"
                : "text-gray-400 border-gray-300"
            }`}
          >
            <p>{list.length} items left</p>
            <nav className="hidden md:flex gap-4 ml-10">
              <div
                className={`cursor-pointer ${
                  isDarkMode ? "hover:text-gray-300" : "hover:text-gray-700"
                }`}
              >
                All
              </div>
              <div
                className={`cursor-pointer ${
                  isDarkMode ? "hover:text-gray-300" : "hover:text-gray-700"
                }`}
              >
                Active
              </div>
              <div
                className={`cursor-pointer ${
                  isDarkMode ? "hover:text-gray-300" : "hover:text-gray-700"
                }`}
              >
                Completed
              </div>
            </nav>
            <div
              className={`cursor-pointer ${
                isDarkMode ? "hover:text-gray-300" : "hover:text-gray-700"
              }`}
            >
              Clear completed
            </div>
          </div>
        </div>
        <nav
          className={`md:hidden flex justify-center items-center gap-4 w-full py-3 rounded-md shadow-2xl text-gray-500 ${
            isDarkMode ? "bg-[#2a2b3d]" : "bg-white"
          }`}
        >
          <div
            className={`cursor-pointer ${
              isDarkMode ? "hover:text-gray-300" : "hover:text-gray-700"
            }`}
          >
            All
          </div>
          <div
            className={`cursor-pointer ${
              isDarkMode ? "hover:text-gray-300" : "hover:text-gray-700"
            }`}
          >
            Active
          </div>
          <div
            className={`cursor-pointer ${
              isDarkMode ? "hover:text-gray-300" : "hover:text-gray-700"
            }`}
          >
            Completed
          </div>
        </nav>
      </div>
      <footer
        className={`h-full flex justify-center items-end mb-10 md:mb-14 ${
          isDarkMode ? "text-gray-500" : "text-gray-400"
        }`}
      >
        Drag & Drop to reorder the list
      </footer>
    </section>
  );
};

export default Home;
