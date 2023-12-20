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
import RadioGroup from '../../../../components/form/RadioGroup'
import EmailInput from '../../../../components/form/EmailInput'
import { clone } from '../../../../features/utils/objClone'
import Logo from '../../../../components/Logo/Logo'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


export default function FlightOrder() {
  let obj = {
    needsReview: true,
    orderId: 'F34FJJ6'
  }
  const [onChangedData,setOnChangedData] = useState(true);
  const [openExport,setOpenExport] = useState(false);
  const [openEmailExport,setOpenEmailExport] = useState(false);
  const [openPDFExport,setOpenPDFExport] = useState(false);
  
  const [selectedOption,setSelectedOption] = useState();


  function handleOption() {
    if(selectedOption === 'email')
      setOpenEmailExport(true);
    else if(selectedOption === 'pdf') {
      setOpenPDFExport(true);
      setTimeout(() => handlePDFExport(),2000);
    }

    setOpenExport(false);
  }

  function handlePDFExport() {
    // Get the component element
    const component = document.getElementById('flightDoc');

    // Capture screenshot using html2canvas
    html2canvas(component).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Create a new jsPDF instance
      const pdf = new jsPDF();

      // Calculate the width and height of the PDF document
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add the screenshot image to the PDF document
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Download the PDF
      pdf.save(obj?.orderId+'.pdf');
    });
  }

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
                <Button1 variant={'outlined'} className=''
                  onClick={() => setOpenExport(true)}
                >Export itinerary</Button1>
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
          {obj?.needsReview ? 
            <div className='flex flex-col gap-4'>
              <div className='flex gap-4 items-center'>
                <div className='flex flex-1 justify-start gap-2 '>
                  <div className=''>
                    <button className={`${onChangedData ? '!btn':'btn-light'}`}
                      onClick={() => setOnChangedData(true)}
                    >New Details</button>
                  </div>
                  <div className=''>
                    <button className={`${!onChangedData ? '!btn':'btn-light'}`}
                      onClick={() => setOnChangedData(false)}
                    >Previous Details</button>
                  </div>
                </div>
                <button className='warn text-sm px-4 font-normal'>Changes detected</button>
              </div>
              <hr />
            </div>
          :null}

          <FlightInfo />
          <div className='py-4'>
            <PassengerInfo label={'Adult'} />
            <PassengerInfo label={'Child'} />
          </div>
          <PriceSummary />
          <ShareViaEmail />

        </div>

        
        <div>
          <StatusBar data={obj} />
        </div>
      </div>

      <Modal1 open={openEmailExport} setOpen={setOpenEmailExport}>
        <EmailExport />
      </Modal1>

      <Modal1 open={openExport} setOpen={setOpenExport}>
        <div className='card p-10 flex flex-col gap-4'>
          <h5 className='self-center'>Export Order</h5>
          <RadioGroup options={[
            {title: 'Export to Email',description: 'Select the option to export the order via email',value: 'email'},
            {title: 'Export as PDF',description: 'Select the option to export the order via PDF',value: 'pdf'},
          ]} className='flex flex-col gap-4' radioClass='!items-start' render={(obj) => (
            <div className='flex flex-col '>
              <b>{obj.title}</b>
              <p>{obj.description}</p>
            </div>
          )} 
            value={selectedOption}
            onChange={(val) => setSelectedOption(val)}
          />

          <Button1 onClick={handleOption}>Confirm</Button1>
        </div>
      </Modal1>

      <Modal1 open={openPDFExport} setOpen={setOpenPDFExport}>
        <FlightDoc />
      </Modal1>
    </div>
  )
}

function FlightDoc() {
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

function EmailExport() {
  const [data,setData] = useState([{email: ''}])

  function handleChange(val,i) {
    let modData = clone(data);
    modData[i] = {email: val};

    setData(modData)
  }

  function addEmail() {
    setData([...data,{email: ''}])
  }

  async function handleSubmit() {
    // request
  }
  return (
    <div className='card p-10 flex flex-col gap-4'>
      <h5 className='self-center'>Email Export</h5>
      <p>
        Enter the email below where you would like to send the file to
      </p>
      <div className='flex flex-col gap-2'>
        {data?.map((obj,i) => (
          <EmailInput key={i} label='' placeholder='username@gmail.com' 
          value={obj.email}
          onChange={(ev) => handleChange(ev.target.value,i)}
          />
        ))}
      </div>
      <div className='py-4 flex gap-4 justify-between items-center'>
        <button className='flex gap-2'
          onClick={addEmail}
        >
          <Icon icon='ic:round-add-circle' className='text-theme1' />
          Add another email address
        </button>
        <div>
          <Button1 onClick={handleSubmit}>Confirm</Button1>
        </div>
      </div>
    </div>
  )
}

function StatusBar({data}) {
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
    <div className='flex flex-col gap-2 py-4'>
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