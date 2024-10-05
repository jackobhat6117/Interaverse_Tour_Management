import React from 'react';

const CardList = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {cards?.map((card, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 flex flex-col justify-between h-full">
            <h6 className="mb-8 text-lg font-sans text-black">{card.title}</h6>
            <p className='border-2 border-gray-50 w-full'></p>
            <h4 className="mb-6 p-2 border-2 border-gray-200 rounded-md text-black text-sm">{card.amount}</h4>
            <button
              className={`w-full py-2 px-4 rounded 
              ${card.highlight ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
            >
              {card.btn}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
