import React from "react";

const RoomCardButton = ({ text, text2, value, isSelected, onClick }) => {
  const handleClick = () => {
    onClick(value);
  };

  return (
    <button
      className={`flex items-center mt-2 ${
        isSelected ? "bg-green-200 text-green-800" : "bg-white"
      } text-black px-4 rounded justify-between border w-full h-12`}
      onClick={handleClick}
    >
      <div className="flex items-center text-sm">
        <div
          className={`h-3 w-3 ${
            isSelected ? "bg-green-800" : "bg-gray-400"
          } mr-2 rounded`}
        ></div>
        <div className="left-0">
          <div className="flex left-0">{text}</div>
          {text2 && <div className="flex left-0 text-gray-400">{text2}</div>}
        </div>
      </div>
      <div className="text-sm">{value}</div>
    </button>
  );
};

export default RoomCardButton;
