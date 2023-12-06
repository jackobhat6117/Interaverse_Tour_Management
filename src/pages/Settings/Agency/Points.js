import React, { useEffect, useState } from "react";
import SelectInput from "../../../components/form/SelectInput";
import { MenuItem } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import PointDisp from "../../../components/mini/PointDisp";
import TypeDisplay from "../../../components/mini/TypeDisp";
import { alertType } from "../../../data/constants";
import Paginate from "../../../components/DIsplay/Paginate";
import getPoints from "../../../controllers/points/getPoints";
import getPointTransactions from "../../../controllers/points/getPointsTransaction";

export default function PointsSettings() {
  const [point, setPoint] = useState(0);
  const [pointTransaction, setPointTransaction] = useState();
  const [status, setStatus] = useState();
  // const [keyword, setKeyword] = useState("");

  useEffect(() => {
    async function load() {
      const points = await getPoints();
      if (points.return) {
        setPoint(points?.data?.data?.points || 0);
      }
      const transactions = await getPointTransactions(status);
      if (transactions.return) {
        setPointTransaction(transactions.data?.data);
      }
    }
    load();
  }, [status]);

  const getStat = () => {
    return [
      {
        label: "Current balance",
        point,
        footer: (
          <button className="btn-small border-0 !bg-secondary/10">
            Redeem points
          </button>
        ),
        active: true,
      },
      {
        label: "Total earning points",
        point: pointTransaction?.meta?.totalCreditTransaction,
      },
      {
        label: "Used points",
        point: pointTransaction?.meta?.totalDebitTransaction,
      },
    ];
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        {getStat()?.map((stat, i) => (
          <Stats key={i} data={stat} />
        ))}
      </div>
      <div className="flex gap-4 items-center justify-between">
        <h4>
          Points Transactions{" "}
          <small className="text-blue-500">
            {pointTransaction?.meta?.total}
          </small>
        </h4>
        <div>
          <SelectInput
            defaultValue="All"
            size="small"
            label=""
            className="bg-primary/10"
            InputProps={{
              startAdornment: <FilterList className="mr-2" />,
            }}
            onChange={(value) => {
              if (value !== "All") {
                setStatus(value === "isCredit");
              } else setStatus(undefined);
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="isCredit">Earned</MenuItem>
            <MenuItem value="isDebit">Spent</MenuItem>
          </SelectInput>
        </div>
      </div>
      <Paginate
        data={pointTransaction?.data || []}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        render={(obj, i) => <TransactionDisplay1 key={i} data={obj} />}
        limit={4}
      />
      {/* {data.map((obj,i) => (
        <TransactionDisplay1 key={i} data={obj} />
      ))} */}
    </div>
  );
}

function TransactionDisplay1({ data }) {
  return (
    <div className="card rounded-lg !py-3 !px-3 flex gap-3 !pr-4">
      <div className="self-stretch min-w-[100px] bg-primary/20 rounded-lg"></div>
      <div className="flex flex-col gap-2 justify-between">
        <div className="flex gap-1 items-center">
          <small className={`${alertType[data.status]}`}>{data.status}</small>
          <small>
            <TypeDisplay type={data.type} />
          </small>
        </div>
        <div className="flex gap-2">
          <p className="flex-1">{data.detail}</p>
          <PointDisp value={data.point} />
        </div>
        <div>Wed, 12 Jul 2023</div>
      </div>
    </div>
  );
}

function Stats({ data }) {
  return (
    <div
      className={`flex flex-1 flex-col gap-1 text-secondary bg-primary font-bold p-4 rounded-lg ${
        !data.active ? "bg-opacity-50" : "bg-opacity-80"
      } `}
    >
      <b>{data.label}</b>
      <div className="flex gap-4 justify-between items-end">
        <div className="flex gap-1 items-end">
          <h1>{data.point}</h1>
          mp
        </div>
        {data.footer}
      </div>
    </div>
  );
}
