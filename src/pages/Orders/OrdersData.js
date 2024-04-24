import React, { createContext, useEffect, useState } from "react";
import TableFilter from "../../components/Table/TableFilter";
import CreateOrder from "./CreateOrder";
import Button1 from "../../components/form/Button1";
import SelectInput from "../../components/form/SelectInput";
import { MenuItem } from "@mui/material";
import CalendarInput1 from "../../components/form/CalendarInput1";
import CustomTable from "../../components/Table/CustomTable";
import { alertType } from "../../data/constants";
import CustomMenu from "../../components/utils/CustomMenu";
import { Icon } from "@iconify/react";
import AddBags from "./AddBags";
import AddSeats from "./AddSeats";
import CancelOrder from "./cancelOrder";
import { formatMoney } from "../../features/utils/formatMoney";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { def } from "../../config";
import PaymentMethod from "../../components/flight/PaymentMethod";
import Modal1 from "../../components/DIsplay/Modal/Modal1";
import moment from "moment";
import { clone } from "../../features/utils/objClone";
import { generateReport } from "../../utils/generateReport";
import IssueTicket from "./IssueTicket";
import CancelTicket from "./CancelTicket";
import { getTestLevel } from "../../utils/testLevel";
import { getSupplierName } from "../../data/flight/supplier/getSupplierName";
import ApproveTicket from "./ApproveTicket";


const ActionContext = createContext();

export const Menu = (props) => {
  const { render, className, label, value, showFor, hideFor, ...extraProps } = props;
  const ShowerClass = showFor?.find(val => val?.toLowerCase() === (value?.toLowerCase() || value))
    ? ""
    : !showFor
    ? ""
    : "!hidden";
  const hiderClass = !hideFor?.find(val => val?.toLowerCase() === (value?.toLowerCase() || value))
    ? ""
    : !hideFor
    ? ""
    : "!hidden";

  return (
    <MenuItem
      className={`${className} ${ShowerClass} ${hiderClass}`}
      value={value}
      {...extraProps}
    >
      {render ? render(label || value) : 
        label || value
      }
    </MenuItem>
  );
};

export function OrderMenus({callback,data:{status,id,bookingID,orderType,row},actions,inDetail}) {
  const {addBags,addSeats,addInsurance,issueTicket,approveTicket,cancelOrder,pay,cancelTicket} = actions || {}
  const navigate = useNavigate();
  const devStage = getTestLevel(def?.devStatus);
  
  // 'booked': 'Not Paid',
  // 'issuable': 'Paid',
  // 'issued': 'Completed'

  return (
    <div>
      <div className="menuItem " onClick={() => callback && callback()}>
        {!inDetail?
          <Menu
            value={status}
            label="View Order"
            onClick={() =>
              navigate(`/order/${orderType}/${id}`)
            }
          />
        :null}
        { devStage < 3 ?
          <Menu
            value={status}
            label="Make Payment"
            showFor={["Not Paid","booked"]}
            onClick={() => pay && pay(bookingID)}
            />
          :null
        }
        <Menu
          value={status}
          label="Approve Ticket"
          // showFor={["pendingticketissueapproval","pendingticketissue","Ticket Requested"]}
          // className="!btn disabled"
          onClick={() => approveTicket && approveTicket()}
        />
        {devStage < 1 ?
          <Menu
            value={status}
            label="Cancel Ticket"
            showFor={["Completed","issued"]}
            onClick={() => cancelTicket && cancelTicket()}
          />
        :null}
        { devStage < 1 ?
          <Menu
            value={status}
            label="Add Seats"
            showFor={["Not Paid","booked"]}
            onClick={() => navigate('/order/flight/change/'+id+'?property=seat')}
            // onClick={() => addSeats && addSeats(row)}
          />
        :null}
        { devStage < 1 ?
          <Menu
            value={status}
            label="Add Bags"
            showFor={["Not Paid","booked"]}
            onClick={() => navigate('/order/flight/change/'+id+'?property=bags')}
            // onClick={() => addBags && addBags(id)}
          />
        :null}
        {devStage < 1 ? 
          <Menu
            value={status}
            label="Add Insurance"
            hideFor={["Completed","issued",'Expired']}
            // onClick={() => addInsurance && addInsurance(id)}
            onClick={() => navigate('/order/flight/change/'+id+'?property=insurance')}
          />
        :null}

        {/* <Menu
          value={status}
          label="Confirm Payment"
          showFor={["bending", "on hold"]}
        /> */}
        {/* <Menu value={status} label="Edit PNR" showFor={["booked"]} /> */}
        {/* <Menu value={status} label="Hold Order" hideFor={["Booked"]} /> */}
        <Menu
          value={status}
          label="Cancel Order"
          showFor={['Not Paid','booked']}
          className="!bg-red-500 !text-white !rounded-md"
          onClick={() => cancelOrder && cancelOrder()}
          />
        <Menu label='' className='min-w-[150px]' />
      </div>
    </div>

  )
}

