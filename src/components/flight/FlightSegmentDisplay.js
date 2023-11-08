import { useEffect, useState } from "react";
import SkullLoad from "../DIsplay/SkullLoad";
import FlightInfoCard from "./FlightInfoCard";

export default function FlightSegmentDisplay({data: og}) {
  const [data,setData] = useState();
  useEffect(() => {
    setTimeout(() => setData(og),3000)
  },[og])
  const [viewMore,setViewMore] = useState(false);
  return (
    <div className='border rounded-md cursor-pointer shad-hover'>
      <div className={`flex gap-4 p-4 shadow-primary ${viewMore?'bg-theme1/10':''}`} onClick={() => setViewMore(!viewMore)}>
        <div>
          <div className='w-10 h-10 relative'>
            <SkullLoad value={data?.flights[0]?.carrierIcon} render={(val) => 
              <img src={data?.flights[0]?.carrierIcon} alt='Airline' />
            } className='!w-10 !h-10' variant='rectangular' />
          </div>
        </div>
        <div className='flex-1 flex gap-4 justify-between items-center'>
          <div className='flex flex-col gap-2'>
            <div>
              <h5>
                <SkullLoad value={data?.departureLocation} label={'From'} /> - <SkullLoad value={data?.arrivalLocation} label='To' />
              </h5>
              <p><SkullLoad value={data?.flights[0]?.departureAirportName} label='Airline' /></p>
            </div>
            <p>{data?.numberOfStops?data?.numberOfStops+'stopover':''} </p>
          </div>

          <div>
            <h5><SkullLoad value={data?.duration} label={'Duration'} /></h5>
            <p>{data?.duration?'Change':''}</p>
          </div>
        </div>
      </div>
      <div className={`h-0 overflow-hidden transition-all  ${viewMore?'max-h-auto min-h-full h-auto p-4':''}`}>
        <FlightInfoCard data={data} />
      </div>
    </div>
  )
}