import React from 'react';

const TabButton = ({ section, label, selectedSection, onClick }) => {
  return (
    <button
      className={`text-lg transition duration-300 ease-in-out ${
        selectedSection === section
          ? 'p-2 w-36 bg-blue-950 text-white rounded-lg'
          : 'text-gray-500'
      }`}
      aria-pressed={selectedSection === section}
      onClick={() => onClick(section)}
    >
      {label}
    </button>
  );
};

export default TabButton;
