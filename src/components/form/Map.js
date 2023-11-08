import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Get user's location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      }, (error) => {
        console.error(error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMap
        mapContainerStyle={{ height: '100%', width: '100%' }}
        center={currentLocation}
        zoom={14}
      >
        {currentLocation && (
          <Marker position={currentLocation} />
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;