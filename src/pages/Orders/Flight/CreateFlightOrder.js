import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import BreadCrumb from '../../../components/DIsplay/Nav/BreadCrumb'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Box, MenuItem, Popover, RadioGroup } from '@mui/material'
import RadioInput from '../../../components/form/RadioInput'
import CountriesInput from '../../../components/form/CountriesInput'
import CalendarInput1 from '../../../components/form/CalendarInput1'
import SelectInput from '../../../components/form/SelectInput'
import Button1 from '../../../components/form/Button1'
import { Add, Group } from '@mui/icons-material'
import FilterTravelPassengers from '../../../components/form/Filters/TravelPassengers'
import { decrypt, encrypt } from '../../../features/utils/crypto'
import { useDispatch, useSelector } from 'react-redux'
import { setBookingData } from '../../../redux/reducers/flight/flightBookingSlice'
import { offerSearchTemp } from '../../../data/flight/offerSearchData'
import { clone } from '../../../features/utils/objClone'
import Icon from '../../../components/HOC/Icon'
import moment from 'moment'
import TextInput from '../../../components/form/TextInput'
import CitiesInput from '../../../components/form/CitiesInput'

export default function CreateFlightOrder({callback}) {
  const [travelClass,setTravelClass] = useState('All');
  const [type,setType] = useState('oneway');
  const {bookingData} = useSelector(state => state.flightBooking);
  const [passengers,setPassengers] = useState(offerSearchTemp.passengers);
  const [flightType] = useState('INTERNATIONAL');
  const [corporateUniFares] = useState("");
  const [date,setDate] = useState([""]);
  const [destination,setDestination] = useState(offerSearchTemp.originDestinations);
  const [airline,setAirline] = useState();
  const [markup,setMarkup] = useState({value: '',type: ''});

  const [showAdvanced,setShowAdvanced] = useState(false);

  const [searchParam] = useSearchParams();
  const q = useMemo(() => searchParam.get('q'),[searchParam]);
  const [qObj,setQObj] = useState();

  const [noStops,setNoStops] = useState(qObj && qObj.noAirportChange)

  const [lockupd,setLocUpd] = useState(false);


  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if(q) {
      let obj = JSON.parse(decrypt(q));
      setQObj(obj)
      setDate(obj.originDestinations?.map(obj => obj.date))
      setDestination(obj.originDestinations);
      setNoStops(obj && obj.noAirportChange)
      setTravelClass((obj && obj.travelClass) || 'All')

      let type = 'oneway'
      if(obj.originDestinations?.length) {
        if(obj.originDestinations?.at(0)?.from === obj?.originDestinations?.at(-1)?.to)
          type = 'return'
        if(obj.originDestinations.length > 2)
          type = 'multiple'
      }
      setType(type)
    }
  },[q])

  useEffect(() => {
    if(type !== 'oneway') {
      if(destination.length < 2) {
        let tempDestination = clone(destination);

        let reversed = clone(tempDestination[0]);
        reversed.to = reversed.from;
        reversed.from = tempDestination[0]?.to
        tempDestination.push(reversed);

        setDestination(tempDestination);
      }
      if(date.length < 2)
        setDate([...date,""])
    }
    //eslint-disable-next-line
  },[type])


  const handleSetPassengers = useCallback((newPassengers) => {
    setPassengers(newPassengers);
  }, []);


  function handleSearch(ev) {
    ev?.preventDefault();

    let searchObj = {...offerSearchTemp};
    searchObj['originDestinations'] = clone(destination);
    date.map((d,i) => {
      if(i !== 0 && (!searchObj['originDestinations'][i] || !searchObj['originDestinations'][i]?.from)) {
        let reversed = clone(searchObj['originDestinations'][i-1]);
        reversed.to = reversed.from;
        reversed.from = clone(searchObj['originDestinations'][i-1])?.to;
        searchObj['originDestinations'][i] = reversed;
      }
      searchObj['originDestinations'][i]['date'] = d;
      return true;
    })
    // searchObj['originDestinations'].map((obj,i) => obj.date = date[i]);

    if(type === 'oneway')
      searchObj['originDestinations'] = searchObj['originDestinations'].slice(0,1);
    else if(type === 'return')
      searchObj['originDestinations'] = searchObj['originDestinations'].slice(0,2);

    searchObj['passengers'] = passengers;
    searchObj['travelClass'] = travelClass;
    if(flightType !== 'Any') 
      searchObj['flightType'] = flightType;
    searchObj['requestedFlightTypes'] = noStops ? ['N'] : null;
    searchObj['airlineOptions'] = airline ? {
      "M": [airline]
    }:null
    if(corporateUniFares) {
      searchObj['corporateUniFares'] = corporateUniFares.split(",")
    }

    // Backward Compatability
    searchObj['originDestinations']?.map(obj => {
      obj.departure.date = moment(obj.date).format('YYYY-MM-DD');
      obj.from = obj.from?.iata || obj?.from
      obj.to = obj.to?.iata || obj?.to
      
      return true
    })
    searchObj['destinations'] = searchObj.originDestinations.map(obj => {
      return {
        departureLocation: obj.from?.iata || obj?.from,
        arrivalLocation: obj.to?.iata || obj?.to,
        date: obj.date
      };
    })

    
    // searchObj['currencyOverride'] = def.currencyCode;
    // setData(newData);

    let enc = encrypt(JSON.stringify(searchObj));

            // SET TIME ------
    dispatch(setBookingData({...bookingData,offer: null,time: null}))

    // setTimeout(() => {
    //   dispatch(setModal(true))
    //   dispatch(setModalComp(PriceTimeout))
    // },priceTimeout)

    let referralCode = searchParam.get('refCode');


    if(callback)
      callback(searchObj);
    else
      navigate(`/order/new/flight/offers?referralCode=${referralCode}&q=${enc}`);

  }

  const calendarRef = useRef([...Array(10)]);

  function handleSetDate(val,i=0) {
    let tempDate = clone(date);
    tempDate[i] = val;
    // if(tempDate?.at(i+1) !== 'undefined')
    //   tempDate[i+1] = val;
    
    setDate(tempDate);

    if(calendarRef.current?.at(i+1)) {
      calendarRef.current[i]?.toggle();
      calendarRef.current[i+1]?.toggle(calendarRef.current[i+1]?.ref?.current);
    }

  } 

  function handleSetDestination(obj,i=0) {
    const tempDestination = clone(destination);
    tempDestination[i] = obj;
    setDestination(tempDestination)
    setLocUpd(false);

  }

  function handleAdd() {
    setDate([...date,""]);
    let lastDestination = clone(destination[destination.length-1]);
    let newDestination = clone(lastDestination);
    newDestination.from = lastDestination.to;
    newDestination.to = '';
    setDestination([...destination,newDestination]);
  }

  function handleRemove(i) {
    setDate(date => {
      const newArray = clone(date);
      newArray.splice(i,1);
      return newArray;
    });
    setDestination(dest => {
      const newArray = clone(dest);
      newArray.splice(i,1);
      return newArray;
    });
  }

  function swipeLoc(i=0) {
    let tempDestination = clone(destination);
    
    let from = tempDestination[i].from;
    tempDestination[i].from = tempDestination[i].to;
    tempDestination[i].to = from;


    setLocUpd(true);
    setDestination(tempDestination);
  }



  return (
    <div className='self-center flex flex-col gap-5 flex-1 pd-md w-full py-5'>
      {!callback ?
        <BreadCrumb>
          <Link to={'/order'}>Orders</Link>
          <b>New Order</b>
        </BreadCrumb>
      :null}
      <div className='justify-center items-center flex flex-col gap-4'>
        <div className='flex flex-col gap-4'>
          <div>
            {/* <h6>Journey Type</h6> */}
            {!callback ? 
              <RadioGroup onChange={(ev) => setType(ev.target.value)} >
                <div className='flex gap-4'>
                  <RadioInput className='whitespace-nowrap' value={'oneway'} checked={type === 'oneway'}>One way</RadioInput>
                  <RadioInput className='whitespace-nowrap' value={'return'} checked={type === 'return'}>Return</RadioInput>
                  <RadioInput className='whitespace-nowrap' value={'multiple'} checked={type === 'multiple'}>Multi-city</RadioInput>
                </div>
              </RadioGroup>
            :null}
          </div>
          <div className='flex gap-[2px]'>
            <CitiesInput label='Where from?' placeholder='Origin' lockUpdate={lockupd}
              value={destination[0]?.from || ''}
              onChange={(val) => handleSetDestination({...destination[0],from: val})}
            />
            <div className='relative flex items-center justify-center z-10 cursor-pointer'>
              <div className='absolute items-center justify-center flex'>
                <span className='bg-secondary shadow-lg rounded-full p-1 hover:rotate-180 transition-all' onClick={() => swipeLoc()}>
                  <Icon icon='mdi:exchange' className='!w-5 !h-5' />
                </span>
              </div>
            </div>
            <CitiesInput label={'Where to?'} placeholder='Destination'  lockUpdate={lockupd}
              value={destination[0]?.to || ''}
              onChange={(val) => handleSetDestination({...destination[0],to: val})}            
            />
          </div>
          <div className='flex justify-stretch gap-4'>
            <div className='flex-1'>
              <CalendarInput1 ref={(el) => calendarRef.current[0] = el} label='Departure Date' className='w-full border border-primary/20 rounded-md p-2'
                value={date[0] || ''}
                onChange={(value) => handleSetDate(value?.start || value)}
                config={{validDates: [new Date()]}}
              />
            </div>
            {type === 'return' ? 
              <CalendarInput1 ref={(el) => calendarRef.current[1] = el} label='Return Date' className='w-full border border-primary/20 rounded-md p-2'
                value={date[1] || ''}
                onChange={(value) => handleSetDate(value?.start || value,1)}
                defaultMonth={new Date(date[0])}
                config={{validDates: [date[0]]}}
              />
            :null}
          </div>
          {type === 'multiple' ? (
            <div className='flex flex-col gap-3'>
              {
              date.slice(1).map((d,i) => (
                <div key={i+1} className='flex gap-4 items-center'>
                  <div className='flex flex-col gap-4'>
                    <div className='flex gap-4'>
                      <CountriesInput label={'Origin'} placeholder='Origin'
                        value={destination[i+1]?.from || ''}
                        onChange={(val) => handleSetDestination({...destination[i+1],from: val?.alpha2 || val},i+1)}
                      />
                      <CountriesInput label={'Destination'} placeholder='Destination'
                        value={destination[i+1]?.to || ''}
                        onChange={(val) => handleSetDestination({...destination[i+1],to: val?.alpha2 || val},i+1)}         
                      />
                    </div>
                    <CalendarInput1 ref={el => calendarRef.current[i+1] = el} label='Departure Date' className='w-full border border-primary/20 rounded-md p-2'
                      value={d || ''}
                      onChange={(value) => handleSetDate(value?.start || value,i+1)}
                      defaultMonth={new Date(date[i-1])}
                      config={{validDates: [date[i-1]]}}
                    />
                  </div>
                  <div>
                    <Icon icon='carbon:close-filled' className='cursor-pointer' onClick={() => handleRemove(i)} />
                  </div>
                </div>
              ))
              }
              <Button1 className='!w-auto !self-start gap-2 !bg-primary/40' onClick={handleAdd}>
                <Add  />
                Add another flight</Button1>
            </div>
          ):null}
          <div className={'flex gap-4 '+(callback?'order-first':'')}>
            {!callback ? 
              <div className='flex-1'>
                <TravelInfo q={qObj} returnPassenger={handleSetPassengers} />
              </div>
            :null}
            <div className='flex-1'>
              <SelectInput value={travelClass} onChange={(ev) => setTravelClass(ev.target.value)} className='min-w-[100px]'
              select label="Travel Class" size='small'>
                <MenuItem value='All'>All</MenuItem>
                <MenuItem value='ECONOMY'>Economy</MenuItem>
                <MenuItem value="PREMIUM">Premium Economy</MenuItem>
                <MenuItem value="BUSINESS">Business</MenuItem>
                <MenuItem value="FIRST_SUPERSONIC">First Class</MenuItem>
              </SelectInput>
            </div>
          </div>
          {!callback ? 
            <button className='flex justify-end cursor-pointer text-theme1 text-sm'
            onClick={() => setShowAdvanced(prev => !prev)}
            >
              Advanced Options
            </button>
          :null}
          {showAdvanced ? 
            <div className='flex flex-col gap-4'>
              <div>
                <CountriesInput label='Preferred Airline' placeholder='Search'
                  value={airline || ''}
                  onChange={(value) => setAirline(value?.start || value)}
                />
              </div>
              <div className='flex gap-4'>
                <TextInput label='Markup Value' 
                  value={markup?.value}
                  onChange={(ev) => setMarkup({...markup,value: ev.target.value})}
                />
                <TextInput select label='Markup by'
                  value={markup?.type}
                  onChange={(ev) => setMarkup({...markup,type: ev.target.value})}
                >
                  <MenuItem value='percent'>Percent</MenuItem>
                  <MenuItem value='value'>value</MenuItem>
                </TextInput>
              </div>
            </div>
          :null}
          <Button1 onClick={handleSearch}>Search for flights</Button1>
        </div>
      </div>
    </div>
  )
}