export function flightStatusMap(status) {
  // Pending = "Pending",
  // Paid = "Paid",
  // Failed = "Failed",
  // Booked = "Booked",
  // Issued = "Issued",
  // PendingTicketIssueApproval = "PendingTicketIssueApproval",
  // TicketIssueDenied = "TicketIssueDenied",
  // PendingTicketIssue = "PendingTicketIssue",
  // Expired = "Expired",
  // AutoCanceled = "AutoCanceled",
  // Canceled = "Canceled",
  // TicketCanceled = "TicketCanceled",
  // Refunded = "Refunded",
  // TicketCancelationRequested = "TicketCancelationRequested",

  let map = {
    'booked': 'Not Paid',
    'issuable': 'Paid',
    'pendingticketissueapproval': 'Ticket Requested',
    'ticketissuedenied': 'Denied',
    'pendingticketissue': 'Ticket Requested',
    'issued': 'Completed',
    'autocanceled': 'Expired',
    'canceled': 'Canceled',
    'TicketCanceled': 'Ticket Canceled',
    'TicketCancelationRequested': 'Cancelation Requested'
  }

  try {
    return map[status?.toLowerCase()] || status
  } catch(ex) {return status}
}
function StatusCol({ params }) {
  const status = params.value || "";
  
  const orderType = params?.row?.type?.toLowerCase() || "type";
  const bookingID = params?.row?.flightObj?._id;
  
  return (
    <div className="flex justify-between items-center gap-2 w-full">
      <span className={`${alertType[status]} overflow-hidden text-ellipsis`} title={status}>{status}</span>
      <div className="sticky right-0 ">
        <CustomMenu
          element={
            <label className="block p-2 px-4 cursor-pointer">
              <Icon icon={"pepicons-pop:dots-y"} />
            </label>
          }
        >
          <ActionContext.Consumer>
            {(value) => {
              const {bags,seats,cancel,payment,issueTicket,approveTicket,cancelTicket} = value || {}
              return (
                <OrderMenus data={{row: params.row,id: params.id,bookingID,status,orderType}} actions={{
                  addBags: bags?.open,
                  addSeats: seats?.open,
                  cancelOrder: () => cancel?.open(params.row?.flightObj._id),
                  pay: payment?.open,
                  issueTicket: () => issueTicket(params.row?.flightObj),
                  approveTicket: () => approveTicket(params.row?.flightObj),
                  cancelTicket: () => cancelTicket(params.row?.flightObj),
                }} />
              )
            }}
          </ActionContext.Consumer>
        </CustomMenu>
      </div>
    </div>
  );
}

