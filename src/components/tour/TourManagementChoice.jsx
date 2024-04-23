import React from "react";

function TourManagementChoice({ options, selected, onSelect, className }) {
  return (
    <div className={`${Classname.choiceContainer} ${className}`}>
      {options.map((option, index) => (
        <div
          key={index}
          className={`${Classname.choice} ${
            index < options.length - 1 && Classname.choiceBorder
          }`}
          onClick={() => onSelect(option.value)}
        >
          <div className={Classname.choiceRadioContainer}>
            <div className={Classname.choiceRadio}>
              {selected === option.value && (
                <div className={Classname.choiceRadioSelected}></div>
              )}
            </div>
          </div>
          <div className={Classname.choiceTextContent}>
            <span className="font-bold">{option.title}</span>
            <p>{option.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TourManagementChoice;

const Classname = {
  choiceContainer:
    "w-full flex flex-col border border-gray-300 rounded-lg mt-10",
  choice: "py-6 px-6 gap-6 flex cursor-pointer",
  choiceRadioContainer: "",
  choiceRadio:
    "w-12 h-12 rounded-full flex items-center justify-center border border-gray-300",
  choiceRadioSelected: "bg-primary1 w-6 h-6 rounded-full",
  choiceBorder: "border-b border-gray-300",
  choiceTextContent: "flex flex-col justify-center",
};
