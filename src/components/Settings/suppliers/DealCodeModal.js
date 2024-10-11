import React from 'react';
import Modal from './Modal';
import Loading from '../../animation/loading';
import ToggleSwitch from './ToggleSwitch';
import Icon from '../../HOC/Icon';

const DealCodeModal = ({ isOpen, onClose, code, setCode, onAddDealCode, dealCodes, onDeleteCode, loading }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Deal Codes">
    <div>
      <div className="flex items-center flex-wrap ">
        <div className="w-full sm:w-[85%]">
          <p>Add a Code</p>
          <input
            type="text"
            className="border-2 rounded p-1 px-2 w-full !border-gray-300"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <button
          className="bg-[#0067FF] text-white sm:w-[13%] w-full sm:ml-2 !mt-5 sm:mt-0 px-4 py-1 rounded flex items-center justify-center"
          onClick={onAddDealCode}
        >
          Add
        </button>
      </div>

      <div className="mt-4">
        <p className="text-gray-500 mb-2">Current Codes</p>
        {loading && (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        )}
        {dealCodes.length != 0 ? (dealCodes.map((item, index) => (
          <div key={index} className="flex items-center justify-between mb-2 py-3 border-b">
            <p className="!text-gray-900">{item.code}</p>
            <div className="flex items-center gap-2">
              <ToggleSwitch toggleValue={true} />
              <Icon
                name="delete"
                className="!cursor-pointer"
                onClick={() => onDeleteCode(item.id)}
              />
            </div>
          </div>
        )) ): (
            <p className='flex justify-center item'>No Deal Code is Available</p>
        )}
      </div>
    </div>
  </Modal>
);

export default DealCodeModal;
