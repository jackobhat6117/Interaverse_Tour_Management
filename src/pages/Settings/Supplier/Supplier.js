import React from 'react'
import SupplierSection from '../../../components/Settings/suppliers/SupplierSections';

const Supplier = () => {

  const flightProviders = [
    { title: 'GDS', providers: [{ initials: 'AM', name: 'Amadeus' }, { initials: 'SA', name: 'Sabre' }, { initials: 'TR', name: 'Travelport' }] },
    { title: 'TRAVIX', providers: [{ initials: 'AM', name: 'Amadeus' }, { initials: 'SA', name: 'Sabre' }, { initials: 'TR', name: 'Travelport' }] },
    { title: 'LOCAL FLIGHTS', providers: [{ initials: 'AM', name: 'Amadeus' }, { initials: 'SA', name: 'Sabre' }, { initials: 'TR', name: 'Travelport' }] },
  ];

  const hotelProviders = [
    {title: 'Suppliers', providers: [{ initials: 'HB', name: 'Hotelbeds' }, { initials: 'SA', name: 'Sabre' }]}
  ];

  const toursProviders = [
    {title: 'Suppliers', providers: [{ initials: 'HB', name: 'Hotelbeds' }, { initials: 'SA', name: 'Sabre' }]}
  ];
  return (
    <div className="container mx-auto p-4">
    <h2 className="text-xl font-bold mb-6">Flight</h2>
    {flightProviders.map((section) => (
      <SupplierSection key={section.title} title={section.title} providers={section.providers} />
    ))}
    <h2 className="text-xl font-bold mb-6">Hotels</h2>
    {hotelProviders.map((section) =>
  
    <SupplierSection key={section.title} title={section.title} providers={section.providers} />
  )}
   <h2 className="text-xl font-bold mb-6">Tours</h2>
    {toursProviders.map((section) =>
  
    <SupplierSection key={section.title} title={section.title} providers={section.providers} />
  )}
  </div>
  )
}

export default Supplier
