import React from "react";

function InfoCardLightening({ description, className }) {
  return (
    <div
      className={`bg-blue-100 px-3 py-4 rounded-lg flex w-full items-center ${className}`}
    >
      <img
        src="/IconLightening.svg"
        alt="Logo"
        className="h-6 w-10 mb-2 mr-3"
      />
      <span className="text-black text-sm">{description}</span>
    </div>
  );
}

export default InfoCardLightening;
