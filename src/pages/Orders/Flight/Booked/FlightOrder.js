import React, { useState } from 'react'
import BreadCrumb from '../../../../components/DIsplay/Nav/BreadCrumb'
import { Link } from 'react-router-dom'
import Button1 from '../../../../components/form/Button1'
import TextInput from '../../../../components/form/TextInput'
import { Menu } from '../../OrdersData'
import airline from '../../../../assets/images/airline.svg'
import Icon from '../../../../components/HOC/Icon'
import { formatMoney } from '../../../../features/utils/formatMoney'
import { def } from '../../../../config'
import PolicyStatus from '../../../../components/flight/PolicyStatus'
import { alertType } from '../../../../data/constants'
import Modal1 from '../../../../components/DIsplay/Modal/Modal1'
import AddFlightBaggage from '../../../../components/flight/Baggage'
import AddFlightSeats from '../../../../components/flight/Seats'
import CancelFlightOrder from '../../../../components/flight/CancelFlightOrder'


export default function FlightOrder() {
  return (
    <div className='flex flex-col gap-4 pd-md py-4'>
      <BreadCrumb>
        <Link to='/order' >Orders</Link>
        <label>Confirmation</label>
      </BreadCrumb>

      <div className='flex gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <div className='flex gap-4 items-center'>
            <h5>Flight details</h5>

            <div className='flex flex-1 gap-3 justify-end flex-wrap'>
              <div>
                <Button1 variant={'outlined'} className=''>Export itinerary</Button1>
              </div>
              <div >
                <TextInput select size='small' label='Manage this order' noShrink className='!min-w-[180px] bg-primary/10'>
                  <div className='menuItem'>
                    <Menu value={'pending'} label='Add Seats' hideFor={['confirmed']} />
                    <Menu value={'pending'} label='Add Bags' hideFor={['confirmed']} />
                    <Menu value={'pending'} label='Confirm Payment' showFor={['pending','on hold']} />
                    <Menu value={'pending'} label='Edit PNR' hideFor={['confirmed']} />
                    <Menu value={'pending'} label='Hold Order' hideFor={['confirmed']} />
                    <Menu value={'pending'} label='Cancel Order' className='!bg-red-500 !text-white !rounded-md' />
                  </div>
                </TextInput>
              </div>
            </div>
          </div>
          
          <hr />

          <FlightInfo />
          <PassengerInfo label={'Adult'} />
          <PassengerInfo label={'Child'} />
          <PriceSummary />
          <ShareViaEmail />

        </div>

        
        <div>
          <StatusBar />
        </div>
      </div>
    </div>
  )
}

function StatusBar() {
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

function ShareViaEmail() {
  return (
    <div className='py-10'>
      <Button1 variant='outlined' className='!border-primary !text-primary !font-bold flex gap-3 !py-5'>
        <Icon icon='ic:email' />
        Share Via Email
      </Button1>
    </div>
  )
}

function PriceSummary() {
  let data = {
    passengers: {
      adult: {
        totalAmount: 0,
        totalAmountWithoutTax: 0,
        taxes: 0
      }
    },
    totalAmount: 0
  }
  return (
    <div className='border p-4 flex flex-col gap-6 md:min-w-[400px]'>
      <div className='flex justify-between gap-4'>
        <h5>Price Summary</h5>
        <p className='text-xs'>Sold by Turkish Airline</p>
      </div>
      <hr />
      {Object.entries(data?.passengers || {})?.map(([key,obj],i) => 
        <div className=' flex flex-col '>
          <div className='flex gap-4 justify-between font-bold'>
            <div>Traveler {i+1}: {key}</div>
            <div>{formatMoney(obj.totalAmount)}</div>
          </div>
          <div className='flex gap-4 justify-between'>
            <div>Flight:</div>
            <div>{formatMoney(obj.totalAmountWithoutTax)}</div>
          </div>
          <div className='flex gap-4 justify-between'>
            <div>Checked Luggage:</div>
            <div>{formatMoney(obj.totalAmountWithoutTax)}</div>
          </div>
          <div className='flex gap-4 justify-between'>
            <div>Seat Selection:</div>
            <div>{formatMoney(obj.totalAmountWithoutTax)}</div>
          </div>
          <div className='flex gap-4 justify-between'>
            <div>Taxes and fees:</div>
            <div>{formatMoney(obj.taxes)}</div>
          </div>
        </div>
      )}
      <hr />
      <div className='flex gap-4 justify-between'>
        <h5>Trip Total ({def.currencyCode}):</h5>
        <h5>{formatMoney(data?.totalAmount)}</h5>
      </div>
    </div>

  )
}

function PassengerInfo({label}) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-6 flex-wrap'>
        <div>
          <Button1 className='flex gap-2'>
            <Icon icon='ic:person' />
            1 {label}
          </Button1>
        </div>
        <table className='w-[500px]'>
          <thead>
            <td>Name</td>
            <td>Date of birth</td>
            <td>Gender</td>
          </thead>
          <tbody>
            <td>Ike Chinedu</td>
            <td>17/10/1956</td>
            <td>Male</td>
          </tbody>
        </table>
      </div>
      <div>
        <FlightInfo minify />
      </div>
    </div>
  )
}

