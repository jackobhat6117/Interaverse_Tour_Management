import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import {
  BarElement,
  Chart,
  CategoryScale,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { WbIncandescent } from "@mui/icons-material";
import Button1 from "../../components/form/Button1";
import FilterCalendar from "../../components/form/FilterCalendar";
import { getProductStats } from "../../controllers/dashboard/getDashboardStats";
import moment from "moment";
import { formatMoney } from "../../features/utils/formatMoney";
import Stats from "./Stats";
import { getUserStats } from "../../controllers/dashboard/getUserStats";
import { getPaymentStats } from "../../controllers/dashboard/getPaymentStats";
import { def } from "../../config";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
);

export default function RevenueAnalytics() {
  const [productStat, setProductStat] = useState();
  const [userStat, setUserStat] = useState();
  const [paymentStat, setPaymentStat] = useState();
  const [dateFilter, setDateFilter] = useState({
    range: "week",
    date: new Date().toLocaleDateString(),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadTransaction() {
      const startDate =
        dateFilter?.range !== "All"
          ? moment(dateFilter?.date)
              .subtract(1, dateFilter?.range)
              .format("MM/D/YYYY")
          : undefined;

      setLoading(true);
      const productStats = await getProductStats(startDate, dateFilter?.date);
      const userStats = await getUserStats(startDate, dateFilter?.date);
      const paymentStats = await getPaymentStats(startDate, dateFilter?.date);
      setLoading(false);
      if (productStats.return) {
        setProductStat(productStats.data?.data);
      }
      if(userStats.return) {
        setUserStat(userStats.data?.data);
      }
      if(paymentStats) {
        setPaymentStat(paymentStats.data?.data)
      }
    }
    loadTransaction();
    
  }, [dateFilter?.date, dateFilter?.range]);

  const getFlightChartData = () => {
    if (productStat?.flight) {
      return productStat.flight?.dailyReport?.map((report) => ({
        date: moment(report?._id).toISOString(),
        orders: report?.totalOrders,
        editedtotalPrice: report?.totalEarning,
      }));
    }
    return [];
  };

  const legendColors = {
    flights: "#844AF9",
    stays: "#FFA500",
    tours: "#2970F8",
    flightsbg: "bg-[#844AF9]",
    staysbg: "bg-[#FFA500]",
    toursbg: "bg-[#2970F8]",
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 3,
        grid: {
          display: false,
        },
        // ticks: {
        //   min: 0,
        //   max: 10000000,
        //   stepSize: 600000
        // }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 5,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
    },
  };
  // const datas = [
  //   { date: "2023-03-09T12:00:00-06:30", orders: 10, editedtotalPrice: 0 },
  //   { date: "2023-03-15T12:00:00-06:30", orders: 0, editedtotalPrice: 0 },
  //   { date: "2023-03-21T12:00:00-06:30", orders: 230, editedtotalPrice: 0 },
  //   { date: "2023-03-27T12:00:00-06:30", orders: 0, editedtotalPrice: 0 },
  //   { date: "2023-04-02T12:00:00-06:30", orders: 40, editedtotalPrice: 0 },
  //   { date: "2023-04-05T12:00:00-06:30", orders: 0, editedtotalPrice: 0 },
  // ];
  const obj = {
    flights: [...getFlightChartData()],
    stays: [], //TODO: hotels
    tours: [],
  };

  const data = {
    labels: getFlightChartData()?.map((d) =>
      new Date(d.date).toLocaleString("default", {
        day: "numeric",
        month: "short",
      }),
    ),
    datasets: Object.entries(obj).map(([key, objs], i) => {
      return {
        label: key,
        data: objs.map((d) => d.orders * (i * 10 + 1)),
        barThickness: 40,
        backgroundColor: legendColors[key],
        borderWidth: 1,
        pointRadius: 1,
      };
    }),
  };
  // const dohnutData = {
  //   // labels: datas.map((d) => moment(d.date).format('MM DD')),
  //   labels: Object.keys(obj),
  //   datasets: [
  //     {
  //       label: 'Total ',
  //       data: Object.values(obj).map(datas => datas.length),
  //       // data: obj.map((d) => d.editedtotalPrice),
  //       // borderColor: theme?.palette?.primary?.main || '#1362FC',
  //       barThickness: 4,
  //       borderWidth: 2,
  //       pointRadius: 1,
  //       tension: 0.4,
  //       backgroundColor: [
  //         legendColors.flights,
  //         legendColors.stays,
  //         legendColors.tours
  //       ]
  //       // backgroundColor: theme?.palette?.primaryLight?.main || '#1362FCaa',
  //     }
  //   ]
  // }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap py-4 items-center justify-between gap-4 ">
        <h5>Revenue Analytics</h5>
        <div className="flex gap-2 flex-wrap">
          <Button1 variant="text" className="flex-1">
            Export
          </Button1>
          <FilterCalendar
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 rounded-md bg-gradient-to-r from-[#1E61DC] to-[#062759] p-3 flex flex-col gap-1 text-secondary">
          <span>Total</span>
          <span>
            {/* TODO: add hotels and tours */}
            {formatMoney((productStat?.flight?.issuableBookingsAmount || 0) +
              (productStat?.flight?.issuedBookingsAmount || 0))}
          </span>
        </div>
        <div className="flex-1 rounded-md light-bg p-3 flex flex-col gap-1">
          <span>Flights</span>
          <span>
            {formatMoney((productStat?.flight?.issuableBookingsAmount || 0) +
              (productStat?.flight?.issuedBookingsAmount || 0))}
          </span>
        </div>
        <div className="flex-1 rounded-md light-bg p-3 flex flex-col gap-1">
          <span>Stays</span>
          <span>0</span>
        </div>
        <div className="flex-1 rounded-md light-bg p-3 flex flex-col gap-1">
          <span>Tours</span>
          <span>0</span>
        </div>
        <div className="flex-1 rounded-md light-bg p-3 flex flex-col gap-1">
          <span>Commissions</span>
          <span>0</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap lg:flex-nowrap sm:items-start gap-4 min-w-[25%] w-full ">
        <div className="light-bg flex-1 p-4 max-w-full lg:w-[65%]">
          <Bar
            options={options}
            data={data}
            className="md:xmin-h-[60vh] max-h-[80vh] w-full"
          />
        </div>
        <div className="light-bg p-4 flex md:flex-col flex-1 md:flex-none justify-between flex-wrap gap-6 ">
          <div className="flex flex-col w-full gap-3">
            <b>Packages</b>
            <div className="flex gap-6 justify-between">
              <div className="flex items-center gap-1">
                <span
                  className={`w-3 h-3 inline-block rounded-full ${legendColors["flightsbg"]} `}
                ></span>
                Flight
              </div>
              <span>
                {(productStat?.flight?.totalIssuableBookings || 0) +
                  (productStat?.flight?.totalIssuedBookings || 0)}
              </span>
            </div>
            <div className="flex gap-6 justify-between">
              <div className="flex items-center gap-1">
                <span
                  className={`w-3 h-3 inline-block rounded-full ${legendColors["staysbg"]} `}
                ></span>
                Stays
              </div>
              <span>0</span>
            </div>
            <div className="flex gap-6 justify-between">
              <div className="flex items-center gap-1">
                <span
                  className={`w-3 h-3 inline-block rounded-full ${legendColors["toursbg"]} `}
                ></span>
                Tours
              </div>
              <span>0</span>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <Doughnut
              className="w-full"
              options={{
                cutoutPercentage: 70, // Adjust the cutout percentage as needed
                tooltips: {
                  enabled: false, // Disable default tooltips
                },
                plugins: {
                  datalabels: {
                    formatter: (value, ctx) => {
                      const dataset = ctx.chart.data.datasets[0];
                      const total = dataset.data.reduce(
                        (acc, dataPoint) => acc + dataPoint,
                        0,
                      );
                      const percent = ((value / total) * 100).toFixed(0);
                      return `${percent}%`;
                    },
                    color: "#000000", // Adjust the color of the percent label
                    font: {
                      size: "16", // Adjust the font size as needed
                      weight: "bold", // Adjust the font weight as needed
                    },
                  },
                },
              }}
              data={{
                // labels: datas.map((d) => moment(d.date).format('MM DD')),
                labels: Object.keys(obj),

                datasets: [
                  {
                    label: "Total ",
                    data: Object.values(obj).map((datas) => datas.length),
                    // data: obj.map((d) => d.editedtotalPrice),
                    // borderColor: theme?.palette?.primary?.main || '#1362FC',
                    barThickness: 4,
                    borderWidth: 2,
                    pointRadius: 1,
                    tension: 0.4,
                    backgroundColor: [
                      legendColors.flights,
                      legendColors.stays,
                      legendColors.tours,
                    ],
                    // backgroundColor: theme?.palette?.primaryLight?.main || '#1362FCaa',
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
      {
        def.devTest ? 
          <div className="flex flex-wrap gap-4 pb-4">
            <div className="light-bg rounded-md p-4 flex-1 flex flex-col gap-3">
              <h6>Anchillary attachment rate</h6>
              <h3 className="text-primary/60">0%</h3>
            </div>
            <div className="light-bg rounded-md p-4 flex-1 flex flex-col gap-3">
              <h6>Orders canceled via API</h6>
              <h3 className="text-primary/60">0</h3>
            </div>
            <div className="light-bg rounded-md p-4 flex-1 flex flex-col gap-3">
              <h6>Orders Changed via API</h6>
              <h3 className="text-primary/60">0</h3>
            </div>
          </div>
        :null
      }
      {
        def.devTest ? 
          <div className="grid grid-cols-2 gap-4 pb-4">
            <div className="light-bg rounded-md p-4 flex flex-col gap-3">
              <h6>Top 1 airline by volume</h6>
              <ul className="list-decimal list-inside">
                <li>Malaysia airlines</li>
              </ul>
            </div>
            <div className="light-bg rounded-md p-4 flex flex-col gap-3">
              <h6>Top 1 airline by value</h6>
              <ol className="list-decimal list-inside">
                <li>Malaysia airlines</li>
              </ol>
            </div>
            <div className="light-bg rounded-md p-4 flex flex-col gap-3">
              <h6>Top 2 routes by volume</h6>
              <ul className="list-decimal list-inside">
                <li>LOS - LHR</li>
                <li>LOS - DXB</li>
              </ul>
            </div>
            <div className="light-bg rounded-md p-4 flex flex-col gap-3">
              <h6>Top 2 routes by value</h6>
              <ul className="list-decimal list-inside">
                <li>STN - LOS</li>
                <li>LOS - STN</li>
              </ul>
            </div>
          </div>
      :null}
      {/* <div className="py-4">
        <div className="tooltip flex justify-between items-center border-l-theme1 bg-theme1/10 text-theme1">
          <span>
            <WbIncandescent className="rotate-180 mx-2 -translate-y-[2px]" />
            Learn how to increase ancillary sales with our handy guides.
          </span>
          <Button variant="outlined">View guides</Button>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        <div className="light-bg rounded-md p-4 flex flex-col gap-4 flex-1 max-w-full">
          <b>Anicillaries Sold</b>
          <h3>01</h3>
          <Bar options={options} data={data} className="max-h-[20vh]" />
        </div>
        <div className="light-bg rounded-md p-4 flex flex-col gap-4 flex-1 max-w-full">
          <b>Gross Anicillaries Volume</b>
          <h3>234,900</h3>
          <Line options={options} data={data} className="max-h-[20vh]" />
        </div>
      </div> */}
      <Stats data={{userStat,paymentStat,productStat}} />

    </div>
  );
}
