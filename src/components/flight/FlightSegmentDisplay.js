import { useEffect, useState } from "react";
import SkullLoad from "../DIsplay/SkullLoad";
import FlightInfoCard from "./FlightInfoCard";
import moment from "moment";
import getFlightDuration, { getFlightDurationFromList } from "../../features/flight/getFlightDuration";

function sumDurations(durations) {
  const totalDuration = moment.duration();

  durations.forEach(duration => {
    const parts = duration.split(' ');

    let durationMoment = moment.duration();

    parts.forEach(part => {
      if (part?.toLowerCase()?.includes('d') || part?.toLowerCase()?.includes('day')) {
        const days = parseInt(part);
        durationMoment.add(days, 'days');
      } else if (part?.toLowerCase()?.includes('h')) {
        const hours = parseInt(part);
        durationMoment.add(hours, 'hours');
      } else if (part?.toLowerCase()?.includes('m')) {
        const minutes = parseInt(part);
        durationMoment.add(minutes, 'minutes');
      }
    });

    totalDuration.add(durationMoment);
  });

  const formattedDuration = formatDuration(totalDuration);

  return formattedDuration;
}

function formatDuration(duration) {
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();

  let formatted = '';

  if (days > 0) {
    formatted += `${days}d `;
  }
  if (hours > 0) {
    formatted += `${hours}h `;
  }
  if (minutes > 0) {
    formatted += `${minutes}m`;
  }

  return formatted.trim();
}
export default function FlightSegmentDisplay({changeRoute,data: og}) {
  const [data,setData] = useState(og);
  useEffect(() => {
    setTimeout(() => setData(og),2000)
  },[og])
  const [viewMore,setViewMore] = useState(false);
  
  const durations = data?.flights?.map((flight) => [(`${flight?.departureDate} ${flight?.departureTime}`),(`${flight?.arrivalDate} ${flight?.arrivalTime}`)]);
  console.log(durations?.flat())
  let duration = '' 
  if(durations?.length)
    duration = getFlightDurationFromList(durations?.flat(),'short')


  return (
    <div className='border rounded-md cursor-pointer shad-hover'>
      <div className={`flex gap-4 p-4 shadow-primary ${viewMore?'bg-theme1/10':''}`} onClick={() => setViewMore(!viewMore)}>
        <div>
          <div className='w-10 h-10 relative'>
            <SkullLoad value={data?.flights?.at(0)?.carrierIcon} render={(val) => 
              <img src={data?.flights?.at(0)?.carrierIcon} alt='Airline' />
            } className='!w-10 !h-10' variant='rectangular' />
          </div>
        </div>
        <div className='flex-1 flex flex-wrap gap-4 justify-between items-center'>
          <div className='flex flex-col gap-2 '>
            <div>
              <h5 className="flex gap-3 items-center flex-wrap">
                <SkullLoad value={data?.departureLocation} label={'From'} /> - <SkullLoad value={data?.arrivalLocation} label='To' />
              </h5>
              <p><SkullLoad value={data?.flights?.at(0)?.departureAirportName || data?.flights?.at(0)?.marketingCarrier} label='Airline' /></p>
            </div>
            <p>{data?.numberOfStops || data?.numberOfStops === 0 ? data?.numberOfStops+' stopover':''} </p>
          </div>

          <div className="self-stretch flex flex-col justify-between">
            <h6><SkullLoad value={duration} label={'Duration'} /></h6>
            <button className="text-sm" onClick={changeRoute}>{'Change flight'}</button>
          </div>
        </div>
      </div>
      <div className={`h-0 overflow-hidden transition-all  ${viewMore?'max-h-auto min-h-full h-auto p-4':''}`}>
        <FlightInfoCard data={data} />
      </div>
    </div>
  )
}