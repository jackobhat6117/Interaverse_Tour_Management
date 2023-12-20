import React, { createContext, useEffect, useState } from "react";
import Button1 from "../../../../components/form/Button1";
import CustomTable from "../../../../components/Table/CustomTable";
import { Switch } from "@mui/material";
import Icon from "../../../../components/HOC/Icon";
import Modal1 from "../../../../components/DIsplay/Modal/Modal1";
import PromoDeleteForm from "./PromoDeleteForm";
import PromoCodeForm from "./PromoCodeForm";
import getDealCodes from "../../../../controllers/settings/dealCodes/getDealCodes";
import changeDealCodeStatus from "../../../../controllers/settings/dealCodes/changeDealCodeStatus";
import { EditRounded } from "@mui/icons-material";

const ActionContext = createContext();

export default function PromoSettings() {
  const [addNew, setAddNew] = useState(false);
  const [deleteObj, setDeleteObj] = useState();
  const [editObj, setEditObj] = useState();
  const [loading, setLoading] = useState(false);
  const [dealCodes, setDealCodes] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);

    const resp = await getDealCodes();

    if (resp.return) {
      const data = resp.data?.data || [];
      setDealCodes(data);
    }
    setLoading(false);
  }

  async function handleStatusChange(e, param) {
    setLoading(true);
    await changeDealCodeStatus(param._id);
    load();
  }

  const columns = [
    { field: "airline", headerName: "Airline" },
    { field: "code", headerName: "Code" },
    {
      field: "status",
      headerName: "Action",
      minWidth: 200,
      renderCell: (params) => (
        <ActionContext.Provider
          value={{
            handleStatusChange,
            setDeleteObj,
            setEditObj,
          }}
        >
          <ActionCol params={params.row} />
        </ActionContext.Provider>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-4 w-full">
          <h5>Create Promo / Airline Codes</h5>
          <div>
            <Button1 onClick={() => setAddNew(true)}>Create new code</Button1>
            <Modal1 open={addNew} setOpen={setAddNew}>
              <div className="card p-10">
                <PromoCodeForm cancel={() => setAddNew(false)} reload={load} />
              </div>
            </Modal1>
          </div>
        </div>
        <CustomTable rows={dealCodes} columns={columns} loading={loading} />
      </div>

      <Modal1 open={deleteObj} setOpen={() => setDeleteObj()}>
        <div className="card p-10">
          <PromoDeleteForm
            data={deleteObj}
            cancel={() => setDeleteObj()}
            reload={load}
          />
        </div>
      </Modal1>
      <Modal1 open={editObj} setOpen={() => setEditObj()}>
        <div className="card p-10">
          <PromoCodeForm
            data={editObj}
            cancel={() => setEditObj()}
            reload={load}
          />
        </div>
      </Modal1>
    </div>
  );
}

function ActionCol({ params }) {
  return (
    <ActionContext.Consumer>
      {(val) => {
        const { handleStatusChange, setDeleteObj, setEditObj } = val || {};
        return (
          <div className="flex gap-2 w-full">
            <Switch
              checked={params.isActive}
              onChange={(ev) => handleStatusChange(ev.target.checked, params)}
            />
            <span
              className="p-2 bg-gray-200 rounded-md cursor-pointer"
              onClick={() => setEditObj(params)}
            >
              <EditRounded />
            </span>
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
