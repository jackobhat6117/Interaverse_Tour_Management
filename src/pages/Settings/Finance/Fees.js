import React, { useState } from 'react'

export const financeLinks = [
  {to: "/settings/finance/", title: '', icon: 'vaadin:cash',label: "Payout"},
  {to: "/settings/finance/method", title: 'method', icon: 'mdi:hand-coin',label: "Payout Method"},
  {to: "/settings/finance/payment", title: 'payment', icon: 'simple-icons:contactlesspayment', label: "Payment Method"},
  {to: "/settings/finance/gateway", title: 'gateway', icon: 'fluent:collections-add-20-filled', label: "Payment Gateway"},
  {to: "/settings/finance/balance", title: 'balance', icon: 'material-symbols-light:account-balance-wallet', label: "Wallet Balance"},
  {to: "/settings/finance/currency", title: 'currency', icon: 'ph:currency-ngn-fill', label: "Exchange Rate"},
  {to: "/settings/finance/fees", title: 'fees', icon: 'ph:currency-ngn-fill', label: "Fees"},

]


const Fees = () => {

    const [selectedSection, setSelectedSection] = useState("flights")
 
    



  return (
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




   

  
   
  )
}

export default Fees
