import React from "react";
import RevenueAnalytics from "./RevenuAnalytics";
import { useSelector } from "react-redux";
import Button1 from "../../components/form/Button1";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useSelector((state) => state.user.userData);
  return (
    <div className="pd-md flex flex-col gap-4 mb-16 ">
      <div className="flex gap-6 flex-wrap ">
        <div className="flex gap-1 whitespace-nowrap">
          Welcome back,
          <b>
            {user?.firstName} {user?.lastName}
          </b>
        </div>
        <div className="flex-1 flex flex-wrap md:flex-nowrap gap-4 justify-end">
          {/* <Link className='btn whitespace-nowrap flex-1 md:flex-none' to="/">View pending orders</Link> */}
          <Link
            className="p-2 px-4 rounded-md flex-1 md:flex-none border-primary border flex gap-3 whitespace-nowrap items-center"
            to="/order"
          >
            <span className="bg-theme1/20 text-xs font-bold w-5 h-5 flex items-center justify-center">
              5
            </span>
            Airline-initiated changes
          </Link>
          <Link
            className="p-2 px-4 rounded-md flex-1 md:flex-none border-primary border flex gap-3 whitespace-nowrap items-center"
            to="/order"
          >
            <span className="bg-theme1/20 text-xs font-bold w-5 h-5 flex items-center justify-center">
              15
            </span>
            Book on-hold orders
          </Link>
          <div className="flex items-center">
            <Button1
              className="btn-theme1 whitespace-nowrap flex-1 md:flex-none !w-auto "
              href="/order"
            >
              Create a new order
            </Button1>
          </div>
        </div>
      </div>
      <RevenueAnalytics />
    </div>
  );
}
