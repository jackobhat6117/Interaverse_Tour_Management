import React, { useState, useEffect } from 'react';
import SupplierSection from '../../../components/Settings/suppliers/SupplierSections';
import getSuppliersName from '../../../controllers/settings/supplier/getSuppliers';

const Supplier = () => {
  const [loading, setLoading] = useState(true); // Start with loading = true
  const [flightProviders, setFlightProviders] = useState([]);

  const hotelProviders = [
    { title: 'Suppliers', providers: [{ initials: 'HB', name: 'Hotelbeds', toggle: false }, { initials: 'SA', name: 'Sabre' }] }
  ];

  const toursProviders = [
    { title: 'Suppliers', providers: [{ initials: 'HB', name: 'Hotelbeds', toggle: false }, { initials: 'SA', name: 'Sabre' }] }
  ];

  const getSuppliers = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const res = await getSuppliersName();
      setFlightProviders(res.data);
    } catch (error) {
      console.error("Error fetching suppliers", error);
    } finally {
      setLoading(false); // Set loading to false after fetching completes
    }
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  const allSuppliers = flightProviders?.enabledSuppliers?.map((code) => ({
    code: code,
    name: code,
    expiration: flightProviders.bookingExpiration[code] || null,
  }));

  const localFlights = flightProviders?.enabledSuppliers
    ?.filter((code) => code.startsWith('Intra1'))
    ?.map((code) => ({
      code: code,
      name: code,
      expiration: flightProviders.bookingExpiration[code] || null,
    }));

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-6">Flight</h2>
      {/* Pass the loading state as well */}
      <SupplierSection allSuppliers={allSuppliers} localFlights={localFlights} loading={loading} />

      <hr className="hidden sm:block my-5" />
      <h2 className="text-xl font-bold mb-6">Hotels</h2>
      {/* Pass the loading state to handle hotel loading */}
      <SupplierSection allSuppliers={allSuppliers} loading={loading} />
    </div>
  );
};

export default Supplier;
