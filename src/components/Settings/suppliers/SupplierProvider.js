import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';

const SupplierProvider = ({ provider }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-md shadow cursor-pointer relative">
      <div className="flex items-center space-x-3" onClick={() => setMenuOpen(!isMenuOpen)}>
        <span className="bg-blue-500 text-white rounded-full px-3 py-1 font-bold">{provider.initials}</span>
        <span className="text-gray-800 font-medium">{provider.name}</span>
      </div>
      <ToggleSwitch />
      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-2 bg-gray-100 p-2 rounded shadow-md space-y-2 text-sm">
          <p>Payment Time Limit</p>
          <p>Deal Code</p>
        </div>
      )}
    </div>
  );
};

export default SupplierProvider;
