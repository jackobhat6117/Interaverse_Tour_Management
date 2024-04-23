import React from "react";

const options = [
  "Schedule",
  "Pricing categories",
  "Capacity",
  "Price",
  "Add-ons (optional)",
];

function TourManagementAvailabilityHeader({ active, className }) {
  return (
    <div className={`${Classname.container} ${className}`}>
      {options.map((option, index) => (
        <div className={Classname.option}>
          <div
            className={`${Classname.optionNumberContainer} ${
              active >= index && Classname.optionNumberActive
            }`}
          >
            {index + 1}
          </div>
          <span>{option}</span>
        </div>
      ))}
    </div>
  );
}

export default TourManagementAvailabilityHeader;

const Classname = {
  container: "w-full flex items-center justify-between gap-4 mt-4 mb-2",
  option: "flex items-center gap-2 text-sm",
  optionNumberContainer:
    "w-7 h-7 rounded-full flex items-center justify-center bg-gray-200 text-sm",
  optionNumberActive: "bg-primary1 text-white ",
};
