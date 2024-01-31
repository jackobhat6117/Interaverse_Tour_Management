import { Cancel } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import FilterCabin from "../../../../components/flight/filters/FilterCabin";
import FilterStops from "../../../../components/flight/filters/FilterStops";
import FilterExCountries from "../../../../components/flight/filters/FilterExCountries";
import FilterPrice from "../../../../components/flight/filters/FilterPrice";
import FilterAirlines from "../../../../components/flight/filters/FilterAirlines";
import FilterTime from "../../../../components/flight/filters/FilterTime";
import { useNavigate, useSearchParams } from "react-router-dom";
import { decrypt, encrypt } from "../../../../features/utils/crypto";
import { clone } from "../../../../features/utils/objClone";
import FilterDay from "../../../../components/flight/filters/FilterDay";
import moment from "moment";
import FilterSuplier from "../../../../components/flight/filters/FilterSuplier";
import FilterFlexibility from "../../../../components/flight/filters/FilterFlexibility";


export default function FlightOfferFilter({orgi:defOrgi,data,cats,setData}) {
  const [filters,setFilters] = useState({});
  let count = Object.entries(filters).filter(([key,val]) => val).length;
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const q = useMemo(() => searchParam.get('q'),[searchParam]);
  const qObj = q && JSON.parse(decrypt(clone(q)));
  const [orgi,setOrgi] = useState(defOrgi);
  
  useEffect(() => {
    setOrgi(defOrgi)
  },[defOrgi])
  // useEffect(() => {
  //   console.log('filters: ',filters)
  // },[filters])

  // function filterByBags(objs) {
  //   // console.log('filtering bags')
  //   // setFilters({...filters,bags: objs})
  //   // setData(data => data.filter(obj => (

  //   // )))
  // }
  function filterByCabin(data,objs,config) {
    if(!data) return [];
    if(!config || !config?.target)
      return data;

    let newQObj = qObj;
    newQObj.travelClass = objs.name
    newQObj.cabinClass = [objs.otherName || objs.name]

    let enc = encrypt(JSON.stringify(newQObj));
    navigate(`/order/new/flight/offers?q=${enc}`);

    return [];
  }
  function filterByStops(data,objs) {
    if(!data) return [];

    console.log(data,objs)
    let newData = data.filter(obj => {
      if(obj.segments) {
        if(!objs.allowOv && obj.segments.every(item => item.numberOfStops > 0 && item.flights.every((flight,ind,arr) => {
          if (ind > 0) {
            const prevFlight = arr[ind - 1];
            const prevArrivalTime = prevFlight.arrivalTime;
            const currentDepartureTime = flight.departureTime;
            const timeDiff = new Date(`2000-01-01T${currentDepartureTime}:00`) - new Date(`2000-01-01T${prevArrivalTime}:00`);
            const hoursDiff = timeDiff / (1000 * 60 * 60);
            const isOvernightStopover = (
              hoursDiff >= 12 &&
              (prevArrivalTime < "06" || prevArrivalTime >= "18" || currentDepartureTime < "06" || currentDepartureTime >= "18")
            );
            return isOvernightStopover;
          }
          return true;
        })))
          return false;

        if(objs.data.name === "") return true;
          
        if(objs.data.name === 'nonstop')
          return obj.segments.every(item => item.numberOfStops === 0)
        else if(objs.data.name === "<=1")
          return obj.segments.every(item => item.numberOfStops <= 1)
        else if(objs.data.name === "<=2")
          return obj.segments.every(item => item.numberOfStops <= 2)
      }
      return false;
    })
    
    return newData;
  }
  function filterByCountry(data,objs) {
    if(!data) return [];

    let newData = data.filter(obj => {
      if(obj.segments)
        if(obj.segments.every(item => item.flights.every((flight) => objs.every((d) => !d.value || (d.alpha !== flight.arrivalCountryCode )))))
          return true;
      
      return false;
    })

    return newData;
  }
  function filterByAirline(data,objs) {
    if(!data) return [];
    console.log(data,objs)
    
    if(objs.every(obj => !obj.value))
      return data;
    
    let newData = data?.filter(obj => {
      if(obj.segments)
        if(obj.segments.every(item => item.flights.some((flight) => objs.filter(obj => obj.value).some((d) => (d.id === flight.marketingCarrier)))))
          return true;
      
      return false;
    })
    
    return newData;
  }
  function filterBySuplier(data,objs) {
    if(!data) return [];

    let newData = data.filter(obj => {
      let found = objs.find(suplier => suplier.value && obj[suplier.id])
      if(found) return true;
      return false;
    })
    if(!newData.length) return data

    return newData;
  }
  function filterByPrice(data,obj) {
    if(!data) return [];

    if(obj.price === obj.max) return data;

    let newData = data.filter(offer => {
      return parseInt(offer.totalAmount) <= obj.price;
    })

    return newData;
  }
  function filterByFlexibility(data,obj) {
    if(!data) return [];

    if(obj?.name === 'Any') return data
    console.log(' -> ',obj)
    let newData = data?.filter(offer => {  
      let refundable = offer?.segments?.every(segment => segment.flights?.every(flight => flight?.amenities?.find(amen => amen.description === 'REFUNDS')))  
      if(obj?.name === 'Refundable')
        return refundable
      else return !refundable
    })

    return newData;
  }
  function filterByTime(data,obj) {
    if(!data) return [];
    // console.log(' filte by time --------')
    let newData = data.filter(offer => {
      if(obj.selectedValue === 'Departure') {
        if(offer.segments) {
          if((offer.segments[0].departureTime >= obj.departureTime[0] &&
            offer.segments[0].departureTime <= obj.departureTime[1])
            &&
            (offer.segments[0].arrivalTime >= obj.arrivalTime[0] &&
            offer.segments[0].arrivalTime <= obj.arrivalTime[1])) return true;
        }
      }
      else if(obj.selectedValue === 'Return') {
        // console.log(obj.selectedValue)
        // console.log(offer.segments)
        if(offer.segments) {
          let len = offer.segments.length - 1;
          if((offer.segments[len].departureTime >= obj.departureTime[0] &&
            offer.segments[len].departureTime <= obj.departureTime[1])
            &&
            (offer.segments[len].arrivalTime >= obj.arrivalTime[0] &&
            offer.segments[len].arrivalTime <= obj.arrivalTime[1])) return true;
        } else console.log('cherash --------- ')
      }

      return false;
    })
    // console.log(newData)
    // console.log(' ---------- filter by time')

    return newData;
  }
  function filterByDay(data,obj) {
    if(!data) return [];

    if(!obj?.day)
      return data;

    let newData = data.filter(offer => {
      let time;
      if(obj.selectedValue === 'Departure') {
        if(offer.segments) {
          time = offer.segments[0].departureDate;
        }
      } else if(obj.selectedValue === 'Return') {
        if(offer.segments) {
          let len = offer.segments.length - 1;
          time = offer.segments[len].arrivalDate
        }
      }

      if(time) {
        // console.log('dep : ', time,moment(time).format("dddd"))
        if(moment(time).format('dddd') === obj.day)
          return true;
      }
        // console.log(offer.segments[0])

      // return false;
      return false;
    })

    return newData;
    // return newData;
  }

  function setFilteredData(filter,config) {
    let datas = orgi;
    let res = Object.entries({...filters,...filter}).reduce((data,[key,val]) => {
      if(key === 'cabin')
        return filterByCabin(data,val,config)
      else if(key === 'stops')
        return filterByStops(data,val);
      else if(key === 'exCant')
        return filterByCountry(data,val);
      else if(key === 'price')
        return filterByPrice(data,val);
      else if(key === 'airlines')
        return filterByAirline(data,val);
      else if(key === 'time')
        return filterByTime(data,val);
      else if(key === 'day')
        return filterByDay(data,val);
      else if(key === 'suplier')
        return filterBySuplier(data,val);
      else if(key === 'flexibility')
        return filterByFlexibility(data,val);
      
      return data
    },datas)
    
    setFilters({...filters,...filter});
    setData(res);
    return res;
  }

  const [clear,setClear] = useState(0);
  
  function clearFilter() {
    setFilters({})
    setData(orgi);
    setClear(clear+1)
  }


  let minPrice = 0;
  let maxPrice = 0;
  try {
    minPrice = (orgi && orgi[0]?.totalAmount ) || 0;
    maxPrice = (orgi && orgi?.at(-1)?.totalAmount) || 0;
  } catch(ex) {}

  return (
    <div className='flex flex-col gap-5 p-6 max-w-[300px] rounded-2xl overflow-clip'>
      <div className='flex gap-6 justify-between items-center'>
        <h6>{count} filter Active</h6>
        {count > 0 ? (
          <button onClick={clearFilter}>
            <Cancel className='w-3 h-3' />
            &nbsp; Clear Filters
          </button>
        ) : null}
      </div>
      {/* <hr />
        <FilterTravelLuggage returnData={(objs) => filterByBags(objs)} /> */}
      <hr />
        <FilterSuplier clear={clear} cats={cats} orgi={orgi} returnData={(objs) => setFilteredData({suplier: objs})} />
      <hr />
        <FilterCabin clear={clear} cats={cats} orgi={orgi} returnData={(objs) => setFilteredData({cabin: objs},{target: true})} />
      <hr />
        <FilterStops clear={clear} cats={cats} orgi={orgi} returnData={(objs) => setFilteredData({stops: objs})} />
      <hr />
        <FilterAirlines clear={clear} orgi={orgi} returnData={(objs) => setFilteredData({airlines: objs})} />
      <hr />
        <FilterFlexibility clear={clear} cats={cats} orgi={orgi} returnData={(objs) => setFilteredData({flexibility: objs})} />
        
      {/* <hr />
        <FilterExCountries clear={clear} returnData={(objs) => setFilteredData({exCant: objs})} /> */}
      <hr />
        <FilterTime clear={clear} returnData={((objs) => setFilteredData({time: objs}))} />
      <hr />
        <FilterPrice clear={clear} min={minPrice} max={maxPrice} returnData={(obj) => setFilteredData({price: obj})} />
      <hr />
      <FilterDay clear={clear} returnData={obj => setFilteredData({day: obj})} />
    </div>
  )
}