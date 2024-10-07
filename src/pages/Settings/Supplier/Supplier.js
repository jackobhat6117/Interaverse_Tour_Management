import React from 'react'
import SupplierSection from '../../../components/Settings/suppliers/SupplierSections';

const Supplier = () => {

  const flightProviders = [
    { title: 'GDS', providers: [{ initials: 'AM', name: 'Amadeus', toggle: true }, { initials: 'SA', name: 'Sabre' , toggle: true}, { initials: 'TR', name: 'Travelport', toggle: true }]},
    { title: 'TRAVIX', providers: [{ initials: 'AM', name: 'Amadeus', toggle: true }, { initials: 'SA', name: 'Sabre', toggle: true }, { initials: 'TR', name: 'Travelport', toggle: true}] , },
    { title: 'LOCAL FLIGHTS', providers: [{ initials: 'AM', name: 'Amadeus', toggle: true}, { initials: 'SA', name: 'Sabre', toggle: true }, { initials: 'TR', name: 'Travelport', toggle: true }]},
  ];

  const hotelProviders = [
    {title: 'Suppliers', providers: [{ initials: 'HB', name: 'Hotelbeds' , toggle:false}, { initials: 'SA', name: 'Sabre' }], toggle:false}
  ];

  const toursProviders = [
    {title: 'Suppliers', providers: [{ initials: 'HB', name: 'Hotelbeds', toggle:false }, { initials: 'SA', name: 'Sabre' }], }
  ];
  return (
    <div className="container mx-auto p-4">
    <h2 className="text-xl font-bold mb-6">Flight</h2>
    {flightProviders.map((section) => (
      <SupplierSection key={section.title} title={section.title} providers={section.providers} />
    ))}
    <hr className='hidden sm:block my-5' />
    <h2 className="text-xl font-bold mb-6">Hotels</h2>
    {hotelProviders.map((section) =>
  
    <SupplierSection key={section.title} title={section.title} providers={section.providers} />
  )}
  <hr className='hidden sm:block my-5' />
   <h2 className="text-xl font-bold mb-6">Tours</h2>
    {toursProviders.map((section) =>
  
    <SupplierSection key={section.title} title={section.title} providers={section.providers} />
  )}
  </div>
  )
}

export default Supplier
