
import React, { useState, Suspense } from 'react';
import TabButton from '../../../components/Settings/fees/FeeTabButton';

const Flight = React.lazy(() => import('./Fees/Flight'));
const Hotels = React.lazy(() => import('./Fees/Hotels'));
const Tours = React.lazy(() => import('./Fees/Tours'));
const Insurance = React.lazy(() => import('./Fees/Insurance'));
const Wallet = React.lazy(() => import('./Fees/Wallet'));
const WhiteLabel = React.lazy(() => import('./Fees/WhiteLabel'));
const Invoice = React.lazy(() => import('./Fees/Invoice'));
const Extras = React.lazy(() => import('./Fees/Extras'));

const Fees = () => {
  const [selectedSection, setSelectedSection] = useState('flights');

  const sections = [
    { section: 'flights', label: 'Flights' },
    { section: 'hotels', label: 'Hotels' },
    { section: 'tours', label: 'Tours' },
    { section: 'insurance', label: 'Insurance' },
    { section: 'wallet', label: 'Wallet' },
    { section: 'white-label', label: 'White-label' },
    { section: 'invoice', label: 'Invoice' },
    { section: 'extras', label: 'Extras' },
  ];

  const componentMap = {
    flights: Flight,
    hotels: Hotels,
    tours: Tours,
    insurance: Insurance,
    wallet: Wallet,
   'white-label': WhiteLabel,
    invoice: Invoice,
    extras: Extras,
  };

  const SelectedComponent = componentMap[selectedSection];
  

  return (
    <div className="flex flex-col">
      <div className="flex gap-16 items-center overflow-x-auto whitespace-nowrap  mx-5">
        {sections.map(({ section, label }) => (
          <TabButton
            key={section}
            section={section}
            label={label}
            selectedSection={selectedSection}
            onClick={setSelectedSection}
          />
        ))}
      </div>
      {/* <p className='border border-gray-200 mt-7'></p> */}
      <hr className='hidden sm:block mt-5' />

      <div className="">
        <Suspense fallback={<div className='flex justify-center'>Loading...</div>}>
          {SelectedComponent && <SelectedComponent />}
        </Suspense>
      </div>
    </div>
  );
};

export default Fees;
