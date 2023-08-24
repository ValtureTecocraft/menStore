import { useState } from "react";
import icon_check from "../assets/images/icon-check.svg";
import icon_cross from "../assets/images/icon-cross.svg";

const Tasks = ({
  item,
  isDarkMode,
  onClick,
  checked,
  onClickCheck,
}: {
  item: string;
  isDarkMode: any;
  onClick: any;
  checked: boolean;
  onClickCheck: any;
}) => {
  // const [checked, setchecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // useEffect(() => {
  //   const storedchecked = localStorage.getItem(`checked_${item}`);
  //   if (storedchecked) {
  //     setchecked(JSON.parse(storedchecked));
  //   }
  // }, []);

  // const handlechecked = () => {
  //   setchecked(!checked);
  //   handleTaskClick();
  // };

  return (
    <div
      className={`p-5 text-xl cursor-move border-b flex gap-3 justify-start items-center ${
        isDarkMode
          ? "text-gray-300 border-gray-700"
          : "text-gray-700 border-gray-300"
      } ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        onClick={onClickCheck}
        className={`w-8 h-[26px] md:h-8 cursor-pointer flex justify-center items-center rounded-full ${
          checked && "bg-gradient-to-br"
        } from-[#7bbbf9] to-[#8064c6] border-2 ${
          isDarkMode ? "border-[#353648]" : "border-gray-300"
        }`}
      >
        {checked && <img src={icon_check} alt="icon check" />}
      </div>
      <p
        className={`ml-2 pt-2 w-5/6 ${checked && "line-through text-gray-500"}`}
      >
        {item}
      </p>
      {isHovered && (
        <div
          className={`hidden lg:block z-10 cursor-pointer transition-opacity duration-500`}
          onClick={onClick}
        >
          <img src={icon_cross} alt="cross icon" />
        </div>
      )}
    </div>
  );
};

export default Tasks;
