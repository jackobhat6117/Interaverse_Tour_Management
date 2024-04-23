import React, { useState } from 'react';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';


const libraries = ['places'];
const mapLoaderObj = {
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyCGPY_hsHcarYRmtuyvZCTOyoRWGN7-JGA',
  libraries
}

const MapAutoComplete = ({handleReturn,children}) => {
  // const [currentLocation, setCurrentLocation] = useState(null);
  // const [open,setOpen] = useState(false);
  // const locationInput = useRef(null);
  const [searchResult,setSearchResult] = useState();
  // const [map,setMap] = useState(/** @type google.maps.Map */ (null));
  // const [value,setValue] = useState('');

  
  const {isLoaded} = useJsApiLoader(mapLoaderObj)
  
  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function getPlaceDetail(place) {
    const lat = place.geometry.location.lat()
    const lng = place.geometry.location.lng();

    const name = place.name;
    
    const formattedAddress = place.formatted_address;
    // setValue(formattedAddress)
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
        // const {lat,lng} = 
        getPlaceDetail(place)
        // setCurrentLocation({lat,lng})

      } catch(ex) {}
    }
  }


  if(!isLoaded)
    return children

  return (
    <div className={'w-full'}>
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad} className='flex-1'>
        {children}
      </Autocomplete>

      {/* <TextInput label={label||'Location'} onFocus={() => setOpen(true)} className={className} value={value} />
      <Modal1 open={open} setOpen={setOpen}>
        <div className='card w-[800px] max-w-full h-[90vh] max-h-full p-0 overflow-hidden rounded-md relative'>
          <div className='absolute top-0 left-0 w-full flex  items-center justify-center '>
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
      </Modal1> */}
    </div>
  );
};

export default MapAutoComplete;