import React from 'react';
import Icon from '../../HOC/Icon';


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white w-[90%] sm:w-[600px] rounded-lg shadow-lg">
        {/* Blue Header Section */}
        <div className="bg-blue-500 text-white p-3 flex justify-between items-center rounded-t-lg">
          <h2 className="text-lg text-white font-sans">Deal Codes</h2>
          <button onClick={onClose} className="text-white">
            <Icon icon = {'majesticons:close'}/>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