function FlightInfo({minify}) {
  let obj = {
    from: 'Lagos',
    to: 'London',
    origin: 'LOS',
    destination: 'LHR',
    airline: 'Turkish Airline',
    airlineIcon: airline,
    departureDate: 'Sat, 08 April 2023',
    departureTime: '11:50pm',
    ArrivalDate: 'Sat, 08 April 2023',
    arrivalTime: '9:20pm',
    airport: 'Murtala Mohammed International Airport',
    duration: '12 hours 14 mins',
    stops: 2,
  }
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4 items-center'>
        <div className='flex flex-col gap-2 items-center'>
          <img src={obj.airlineIcon} alt='' className='w-16 h-16'/>
          <small className='font-bold'>{obj.airline}</small>
        </div>
        <div className='flex flex-1 justify-start items-center gap-4'>
          <h5>{obj.from}</h5>
          <hr className='w-[50px] border-primary/50' />
          <h5>{obj.to}</h5>
        </div>
        <div>
          {obj?.departureTime} - {obj?.arrivalTime} &nbsp;
          <span className='text-theme1'>
            ({obj?.duration}, {obj?.stops || 0} stops)
          </span>
          <div>
            {obj?.origin} - {obj?.destination}
          </div>
        </div>
      </div>
      
      {!minify ? 
        <div className='flex flex-col gap-0'>
          <div className='flex gap-4 items-center z-10'>
            <span className='w-3 h-3 rounded-full bg-theme1'></span>
            <b>{obj?.departureDate}</b>
            <p>Departing from {obj?.airport}</p>
          </div>
          <div className='flex gap-4 items-center h-14 -my-2'>
            <div className='vr translate-x-[4.5px] w-3 h-full'></div>
            <p className='text-xs'>Flight duration {obj?.duration}</p>
          </div>
          <div className='flex gap-4 items-center z-10'>
            <span className='w-3 h-3 rounded-full bg-theme1'></span>
            <b>{obj?.ArrivalDate}</b>
            <p>Arriving at {obj?.airport}</p>
          </div>
        </div>
      :null}

      <div className='flex justify-between items-center gap-4 flex-wrap'>
        <div className='flex gap-6 text-primary/50'>
          <span>Economy</span>
          <span>{obj?.airline}</span>
          <span>Boeing 777-300</span>
          <span>ZZ71234</span>
        </div>

        <div className='bg-primary/10 rounded-md p-4 flex gap-4 text-theme1'>
          <Icon icon='el:plane' className='!w-4 !h-4' />
          <Icon icon='streamline:wifi-solid' className='!w-4 !h-4' />
          <Icon icon='ion:stopwatch' className='!w-4 !h-4' />
          <Icon icon='ion:fast-food' className='!w-4 !h-4' />
          <Icon icon='ic:round-airline-seat-recline-normal' className='!w-4 !h-4' />
        </div>
      </div>
    </div>
  )
}