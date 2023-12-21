import { Cancel } from "@mui/icons-material";
import { useMemo, useState } from "react";
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


export default function FlightOfferFilter({orgi,data,cats,setData}) {
  const [filters,setFilters] = useState({});
  let count = Object.entries(filters).filter(([key,val]) => val).length;
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const q = useMemo(() => searchParam.get('q'),[searchParam]);
  const qObj = q && JSON.parse(decrypt(clone(q)));

  
  // useEffect(() => {
  //   console.log('filters: ',filters)
  // },[filters])

  // function filterByBags(objs) {
  //   // console.log('filtering bags')
  //   // setFilters({...filters,bags: objs})
  //   // setData(data => data.filter(obj => (

  //   // )))
  // }
  function filterByCabin(data,objs) {
    // let newData = data.filter(obj => {
    //   if(objs.name === "") return true;
    //   if(obj.segments) {
    //     if(obj.segments[0].cabin)
    //       return obj.segments[0].cabin.toLowerCase() === objs.name.toLowerCase();
    //   }
    //   return false;
    // });

    let newQObj = qObj;
    newQObj.travelClass = objs.name
    // console.log('cabin: ',objs);
    // console.log('qObj: ',newQObj);

    let enc = encrypt(JSON.stringify(newQObj));
    navigate(`/search/flight/offers?q=${enc}`);

    return [];
  }
  function filterByStops(data,objs) {
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
    let newData = data.filter(obj => {
      if(obj.segments)
        if(obj.segments.every(item => item.flights.every((flight) => objs.every((d) => !d.value || (d.alpha !== flight.arrivalCountryCode )))))
          return true;
      
      return false;
    })

    return newData;
  }
  function filterByAirline(data,objs) {
    let newData = data.filter(obj => {
      if(obj.segments)
        if(obj.segments.every(item => item.flights.every((flight) => objs.every((d) => !d.value || (d.name === flight.carrierName)))))
          return true;
      
      return false;
    })

    return newData;
  }
  function filterBySuplier(data,objs) {
    let newData = data.filter(obj => {
      let found = objs.find(suplier => suplier.value && obj[suplier.id])
      if(found) return true;
      return false;
    })
    if(!newData.length) return data

    return newData;
  }
  function filterByPrice(data,obj) {
    if(obj.price === obj.max) return data;

    let newData = data.filter(offer => {
      return parseInt(offer.totalAmount) <= obj.price;
    })

    return newData;
  }
  function filterByTime(data,obj) {
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

  function setFilteredData(filter) {
    console.log('got Filter',filter);
    let datas = orgi;
    let res = Object.entries({...filters,...filter}).reduce((data,[key,val]) => {
      if(key === 'cabin')
        return filterByCabin(data,val)
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
      
      return data
    },datas)
    
    setFilters({...filters,...filter});
    setData(res);
    return res;
  }

  function clearFilter() {
    setFilters({})
    setData(orgi);
  }

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
        <FilterSuplier cats={cats} orgi={orgi} returnData={(objs) => setFilteredData({suplier: objs})} />
      <hr />
        <FilterCabin cats={cats} orgi={orgi} returnData={(objs) => setFilteredData({cabin: objs})} />
      <hr />
        <FilterStops cats={cats} orgi={orgi} returnData={(objs) => setFilteredData({stops: objs})} />
      <hr />
        <FilterAirlines returnData={(objs) => setFilteredData({airlines: objs})} />
      <hr />
      {/* <Collapse show label={<h5>Flexibility</h5>}>
        <label className='flex gap-4 justify-between'>
          <span className='flex gap-2'>
            <input name='stops' type='radio' />
            <span>Any</span>
          </span>
        </label>
        <label className='flex gap-4 justify-between'>
          <span className='flex gap-2'>
            <input name='stops' type='radio' />
            <span>Refundable</span>
          </span>
        </label>
        <label className='flex gap-4 justify-between'>
          <span className='flex gap-2'>
            <input name='stops' type='radio' />
            <span>Non - Refundable</span>
          </span>
        </label>
      </Collapse> */}
      <hr />
        <FilterExCountries returnData={(objs) => setFilteredData({exCant: objs})} />
      <hr />
        <FilterTime returnData={((objs) => setFilteredData({time: objs}))} />
      <hr />
        <FilterPrice returnData={(obj) => setFilteredData({price: obj})} />
      <hr />
      <FilterDay returnData={obj => setFilteredData({day: obj})} />
    </div>
  )
}