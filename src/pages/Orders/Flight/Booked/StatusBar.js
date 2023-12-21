import { useState } from "react";
import Modal1 from "../../../../components/DIsplay/Modal/Modal1";
import AddFlightBaggage from "../../../../components/flight/Baggage";
import CancelFlightOrder from "../../../../components/flight/CancelFlightOrder";
import PolicyStatus from "../../../../components/flight/PolicyStatus";
import AddFlightSeats from "../../../../components/flight/Seats";
import Button1 from "../../../../components/form/Button1";
import { alertType } from "../../../../data/constants";
import airline from '../../../../assets/images/airline.svg'


export default function StatusBar({data}) {
    const [openBaggage,setOpenBaggage] = useState(false);
    const [openSeats,setOpenSeats] = useState(false);
    const [cancelBooking,setCancelBooking] = useState(false);
  
  
    return (
      <div className='border rounded-md p-4 flex flex-col gap-6 max-w-[400px]'>
        <div className='flex flex-col gap-2'>
          <p>Order Id</p>
          <b>M484494</b>
        </div>
  
        <div className='flex flex-col gap-2'>
          <p>Status</p>
          <div>
            <button className={`btn ${alertType['success']}`}>Payment Confirmed</button>
          </div>
        </div>
  
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between gap-4'>
            <p>Airline</p>
            <p>Date</p>
          </div>
          <div className='flex justify-between gap-4'>
            <div className='flex gap-2 '>
              <img src={airline} alt='' className='w-4 h-4' />
              <b>Turkish Airline</b>
            </div>
            <b>01/01/2024</b>
          </div>
        </div>
  
        <PolicyStatus title='Order Change Policy' value={false} text='This order is not changable' />
        <PolicyStatus title='Order Refund Policy' value={true} text='This order is refundable up until the initial departure date' />
  
        {!data?.needsReview ? 
          <div className='flex flex-col gap-5'>
            <Button1 variant='outlined' className='!border-primary !text-primary'
              onClick={() => setOpenBaggage(true)}
            >Add extra baggage</Button1>
            <Button1 variant='outlined' className='!border-primary !text-primary'
              onClick={() => setOpenSeats(true)}
            >Seat selection</Button1>
            <Button1 variant='outlined' className='!border-primary !text-primary'
              onClick={() => setCancelBooking(true)}
            >Cancel booking</Button1>
            <Button1>Issue ticket</Button1>
          </div>
        :
          <div className='flex flex-col gap-5'>
            <Button1 variant='outlined' className='!border-primary !text-primary'
              onClick={() => setOpenBaggage(true)}
            >Request Cancellation</Button1>
            <Button1 variant='outlined' className='!border-primary !text-primary'
              onClick={() => setOpenSeats(true)}
            >Request Change</Button1>
            <Button1>Accept Changes</Button1>
          </div>
        }
        
        <Modal1 open={openBaggage} setOpen={setOpenBaggage}>
          <div className='card p-10 flex flex-col gap-4'>
            <b>Add Bag</b>
            <AddFlightBaggage data={{}} cancel={() => setOpenBaggage(false)} />
          </div>
        </Modal1>
        <Modal1 open={openSeats} setOpen={setOpenSeats}>
          <div className='card p-10 flex flex-col gap-4'>
            <b>Add Seat</b>
            <AddFlightSeats data={{}} cancel={() => setOpenSeats(false)} />
          </div>
        </Modal1>
        <Modal1 open={cancelBooking} setOpen={setCancelBooking}>
          <div className='card p-10 flex flex-col gap-4'>
            <CancelFlightOrder data={{}} cancel={() => setCancelBooking(false)} />
          </div>
        </Modal1>
      </div>
    )
  }
  