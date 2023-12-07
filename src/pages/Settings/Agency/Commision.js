import React, { useEffect, useState } from "react";
import FilterCalendar from "../../../components/form/FilterCalendar";
import TableFilter from "../../../components/Table/TableFilter";
import SearchInput from "../../../components/form/SearchInput";
import Button1 from "../../../components/form/Button1";
import CustomTable from "../../../components/Table/CustomTable";
import getCommissionTransactions from "../../../controllers/Flight/Commission/getTransactions";
import moment from "moment";

export default function CommissionSettings() {
  const [commissionFor, setCommissionFor] = useState("FlightCommission");
  const [commissionData, setCommissionData] = useState();
  const [status, setStatus] = useState();
  const [dateFilter, setDateFilter] = useState({
    range: "week",
    date: new Date().toLocaleDateString(),
  });
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    async function load() {
      let range = undefined;
      const date =
        dateFilter?.range !== "All"
          ? moment(dateFilter?.date)
              .subtract(1, dateFilter?.range)
              .format("MM/D/YYYY")
          : undefined;
      if (date) {
        range = date + "," + dateFilter?.date;
      }
      const res = await getCommissionTransactions(
        commissionFor,
        status,
        range,
        keyword,
      );
      if (res.return) {
        setCommissionData(res.data?.data);
      }
    }
    load();
  }, [commissionFor, dateFilter, keyword, status]);

  /**
   * @param {number} current
   * @param {number} previous
   */
  const calculatePercentage = (current, previous) => {
    const parsedCurrent =
      !isNaN(Number(current)) && isFinite(Number(current))
        ? Number(current)
        : 0;
    const parsedPrevious =
      !isNaN(Number(previous)) && isFinite(Number(previous))
        ? Number(previous)
        : 0;
    return parsedPrevious !== 0
      ? (((parsedCurrent - parsedPrevious) / parsedPrevious) * 100).toFixed(1)
      : parsedCurrent !== 0
      ? 100
      : 0;
  };

  const getStats = () => {
    return [
      {
        label: "Today's earnings",
        inc: calculatePercentage(
          commissionData?.meta?.todaysEarning,
          commissionData?.meta?.yesterdaysEarning,
        ),
        price: commissionData?.meta?.todaysEarning,
      },
      {
        label: "Last 7 days",
        inc: calculatePercentage(
          commissionData?.meta?.last7Days,
          commissionData?.meta?.last7DaysPast,
        ),
        price: commissionData?.meta?.last7Days,
      },
      {
        label: "Last 30 days",
        inc: calculatePercentage(
          commissionData?.meta?.last30Days,
          commissionData?.meta?.last30DaysPast,
        ),
        price: commissionData?.meta?.last30DaysPast,
      },
      {
        label: "Overall",
        inc: calculatePercentage(
          commissionData?.meta?.totalCreditTransaction,
          commissionData?.meta?.totalDebitTransaction,
        ),
        price: commissionData?.meta?.totalCreditTransaction,
      },
    ];
  };

  const filterOptions = [
    { value: "All", count: commissionData?.meta?.total },
    { value: "Pending", count: commissionData?.meta?.pending },
    { value: "Success", count: commissionData?.meta?.success },
    { value: "Failed", count: commissionData?.meta?.failed },
  ];
  const columns = [
    { field: "transactionRef", headerName: "Reference", flex: 1 },
    {
      field: "createdAt",
      headerName: "Date Created",
      flex: 1,
      renderCell: (params) => new Date(params.value).toDateString(),
    },
    { field: "amount", headerName: "Amount", flex: 1 },
    {
      field: "flightCommissions",
      headerName: "Applied Commissions",
      flex: 1,
      renderCell: (params) => (
        <div>{Array.isArray(params?.value) ? params.value?.length : 0}</div>
      ),
    },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  return (
    <div className="content-max-w flex flex-col gap-5">
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => setCommissionFor("FlightCommission")}
          className={`flex p-3 px-5 items-center min-w-[120px] justify-center gap-2 ${
            commissionFor === "FlightCommission" ? "!btn" : "!btn-theme-light"
          } `}
        >
          Flights
        </button>
        <button
          onClick={() => setCommissionFor("HotelCommission")}
          className={`flex p-3 px-5 items-center min-w-[120px] justify-center gap-2 ${
            commissionFor === "HotelCommission" ? "!btn" : "!btn-theme-light"
          } `}
        >
          Stays
        </button>
        <button
          onClick={() => setCommissionFor("TourCommission")}
          className={`flex p-3 px-5 items-center min-w-[120px] justify-center gap-2 ${
            commissionFor === "TourCommission" ? "!btn" : "!btn-theme-light"
          } `}
        >
          Tours
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <h5 className="text-primary/40">Commission Overview</h5>
        <div>
          <FilterCalendar
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />
        </div>
      </div>
      <div className="flex gap-2 overflow-hidden overflow-x-auto">
        {getStats()?.map((obj, i) => (
          <Stats key={i} data={obj} />
        ))}
      </div>
      <TableFilter
        value={"All"}
        options={filterOptions}
        onChange={(value) => {
          if (value === "All") {
            setStatus(undefined);
          } else {
            setStatus(value);
          }
        }}
      />
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="text-primary/40">Filter</div>
        <div className="min-w-[70%]">
          <SearchInput
            handleClick={(value) => {
              setKeyword(value);
            }}
          />
        </div>
        <div className="">
          <Button1 variant="text">EXPORT</Button1>
        </div>
      </div>
      <CustomTable columns={columns} rows={commissionData?.data || []} />
    </div>
  );
}

function Stats({ data }) {
  return (
    <div className="p-4 flex flex-col items-end bg-[#2DA771]/10 rounded-lg flex-1">
      <div className="flex gap-3 whitespace-nowrap">
        <p>{data.label}</p>
        {data.inc > 0 ? (
          <p className="!text-green-500">+{data.inc}%</p>
        ) : data.inc < 0 ? (
          <p className="!text-red-500">-{data.inc}%</p>
        ) : (
          <></>
        )}
      </div>
      <h4>{data.price}</h4>
    </div>
  );
}
