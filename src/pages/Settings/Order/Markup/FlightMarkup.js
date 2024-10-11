import React, { createContext, useEffect, useState } from "react";
import CustomTable from "../../../../components/Table/CustomTable";
import Modal1 from "../../../../components/DIsplay/Modal/Modal1";
import Icon from "../../../../components/HOC/Icon";
import CreateMarkup from "./CreateMarkup";
import { Link } from "react-router-dom";
import Button1 from "../../../../components/form/Button1";
import getFlightPriceAdjustments from "../../../../controllers/flightPriceAdjustment/getFlightPriceAdjustments";
import activateFlightAdjustment from "../../../../controllers/flightPriceAdjustment/activateFlightAdjustment";
import deactivateFlightAdjustment from "../../../../controllers/flightPriceAdjustment/deactivateFlightAdjustment";
import MarkupDelete from "./MarkupDelete";

const ActionContext = createContext();

export default function FlightMarkup() {
  const [open, setOpen] = useState(false);
  const [editObj, setEditObj] = useState();
  const [deleteObj, setDeleteObj] = useState();
  const [flightMarkups, setFlightMarkups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
    //eslint-disable-next-line
  }, []);

  async function load() {
    if(open) setOpen(false);
    setEditObj();
    setLoading(true);
    const res = await getFlightPriceAdjustments();
    setLoading(false);
    if (res.return) {
      if (Array.isArray(res.data?.data?.data)) {
        setFlightMarkups(res.data?.data?.data);
      }
    }
  }

  async function changeStatus(value, param) {
    setLoading(true);
    if (value) {
      await activateFlightAdjustment(param._id);
    } else {
      await deactivateFlightAdjustment(param._id);
    }
    setLoading(false);
    load();
  }

  const columns = [
    { field: "name", headerName: "Mark-up name", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "method", headerName: "Method", flex: 1 },
    {
      field: "status",
      headerName: "Action",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <ActionContext.Provider
            value={{
              setEditObj,
              setDeleteObj,
              changeStatus,
            }}
          >
            <ActionCol params={params.row} />
          </ActionContext.Provider>
        );
      },
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between flex-wrap items-center gap-4">
        <div className="flex gap-2">
          <Link to="?type=Flights" className={"btn"}>
            Flights
          </Link>
          {/* <Link to="?type=Stays" className={"btn-theme-light rounded-md"}>
            Stays
          </Link>
          <Link to="?type=Tours" className={"btn-theme-light rounded-md"}>
            Tours
          </Link> */}
        </div>
        {/* <h5 className='text-primary/70'>Created Mark ups</h5> */}
        <div>
          <Button1 onClick={() => setOpen(true)}>Create new markup</Button1>
          <Modal1 open={open} setOpen={setOpen}>
            <CreateMarkup
              forType={"Flights"}
              reload={load}
              footer={
                <div>
                  <Button1
                    onClick={() => setOpen(false)}
                    className="btn-theme-light"
                  >
                    Cancel
                  </Button1>
                </div>
              }
            />
          </Modal1>
        </div>
      </div>

      <CustomTable rows={flightMarkups} columns={columns} loading={loading} />
      <Modal1 open={deleteObj} setOpen={() => setDeleteObj()}>
        <div className="card p-10">
          <MarkupDelete
            data={deleteObj}
            cancel={() => setDeleteObj()}
            reload={load}
          />
        </div>
      </Modal1>
      <Modal1 open={editObj} setOpen={setEditObj}>
        <div className="p-6">
          <CreateMarkup forType={"Flights"} reload={load} update data={editObj} />
        </div>
      </Modal1>
    </div>
  );
}

function ActionCol({ params }) {
  return (
    <ActionContext.Consumer>
      {(value) => {
        const { setEditObj, setDeleteObj } = value || {};
        return (
          <div className="flex gap-2">
            {/* <Switch
              checked={params.status === "Active"}
              onChange={(ev) => changeStatus(ev.target.checked, params)}
            /> */}
            <label
              className="bg-primary/10 rounded-md cursor-pointer p-2 text-primary/30"
              onClick={() => setEditObj(params)}
            >
              <Icon icon="tabler:edit" />
            </label>
            <span
              className="p-2 bg-red-100 text-red-500 rounded-md cursor-pointer"
              onClick={() => setDeleteObj(params)}
            >
              <Icon icon="material-symbols-light:delete" />
            </span>
          </div>
        );
      }}
    </ActionContext.Consumer>
  );
}
