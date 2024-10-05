import React, { useState } from 'react'
import Flight from '../Fees/Flight'
import Hotels from '../Fees/Hotels'
import Tours from '../Fees/Tours'
import Insurance from '../Fees/Insurance'
import Wallet from '../Fees/Wallet'
import WhiteLabel from '../Fees/WhiteLabel'
import Invoice from '../Fees/Invoice'
import Extras from '../Fees/Extras'



const Fees = () => {

    const [selectedSection, setSelectedSection] = useState("flights")
 
  return ( 
    <div className='flex flex-col'>
      <div className='flex gap-20 items-center overflow-x-auto whitespace-nowrap'>
        <div>

          <button
            className={`text-lg transition duration-300 ease-in-out ${
              selectedSection === 'flights'
                ? 'p-2 w-36 bg-gray-800 text-white rounded-lg'
                : 'text-gray-500'
            }`}
            onClick={() => setSelectedSection('flights')}
          >
            Flights
          </button>
        </div>

        <div>
          <button
            className={`text-lg transition duration-300 ease-in-out ${
              selectedSection === 'hotels'
                ? 'p-2 w-36 bg-gray-800 text-white rounded-lg'
                : 'text-gray-500'
            }`}
            onClick={() => setSelectedSection('hotels')}
          >
            Hotels
          </button>
        </div>

        <div>
          <button
            className={`text-lg transition duration-300 ease-in-out ${
              selectedSection === 'tours'
                ? 'p-2 w-36 bg-gray-800 text-white rounded-lg'
                : 'text-gray-500'
            }`}
            onClick={() => setSelectedSection('tours')}
          >
            Tours
          </button>
        </div>

        <div>
          <button
            className={`text-lg transition duration-300 ease-in-out ${
              selectedSection === 'insurance'
                ? 'p-2 w-36 bg-gray-800 text-white rounded-lg'
                : 'text-gray-500'
            }`}
            onClick={() => setSelectedSection('insurance')}
          >
            Insurance
          </button>
        </div>

        <div>
          <button
            className={`text-lg transition duration-300 ease-in-out ${
              selectedSection === 'wallet'
                ? 'p-2 w-36 bg-gray-800 text-white rounded-lg'
                : 'text-gray-500'
            }`}
            onClick={() => setSelectedSection('wallet')}
          >
            Wallet
          </button>
        </div>

        <div>
          <button
            className={`text-lg transition duration-300 ease-in-out ${
              selectedSection === 'white-lebel'
                ? 'p-2 w-36 bg-gray-800 text-white rounded-lg'
                : 'text-gray-500'
            }`}
            onClick={() => setSelectedSection('white-lebel')}
          >
            White-label
          </button>
        </div>

        <div>
          <button
            className={`text-lg transition duration-300 ease-in-out ${
              selectedSection === 'invoice'
                ? 'p-2 w-36 bg-gray-800 text-white rounded-lg'
                : 'text-gray-500'
            }`}
            onClick={() => setSelectedSection('invoice')}
          >
            Invoice
          </button>
        </div>

        <div>
          <button
            className={`text-lg transition duration-300 ease-in-out ${
              selectedSection === 'extras'
                ? 'p-2 w-36 bg-gray-800 text-white rounded-lg'
                : 'text-gray-500'
            }`}
            onClick={() => setSelectedSection('extras')}
          >
            Extras
          </button>
        
        </div>
      </div>

      <div>

        {selectedSection === 'flights' && (
          <Flight/>
        )}
         {selectedSection === 'hotels' && (
          <Hotels />
        )}
          {selectedSection === 'tours' && (
          <Tours />
        )}
          {selectedSection === 'insurance' && (
          <Insurance />
        )}
          {selectedSection === 'wallet' && (
          <Wallet />
        )}

          {selectedSection === 'white-lebel' && (
          <WhiteLabel />
        )}

        {selectedSection === 'invoice' && (
          <Invoice />
        )}

        {selectedSection === 'extras' && (
          <Extras />
        )}
     
    </div>
      </div>




   

  
   
  )
}

export default Fees
