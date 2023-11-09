import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Modal1 from '../DIsplay/Modal/Modal1';
import TextInput from './TextInput';
import Button1 from './Button1';
import Icon from '../HOC/Icon';


const libraries = ['places'];
const mapLoaderObj = {
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyCGPY_hsHcarYRmtuyvZCTOyoRWGN7-JGA',
  libraries
}

const Map = ({label,className,handleReturn}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [open,setOpen] = useState(false);
  // const locationInput = useRef(null);
  const [searchResult,setSearchResult] = useState();
  const [map,setMap] = useState(/** @type google.maps.Map */ (null));
  const [value,setValue] = useState('');

  
  const {isLoaded} = useJsApiLoader(mapLoaderObj)
  
  useEffect(() => {
    //eslint-disable-next-line
    // const autoComplete = new google.maps.places.Autocomplete(locationInput.current);
    // autoComplete.addListener('place_changed',() => {
    //   const place = autoComplete.getPlace();
    //   console.log(place)
    // })
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

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function getPlaceDetail(place) {
    const lat = place.geometry.location.lat()
    const lng = place.geometry.location.lng();

    const name = place.name;
    
    const formattedAddress = place.formatted_address;
    setValue(formattedAddress)
    let route = ''
    let subcity = ''
    let city = ''
    let country = ''

    place?.address_components?.map(obj => {
      if(obj.types.includes('route')) route = obj.long_name;
      else if(obj.types.includes("sublocality" || "sublocality_level_1")) subcity = obj.long_name;
      else if(obj.types.includes("locality")) city = obj.long_name
      else if(obj.types.includes("country")) country = obj.long_name
      return true
    })
    console.log(place);
    //console log all results
    // console.log(`Name: ${name}`);
    // console.log(`Formatted Address: ${formattedAddress}`);

    const result = {
      ...place,
      name,
      formattedAddress,
      lat, lng,
      country,
      city,
      subcity,
      route,
    }

    handleReturn && handleReturn(result);
    return result;
  }

  function onPlaceChanged() {
    if (searchResult != null) {
    const place = searchResult.getPlace();

      //variable to store the result
      try {
        const {lat,lng} = getPlaceDetail(place)
        setCurrentLocation({lat,lng})

      } catch(ex) {}
    }
  }

  function handleClick(ev) {
    const {latLng} = ev;
    const lat = latLng.lat();
    const lng = latLng.lng();
    map.panTo(latLng)
    setTimeout(() => 
      setCurrentLocation({lat,lng})
    ,200)
    
    

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          getPlaceDetail(results[0])
          console.log(results); // Location details
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  if(!isLoaded)
    return <img src='/gifs/loading-bar' alt='' className='h-[100px]' />

  return (
    <div className={'w-full'}>
      <TextInput label={label||'Location'} onFocus={() => setOpen(true)} className={className} value={value} />
      <Modal1 open={open} setOpen={setOpen}>
        <div className='card w-[800px] max-w-full h-[90vh] max-h-full p-0 overflow-hidden rounded-md relative'>
          <div className='absolute top-0 left-0 w-full flex  items-center justify-center z-10'>
            <div className='card rounded-md p-4 m-2 sm:w-1/2 flex gap-4 max-w-full min-w-[300px]'>
              <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad} className='flex-1'>
                <TextInput label='' placeholder={'Search your Location'} className='w-full' size='small'
                  InputProps={{
                    endAdornment: <Icon icon='majesticons:search-line' />
                  }}                  
                />
              </Autocomplete>
              <div>
                <Button1 onClick={() => setOpen(false)}>Done</Button1>
              </div>
            </div>
            {/* <div className=' top-0 right-0 p-2 m-2 rounded-full z-10 hidden sm:block'>
              <div className='flex items-center justify-center p-4 hover:scale-110 cursor-pointer rounded-full bg-secondary shadow'
                onClick={() => setOpen(false)}
              >
                <Icon icon='zondicons:close-solid' className='text-red-500' />
              </div>
            </div> */}
          </div>
          <div style={{ height: '100%', width: '100%' }}>
            <GoogleMap
              mapContainerStyle={{ height: '100%', width: '100%' }}
              center={currentLocation}
              zoom={14}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={(map) => setMap(map)}
              onClick={handleClick}
            >
              {currentLocation && (
                <Marker position={currentLocation} />
                )}
            </GoogleMap>
          </div>
        </div>
      </Modal1>
    </div>
  );
};

export default Map;