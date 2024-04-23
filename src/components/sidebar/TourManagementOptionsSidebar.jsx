import React from "react";
import { useNavigate } from "react-router-dom";

const choices = [
  "New Option",
  "Option setup",
  "Meeting point or pickup",
  "Connectivity settings",
  "Availabilty and pricing",
  "Review",
];

function TourManagementOptionsSidebar({ selected }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className={Classname.container}>
      <button className={Classname.button} onClick={handleBack}>
        <img src="/IconArrowLeft.svg" alt="" className={Classname.buttonIcon} />
        <span>Back to product</span>
      </button>
      {choices.map((choice, index) => (
        <div key={index} className="flex gap-3 items-center font-bold">
          <div
            className={`flex w-1 h-12 ${selected === index && "bg-primary1"} `}
          ></div>
          <span className={`${selected < index && "text-gray-500"}`}>
            {choice}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TourManagementOptionsSidebar;

const Classname = {
  container: "flex flex-col w-80 bg-blue-500/20 px-10 py-10 flex-shrink-0",
  button:
    "w-full border border-primary1 rounded-md flex items-center gap-2 justify-center font-bold text-primary1 py-2 mb-2 cursor-pointer",
  buttonIcon: "w-6",
};
