import React, { useState } from 'react';

const ToggleSwitch = ({toggleValue}) => {
  const [isOn, setIsOn] = useState(toggleValue);

  return (
    <div
      className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${isOn ? 'bg-green-500' : 'bg-gray-300'}`}
      onClick={() => setIsOn(!isOn)}
    >
      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${isOn ? 'translate-x-5' : ''}`}></div>
    </div>
  );
};

export default ToggleSwitch;
