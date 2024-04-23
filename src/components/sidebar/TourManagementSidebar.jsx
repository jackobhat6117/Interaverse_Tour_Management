import React from "react";

const choices = [
  "Package category",
  "Main information",
  "Title",
  "Descriptions & highlights",
  "Locations",
  "Keywords",
  "Inclusions",
  "Guide Information",
  "Food",
  "Transportation",
  "Extra Information",
  "Photos",
  "Options",
  "Review",
];

function TourManagementSidebar({ selected }) {
  return (
    <div className={Classname.container}>
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

export default TourManagementSidebar;

const Classname = {
  container: "flex flex-col w-80 bg-blue-500/20 px-10 py-10 flex-shrink-0",
};