export default function OrdersData({ data: gotData, setData: setOrig, reload }) {
  const tempObj = {
    date: "22, Jan",
    name: "John Doe",
    provider: "gb Travels",
    type: ["Flight", "Tour", "Stay"][parseInt(Math.random() * 3)],
    amount: 234900,
    commission: "4900",
    updatedDate: "5:30, 24/24/24",
    bookRef: parseInt(Math.random() * 99999),
    status: ["confirmed", "pending", "on hold", "cancelled", "expired"][
      parseInt(Math.random() * 5)
    ],
  };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('status');

  const [data, setData] = useState(gotData || []);

  const [openAddBags, setOpenAddBags] = useState(false);
  const [openAddSeats, setOpenAddSeats] = useState(false);
  const [openCancelOrder, setOpenCancelOrder] = useState(false);
  const [openPayment,setOpenPayment] = useState(false);
  const [openIssueTicket,setOpenIssueTicket] = useState(false);
  const [openApproveTicket,setOpenApproveTicket] = useState(false);
  const [openCancelTicket,setOpenCancelTicket] = useState(false);

  let countObj = {
    all: gotData?.length,
    flights: 0,
    tours: 0,
    stays: 0,
  };
  gotData?.filter((obj) => {
    let type = obj?.type?.toLowerCase();
    if (type === "flight") countObj.flights++;
    else if (type === "tour") countObj.tours++;
    else if (type === "stay") countObj.stays++;

    return true;
  });

  const [filter, setFilter] = useState("ALL");
  const [timeFilter, setTimeFilter] = useState({range: "all",date: moment().toString()});

  useEffect(() => {
    if ((!filter || filter === "ALL") && !status) return setData(gotData);

    setData(
      gotData?.filter(
        (obj) => {
          let pass = false;

          if(!filter || (filter === 'ALL'))
            pass = true;
          else
            pass = obj.type?.toLowerCase() === filter?.toLowerCase();

          if(status === 'needsReview') {
            pass = obj?.flightObj?.needsReview
          } else if(status === 'onHold')
            pass = obj?.flightObj?.isHeldBooking

          return pass;
        }
      ),
    );
    //eslint-disable-next-line
  }, [filter, status, gotData]);

  useEffect(() => {
    setData(filterWithTime(gotData,timeFilter))
  },[timeFilter,gotData])


  const filterOptions = [
    { label: "All", value: "ALL", count: countObj.all },
    { label: "Flights", value: "FLIGHT", count: countObj.flights },
    { label: "Stays", value: "Stay", count: countObj.stays, disabled: !def.devTest },
    { label: "Tours", value: "Tour", count: countObj.tours, disabled: !def.devTest },
  ];

  const columns = [
    // { field: "date", headerName: "Created Date" },
    { field: "bookingId", headerName: "ID" },
    { field: "name", headerName: "Name" },
    {
      field: "provider",
      headerName: "Provider",
      renderCell: (params) => {
        let type = params.row?.type?.toLowerCase();
        return (
          <div className="flex flex-col ">
            {getSupplierName(params.value)}
            <small className={`text-xs px-2 p-1 rounded-md ${type}`}>
              {params.row?.type}
            </small>
          </div>
        );
      },
    },
    // { field: "updatedDate", headerName: "Activity Date" },
    {
      field: "amount",
      headerName: "Amount",
      renderCell: (params) => (
        <div>{formatMoney(params.value, params.row?.currency)}</div>
      ),
    },
    { field: "commission", headerName: "Commission" },
    { field: "bookRef", headerName: "PNR" },
    {
      field: "status",
      headerName: "Status",
      minWidth: 160,
      renderCell: (params) => (
        <StatusCol params={params} />
      ),
    },
  ];

  const filterWithTime = (data, filter) => {
    const { range, date } = filter;
    if(range === 'all')
      return data;
    
    const filteredData = data.filter(item => {
      const itemDate = moment(item.updatedAt);
  
      const startDate = moment(date).subtract(1, range);
      const endDate = moment(date);

      // console.log(startDate.format('YYYY-MM-DD'),itemDate?.format('YYYY-MM-DD'),endDate.format('YYYY-MM-DD'))
      
      return itemDate.isBetween(startDate, endDate, null, '[]');
    });
  
    return filteredData;
  };
  
  function handleExport() {
    generateReport(data,columns,(fieldName,value) => {
      if(fieldName === 'amount' || fieldName === 'commission')
        return formatMoney(value);
      
      return value;
    })
  }

  return (
    <div className="pd-md flex-1 flex flex-col gap-1">
      <div className="flex gap-4 justify-between flex-wrap items-center">
        <h5>Orders</h5>
        {/* <div className='flex gap-4 flex-wrap items-center justify-between md:justify-start flex-1 max-w-full'> */}
        <div className="order-3 md:order-2 max-w-full">
          <TableFilter
            options={filterOptions?.filter(obj => !obj.disabled)}
            value={filter}
            onChange={(val) => setFilter(val)}
          />
        </div>
        <div className="order-2 md:order-3 flex gap-2">
          {getTestLevel() <= getTestLevel('dev') ? 
            <button className="btn-theme-light !bg-primary/10 rounded-md">
              Queue
            </button>
          :null}
          <CreateOrder
            label="Create new order"
            handleReturn={() => setData([...data, tempObj])}
          />
        </div>
        {/* </div> */}
      </div>
      <hr />
      <div className="flex gap-4 justify-between items-center flex-wrap">
        {/* <div className="flex gap-2 btn-theme-light">
          + <span>Filter</span>
        </div> */}
        <div className="flex gap-2">
          {
            getTestLevel() <= getTestLevel('dev') ? 
              <Link to={status === 'needsReview' ? '?status=null' : '?status=needsReview'} className={status === 'needsReview' ? 'btn' : "btn-theme-light"}>Needs review</Link>
            :null
          }
          {
            getTestLevel() <= getTestLevel('dev') ? 
              <Link to={status === 'onHold' ? '?status=null' : '?status=onHold'} className={status === 'onHold' ? 'btn' : "btn-theme-light"}>On hold</Link>
            :null
          }
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <Button1 variant="text" className="capitalize !w-auto" onClick={handleExport}>
            Export
          </Button1>
          <div className="flex gap-2 items-center light-bg rounded-md p-2">
            <SelectInput defaultValue="Weekly" size="small" label=""
              value={timeFilter?.range}
              onChange={(ev) => setTimeFilter({...timeFilter,range: ev.target.value})}
            >
              <MenuItem value='hour'>Hourly</MenuItem>
              <MenuItem value='day'>Daily</MenuItem>
              <MenuItem value='week'>Weekly</MenuItem>
              <MenuItem value='month'>Monthly</MenuItem>
              <MenuItem value='year'>Yearly</MenuItem>
              <MenuItem value='all'>All</MenuItem>
            </SelectInput>
            <CalendarInput1 value={timeFilter?.date} onChange={(obj) => setTimeFilter({...timeFilter,date: obj?.start})} />
          </div>
        </div>
      </div>
      <hr />
      <ActionContext.Provider
        value={{
          bags: {
            openAddBags,
            setOpenAddBags,
            open: (val) => setOpenAddBags(val),
          },
          seats: {
            openAddSeats,
            setOpenAddSeats,
            open: (val) => setOpenAddSeats(val),
          },
          cancel: {
            openCancelOrder,
            setOpenCancelOrder,
            open: (val) => setOpenCancelOrder(val),
          },
          payment: {
            open: (val) => setOpenPayment(val)
          },
          issueTicket: setOpenIssueTicket,
          approveTicket: setOpenApproveTicket,
          cancelTicket: setOpenCancelTicket,
        }}
      >
        {/* {status === 'needsReview' ? 
          <OrderDataChanges data={data} />
          :
        } */}
      <CustomTable rows={data} columns={columns} />
      </ActionContext.Provider>

      <AddBags open={openAddBags} setOpen={setOpenAddBags} />
      <AddSeats open={openAddSeats} setOpen={setOpenAddSeats} />
      <CancelOrder open={openCancelOrder} setOpen={setOpenCancelOrder} callback={() => {reload();setOpenCancelOrder(false)}} />
      <Modal1 open={openPayment} setOpen={setOpenPayment}>
        <PaymentMethod callback={() => {reload();setOpenPayment(false)}} flightBookingId={openPayment} hide={['booklater']} expand />
      </Modal1>
      <Modal1 open={openApproveTicket} setOpen={setOpenApproveTicket}>
        <ApproveTicket
          data={openApproveTicket}
          callback={() => {reload();setOpenApproveTicket(false)}}
          close={() => setOpenApproveTicket(false)} />
      </Modal1>
      <Modal1 open={openIssueTicket} setOpen={setOpenIssueTicket}>
        <IssueTicket
          data={openIssueTicket}
          callback={() => {reload();setOpenIssueTicket(false)}}
          close={() => setOpenIssueTicket(false)} />
      </Modal1>
      <Modal1 open={openCancelTicket} setOpen={setOpenCancelTicket}>
        <CancelTicket
          data={openCancelTicket}
          callback={() => {reload();setOpenCancelTicket(false)}}
          close={() => setOpenCancelTicket(false)} />
      </Modal1>
    </div>
  );
}
