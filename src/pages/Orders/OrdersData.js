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


const ActionContext = createContext();

export const Menu = (props) => {
  const { className, label, value, showFor, hideFor, ...extraProps } = props;
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
      {label || value}
    </MenuItem>
  );
};

export function OrderMenus({callback,data:{status,id,bookingID,orderType,row},actions,inDetail}) {
  const {addBags,addSeats,addInsurance,cancelOrder,pay} = actions || {}
  const navigate = useNavigate();
  
  // 'booked': 'Not Paid',
  // 'issuable': 'Paid',
  // 'issued': 'Completed'

  return (
    <div>
      <div className="menuItem" onClick={() => callback && callback()}>
        {!inDetail?
          <Menu
            value={status}
            label="View Order"
            onClick={() =>
              navigate(`/order/${orderType}/${id}`)
            }
          />
        :null}
        <Menu
          value={status}
          label="Make Payment"
          showFor={["Not Paid","booked"]}
          onClick={() => pay && pay(bookingID)}
        />
        <Menu
          value={status}
          label="Issue Ticket"
          showFor={["Paid","issuable"]}
          className="!btn disabled"
        />
        <Menu
          value={status}
          label="Manage Ticket"
          showFor={["Completed","issued"]}
        />
        <Menu
          value={status}
          label="Add Seats"
          showFor={["Not Paid","booked"]}
          onClick={() => navigate('/order/flight/change/'+id+'?property=seat')}
          // onClick={() => addSeats && addSeats(row)}
          />
        <Menu
          value={status}
          label="Add Bags"
          showFor={["Not Paid","booked"]}
          onClick={() => navigate('/order/flight/change/'+id+'?property=bags')}
          // onClick={() => addBags && addBags(id)}
        />
        {def.devTest ? 
          <Menu
            value={"pending"}
            label="Add Insurance"
            hideFor={["Completed","issued"]}
            onClick={() => addInsurance && addInsurance(id)}
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
          showFor={['Paid','issuable']}
          className="!bg-red-500 !text-white !rounded-md"
          onClick={() => cancelOrder && cancelOrder(id)}
          />
      </div>      
    </div>

  )
}

export function flightStatusMap(status) {
  // export enum BOOKING_STATUS {
  //   Pending = "Pending",
  //   Issuable = "Issuable",
  //   Failed = "Failed",
  //   Booked = "Booked",
  //   Issued = "Issued",
  // }

  let map = {
    'booked': 'Not Paid',
    'issuable': 'Paid',
    'issued': 'Completed'
  }

  try {
    return map[status?.toLowerCase()]
  } catch(ex) {return status}
}
function StatusCol({ params }) {
  const status = params.value || "";
  
  const orderType = params?.row?.type?.toLowerCase() || "type";
  const bookingID = params?.row?.flightObj?._id;

  console.log(' --> ',params.row)
  
  return (
    <div className="flex justify-between items-center gap-2 w-full ">
      <span className={`${alertType[status]}`}>{status}</span>
      <CustomMenu
        element={
          <label className="block p-2 px-4 cursor-pointer">
            <Icon icon={"pepicons-pop:dots-y"} />
          </label>
        }
      >
        <ActionContext.Consumer>
          {(value) => {
            const {bags,seats,cancel,payment} = value || {}
            return (
              <OrderMenus data={{row: params.row,id: params.id,bookingID,status,orderType}} actions={{
                addBags: bags?.open,
                addSeats: seats?.open,
                cancelOrder: cancel?.open,
                pay: payment?.open,
              }} />
            )
          }}
        </ActionContext.Consumer>
      </CustomMenu>
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
          }

          return pass;
        }
      ),
    );
    //eslint-disable-next-line
  }, [filter, status, gotData]);

  const filterOptions = [
    { label: "All", value: "ALL", count: countObj.all },
    { label: "Flights", value: "FLIGHT", count: countObj.flights },
    { label: "Stays", value: "Stay", count: countObj.stays },
    { label: "Tours", value: "Tour", count: countObj.tours },
  ];

  const columns = [
    { field: "date", headerName: "Created Date" },
    { field: "bookingId", headerName: "ID" },
    { field: "name", headerName: "Name" },
    {
      field: "provider",
      headerName: "Provider",
      renderCell: (params) => {
        let type = params.row?.type?.toLowerCase();
        return (
          <div className="flex flex-col ">
            {params.value}
            <small className={`text-xs px-2 p-1 rounded-md ${type}`}>
              {params.row?.type}
            </small>
          </div>
        );
      },
    },
    { field: "updatedDate", headerName: "Activity Date" },
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
        <StatusCol
          params={params}
        />
      ),
    },
  ];
  
  console.log(data)

  return (
    <div className="pd-md flex-1 flex flex-col gap-1">
      <div className="flex gap-4 justify-between flex-wrap items-center">
        <h5>Orders</h5>
        {/* <div className='flex gap-4 flex-wrap items-center justify-between md:justify-start flex-1 max-w-full'> */}
        <div className="order-3 md:order-2 max-w-full">
          <TableFilter
            options={filterOptions}
            value={filter}
            onChange={(val) => setFilter(val)}
          />
        </div>
        <div className="order-2 md:order-3 flex gap-2">
          <button className="btn-theme-light !bg-primary/10 rounded-md">
            Queue
          </button>
          <CreateOrder
            label="Create new order"
            handleReturn={() => setData([...data, tempObj])}
          />
        </div>
        {/* </div> */}
      </div>
      <hr />
      <div className="flex gap-4 justify-between items-center flex-wrap">
        <div className="flex gap-2 btn-theme-light">
          + <span>Filter</span>
        </div>
        <div className="flex gap-2">
          <Link to={status === 'needsReview' ? '?status=null' : '?status=needsReview'} className={status === 'needsReview' ? 'btn' : "btn-theme-light"}>Needs review</Link>
          <button className={status === 'onhold' ? 'btn' : "btn-theme-light"}>On hold</button>
        </div>
        <div className="flex gap-2 items-center">
          <Button1 variant="text" className="capitalize">
            Export
          </Button1>
          <div className="flex gap-2 items-center light-bg rounded-md p-2">
            <SelectInput defaultValue="Weekly" size="small" label="">
              <MenuItem>Hourly</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem>Monthly</MenuItem>
              <MenuItem>Yearly</MenuItem>
            </SelectInput>
            <CalendarInput1 />
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
          }
        }}
      >
        {/* {status === 'needsReview' ? 
          <OrderDataChanges data={data} />
          :
        } */}
      <CustomTable rows={data} columns={columns}
        pageSizeOptions={[10,20,50,100]}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
       />
      </ActionContext.Provider>

      <AddBags open={openAddBags} setOpen={setOpenAddBags} />
      <AddSeats open={openAddSeats} setOpen={setOpenAddSeats} />
      <CancelOrder open={openCancelOrder} setOpen={setOpenCancelOrder} />
      <Modal1 open={openPayment} setOpen={setOpenPayment}>
        <PaymentMethod callback={() => {reload();setOpenPayment(false)}} flightBookingId={openPayment} hide={['booklater']} expand />
      </Modal1>
    </div>
  );
}
