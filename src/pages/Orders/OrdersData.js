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
import { useNavigate } from "react-router-dom";

const ActionContext = createContext();

export const Menu = (props) => {
  const { className, label, value, showFor, hideFor, ...extraProps } = props;
  const ShowerClass = showFor?.includes(value?.toLowerCase() || value)
    ? ""
    : !showFor
    ? ""
    : "!hidden";
  const hiderClass = !hideFor?.includes(value?.toLowerCase() || value)
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

function StatusCol({ params }) {
  const status = params.value || "";
  const navigate = useNavigate();

  const orderType = params?.row?.type?.toLowerCase() || "type";

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
          {({ bags, seats, cancel }) => (
            <div className="menuItem">
              <Menu
                value={status}
                label="View Order"
                onClick={() =>
                  navigate(`/order/${orderType}/${params?.row?.id}`)
                }
              />
              <Menu
                value={status}
                label="Make Payment"
                showFor={["confirmed"]}
              />
              <Menu
                value={status}
                label="Issue Ticket"
                showFor={["confirmed"]}
                className="!btn disabled"
              />
              <Menu
                value={status}
                label="Manage Ticket"
                showFor={["confirmed"]}
              />
              <Menu
                value={status}
                label="Add Seats"
                hideFor={["confirmed"]}
                onClick={seats.open}
              />
              <Menu
                value={status}
                label="Add Bags"
                hideFor={["confirmed"]}
                onClick={bags.open}
              />
              <Menu
                value={status}
                label="Confirm Payment"
                showFor={["pending", "on hold"]}
              />
              <Menu value={status} label="Edit PNR" hideFor={["confirmed"]} />
              <Menu value={status} label="Hold Order" hideFor={["confirmed"]} />
              <Menu
                value={status}
                label="Cancel Order"
                className="!bg-red-500 !text-white !rounded-md"
                onClick={cancel.open}
              />
            </div>
          )}
        </ActionContext.Consumer>
      </CustomMenu>
    </div>
  );
}

export default function OrdersData({ data: gotData, setData: setOrig }) {
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
  const [openAddBags, setOpenAddBags] = useState(false);
  const [openAddSeats, setOpenAddSeats] = useState(false);
  const [openCancelOrder, setOpenCancelOrder] = useState(false);

  const [data, setData] = useState(gotData || []);
  let countObj = {
    all: gotData?.length,
    flights: 0,
    tours: 0,
<<<<<<< HEAD
    stays: 0
  }
  gotData?.filter(obj => {
=======
    stays: 0,
  };
  data?.filter((obj) => {
>>>>>>> 8181cdd9e35de8d99fc8ff566d618cfedc8a861e
    let type = obj?.type?.toLowerCase();
    if (type === "flight") countObj.flights++;
    else if (type === "tour") countObj.tours++;
    else if (type === "stay") countObj.stays++;

    return true;
  });

  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    if (!filter || filter === "ALL") return setData(gotData);

    setData(
      gotData.filter(
        (obj) => obj.type?.toLowerCase() === filter?.toLowerCase(),
      ),
    );
  }, [filter, gotData]);

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
      renderCell: (params) => <div>{formatMoney(params.value)}</div>,
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
          addBags={() => setOpenAddBags(true)}
          addSeats={() => setOpenAddSeats(true)}
        />
      ),
    },
  ];

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
          <button className="btn-theme-light">Needs review</button>
          <button className="btn-theme-light">On hold</button>
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
            open: () => setOpenAddBags(true),
          },
          seats: {
            openAddSeats,
            setOpenAddSeats,
            open: () => setOpenAddSeats(true),
          },
          cancel: {
            openCancelOrder,
            setOpenCancelOrder,
            open: () => setOpenCancelOrder(true),
          },
        }}
      >
        <CustomTable rows={data} columns={columns} />
      </ActionContext.Provider>

      <AddBags open={openAddBags} setOpen={setOpenAddBags} />
      <AddSeats open={openAddSeats} setOpen={setOpenAddSeats} />
      <CancelOrder open={openCancelOrder} setOpen={setOpenCancelOrder} />
    </div>
  );
}
