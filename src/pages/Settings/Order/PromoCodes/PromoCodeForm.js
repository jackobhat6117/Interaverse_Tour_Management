import React, { useState } from "react";
import TextInput from "../../../../components/form/TextInput";
import Button1 from "../../../../components/form/Button1";
import addDealCode from "../../../../controllers/settings/dealCodes/addDealCode";
import updateDealCode from "../../../../controllers/settings/dealCodes/updateDealCode";
import { CircularProgress } from "@mui/material";

export default function PromoCodeForm({ data, cancel, reload }) {
  const [loading, setLoading] = useState(false);
  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    const addData = {
      airline: e.target.airline?.value,
      code: e.target.code?.value,
    };
    await addDealCode(addData);
    setLoading(false);
    reload && reload();
    cancel && cancel();
  };
  const handleUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();
    const updateData = {
      airline: e.target.airline?.value,
      code: e.target.code?.value,
    };
    await updateDealCode(data?._id, updateData);
    setLoading(false);
    reload && reload();
    cancel && cancel();
  };
  return (
    <div className="flex flex-col gap-4">
      <h5>{data ? "Update Deal Code" : "Create New Deal Code"}</h5>
      <form
        onSubmit={data ? handleUpdate : handleAdd}
        className="flex flex-col gap-4"
      >
        <TextInput
          label={"Airline"}
          name="airline"
          required
          placeholder={"eg. BA"}
        />
        <TextInput
          label={"Code"}
          name="code"
          required
          placeholder={"eg. 0421223"}
        />
        <div className="flex ">
          {cancel ? (
            <button className="btn-theme-light" onClick={cancel}>
              Cancel
            </button>
          ) : null}
          <Button1 type="submit" disabled={loading}>
            {loading ? <CircularProgress size={"1rem"} /> : "Save Code"}
          </Button1>
        </div>
      </form>
    </div>
  );
}
