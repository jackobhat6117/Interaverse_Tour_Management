import React from 'react';

const CardList = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {cards?.map((card, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 flex flex-col justify-between h-full">
           <p className="mb-8 text-lg !text-gray-800">{card.title}</p>
            <p className='border-2 border-gray-50 w-full'></p>
            <p className="mb-6 p-2 border-2 border-gray-200 rounded-md !text-gray-900 text-sm !font-bold">{card.amount}</p>
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
