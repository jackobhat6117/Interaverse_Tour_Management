import Logo from "../../../../components/Logo/Logo";
import FlightInfo from "./FlightInfo";
import PassengerInfo from "./PassengerInfo";

export default function FlightDoc() {
    return (
      <div className='flex flex-col gap-10 p-5 card' id='flightDoc'>
        <div className='flex justify-between gap-4'>
          <Logo />
          <div>
            Booking Reference
            <div className='text-theme1'>72JRR3</div>
          </div>
        </div>
  
        <div className='flex gap-4 flex-col'>
          <h5>Flight Details</h5>
          <div className='border border-primary/50 p-4'>
            <FlightInfo />
          </div>
        </div>
  
        <div className='flex gap-4 flex-col'>
          <h5>Passengers</h5>
          <div className='border border-primary/50 p-4'>
            <PassengerInfo />
          </div>
        </div>
  
        <div className='flex gap-4 flex-col'>
          <h5>Ticket numbers</h5>
          <div className='border border-primary/50 p-4 flex flex-col gap-4'>
            <span>Daniel Atelly: 1</span>
          </div>
        </div>
        
      </div>
    )
  }
  