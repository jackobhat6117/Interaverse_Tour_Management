import { MenuItem, TextField } from "@mui/material";
import Icon from "../../../../components/HOC/Icon";
import CustomTable from "../../../../components/Table/CustomTable";
import Button1 from "../../../../components/form/Button1";
import { createContext, useEffect, useState } from "react";
import Modal1 from "../../../../components/DIsplay/Modal/Modal1";
import SupplierForm from "./SupplierForm";
import SupplierDeleteForm from "./SupplierDeleteForm";
import getSupplierKeys from "../../../../controllers/settings/supplier/getSupplier";
import { enqueueSnackbar } from "notistack";
import { changeSupplierStatus } from "../../../../controllers/settings/supplier/changeStatus";
import {
  updateAmadeusKey,
  updateSabreKey,
  updateTravelportKey,
} from "../../../../controllers/settings/supplier/updateSupplierKey";

const ActionContext = createContext();

function ActionCol({ params }) {
  return (
    <ActionContext.Consumer>
      {(value) => {
        const { setEditObj, setDeleteObj } = value || {};
        return (
          <div className="flex gap-2">
            <label
              className="bg-primary/10 rounded-md cursor-pointer p-2 text-primary/30"
              onClick={() => setEditObj(params.row)}
            >
              <Icon icon="tabler:edit" />
            </label>
            <label
              className="bg-primary/10 rounded-md cursor-pointer p-2 text-primary/30"
              onClick={() => setDeleteObj(params.row)}
            >
              <Icon icon="material-symbols:delete" className="text-red-500" />
            </label>
          </div>
        );
      }}
    </ActionContext.Consumer>
  );
}

export default function FlightSupplier() {
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState();

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    setLoading(true);
    const resp = await getSupplierKeys();
    if (resp.return) {
      const data = resp.data;
      setSuppliers(data);
    }
    setLoading(false);
  };

  const handleChangeStatus = async (value, supplier) => {
    setLoading(true);
    const resp = await changeSupplierStatus({
      [supplier]: value,
    });
    if (resp.return) {
      enqueueSnackbar(`Updated ${supplier} status!`, { variant: "success" });
    }
    setLoading(false);
  };

  const data = [
    {
      id: "amadeus",
      supplier: "Amadeus",
    },
    {
      id: "travelport",
      supplier: "TravelPort",
    },
    {
      id: "sabre",
      supplier: "Sabre",
    },
  ];

  const [addNew, setAddNew] = useState(false);
  const [editObj, setEditObj] = useState();
  const [deleteObj, setDeleteObj] = useState();

  const columns = [
    {
      field: "supplier",
      headerName: "Supplier",
      renderCell: (params) => (
        <div className="flex gap-2">
          <Icon icon="carbon:scis-transparent-supply" />
          {params.value}
        </div>
      ),
    },
    {
      field: "using",
      headerName: "Currently Using",
      renderCell: (params) => {
        return (
          <TextField
            select
            className={`w-full rounded-md ${
              params.value === "My Own"
                ? "bg-primary/10"
                : "text-[#004C1F] bg-[#C4E9E3]"
            }`}
            size="small"
            defaultValue={
              suppliers && suppliers[params.row.id]?.isActive ? true : false
            }
            onChange={(e) => handleChangeStatus(e.target.value, params.row.id)}
            disabled={loading}
          >
            <MenuItem value={false}>Miles</MenuItem>
            <MenuItem value={true}>My Own</MenuItem>
          </TextField>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        return (
          <ActionContext.Provider
            value={{
              setEditObj,
              setDeleteObj,
            }}
          >
            <ActionCol params={params} />
          </ActionContext.Provider>
        );
      },
    },
  ];

  const handleUpdate = async (supplier, data) => {
    setLoading(true);
    let resp = undefined;
    switch (supplier) {
      case "amadeus":
        resp = await updateAmadeusKey(data);
        break;
      case "travelport":
        resp = await updateTravelportKey(data);
        break;
      case "sabre":
        resp = await updateSabreKey(data);
        break;
      default:
        break;
    }
    if (resp.return) {
      enqueueSnackbar(`Updated ${supplier}!`, { variant: "success" });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3 self-start">
      <div className="flex justify-between gap-4">
        <h5>Flight</h5>
        <div>
          <Button1 onClick={() => setAddNew(true)}>+ Add</Button1>
          <Modal1 open={addNew} setOpen={() => setAddNew()}>
            <div className="card p-10">
              <SupplierForm
                name="flight"
                footer={(obj) => (
                  <div className="flex gap-4">
                    <label
                      className="btn-theme-light"
                      onClick={() => setAddNew()}
                    >
                      Cancel
                    </label>
                    <Button1 onClick={() => handleUpdate(obj)}>
                      Save Supplier
                    </Button1>
                  </div>
                )}
                data={suppliers}
              />
            </div>
          </Modal1>
        </div>
      </div>
      <CustomTable rows={data} columns={columns} />

      <Modal1 open={editObj} setOpen={() => setEditObj()}>
        <div className="card p-10">
          <SupplierForm
            name="flight"
            update
            data={editObj}
            footer={(obj) => (
              <div className="flex gap-4">
                <label className="btn-theme-light" onClick={() => setEditObj()}>
                  Cancel
                </label>
                <Button1 onClick={() => handleUpdate(obj)}>
                  Save Supplier
                </Button1>
              </div>
            )}
          />
        </div>
      </Modal1>
      <Modal1 open={deleteObj} setOpen={() => setDeleteObj()}>
        <div className="card p-10">
          <SupplierDeleteForm
            update
            data={deleteObj}
            footer={(obj) => (
              <div className="flex gap-4">
                <Button1
                  className="!w-auto !btn-theme-light"
                  onClick={() => setDeleteObj()}
                >
                  Cancel
                </Button1>
                <Button1
                  className="!bg-red-500 !text-white"
                  onClick={() => handleUpdate(obj)}
                >
                  Delete
                </Button1>
              </div>
            )}
          />
        </div>
      </Modal1>
    </div>
  );
}