function TravelInfo({returnPassenger,returnBags,q}) {
  // const [luggage] = useState();
  const [passenger,setPassenger] = useState() ;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const getPassenger = useMemo(() => {
    return q && Object.entries(q.passengers).map(([key,value]) => ({name: key,value}))
  },[q])

  useEffect(() => {
    setPassenger(getPassenger)
  },[getPassenger])


  const handleReturnPassenger = useCallback((passenger) => {
    if(returnPassenger)
      returnPassenger(passenger.map((data) => (data.value >  0 && {[data.name]: data.value})).reduce((prev,cur) => ({...prev,...cur})));
  },[returnPassenger])

  useEffect(() => {
    if(Array.isArray(passenger))
      handleReturnPassenger(passenger)
  },[passenger,handleReturnPassenger])


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = open ? 'TravelInfo': undefined;
  const passengerCount = passenger && passenger.map(obj => obj.value).reduce((prev,cur) => parseInt(prev)+parseInt(cur),0);

  return (
    <div>
    <Button1
        className='!border !border-primary/30'
        variant={'outlined'}
        aria-describedby={id}
        onClick={handleClick}
      >
      <div className='flex gap-2 self-start text-gray-700 cursor-pointer relative'>
        <div className='flex gap-1 items-center font-mono'>
          <Group />
          {passenger ? passengerCount : 1}
          <span>
            Passenger{passengerCount > 1 ? 's':''}
          </span>
        </div>
        {/* <div className='flex gap-1 items-center font-mono'>
          <Luggage />
          {luggage ? luggage.map(obj => obj.value).reduce((prev,cur) => prev+cur,0) : 0}
        </div> */}
      </div>
    </Button1>
    <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        // TransitionComponent={Fade}
      >
        <Box className='flex flex-col gap-5 p-4 px-6 min-w-[300px]'>
          <FilterTravelPassengers returnData={(objs) => setPassenger(objs)} q={q && q.passengers} />
          {/* <TravelLuggage returnData={(objs) => setLuggage(objs)} /> */}
        </Box>
    </Popover>

    </div>
  )
}
