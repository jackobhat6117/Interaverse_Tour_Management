import Logo from "../../../../components/Logo/Logo";
import { getPassengerCategory } from "../../../../utils/getPassengerCategory";
import FlightInfo from "./FlightInfo";
import PassengerInfo from "./PassengerInfo";
import PriceSummary from "./PriceSummary";

export default function FlightDoc({data}) {
    return (
      <div className='flex flex-col gap-10 p-0 card' id='flightDoc'>
        <div className='flex flex-col gap-10 p-5'>
          <div className='flex justify-between gap-4'>
            <Logo />
            <div>
              Booking Reference
              <div className='text-theme1'>{data?.booking?.bookingId}</div>
            </div>
          </div>
    
          <div className='flex gap-4 flex-col'>
            <h5>Flight Details</h5>
            <div className='border border-primary/50 p-4'>
              <FlightInfo data={data} />
            </div>
          </div>
        </div>
  
        <div className='flex gap-4 flex-col p-5'>
          <h5>Passengers</h5>
          <div className="py-4">
              {data?.orderDetail?.travelers &&
                Array.isArray(data?.orderDetail?.travelers) &&
                data?.orderDetail?.travelers?.map((traveler) => (
                  <PassengerInfo
                    label={getPassengerCategory(traveler.dateOfBirth)}
                    traveler={traveler}
                    order={data}
                  />
                ))}
              {/* <PassengerInfo label={"Adult"} />
              <PassengerInfo label={"Child"} /> */}
            </div>
            <PriceSummary data={data} />

          {/* <div className='border border-primary/50 p-4'>
            <PassengerInfo />
          </div> */}
        </div>
  
        {/* <div className='flex gap-4 flex-col'>
          <h5>Ticket numbers</h5>
          <div className='border border-primary/50 p-4 flex flex-col gap-4'>
            <span>Daniel Atelly: 1</span>
          </div>
        </div> */}
        
      </div>
    )
  }
  