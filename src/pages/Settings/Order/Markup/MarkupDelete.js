import React, { useState } from "react";
import Button1 from "../../../../components/form/Button1";
import deleteFlightAdjustment from "../../../../controllers/flightPriceAdjustment/deleteFlightAdjustment";

export default function MarkupDelete({ data, reload, cancel }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    await deleteFlightAdjustment(data._id);
    setLoading(false);
    cancel && cancel();
    reload && reload();
  }
  return (
    <div className="flex flex-col gap-4">
      <h5 className="self-center">Delete Price Adjustment</h5>
      <div className="flex gap-4 justify-between">
        <p>Airline:</p>
        <b>{data?.airline}</b>
      </div>
      <div className="flex gap-4 justify-between">
        <p>type:</p>
        <b>{data?.type}</b>
      </div>
      <div className="flex gap-4 justify-between">
        <p>value:</p>
        <b>
          {data?.amount} ({data?.method})
        </b>
      </div>
      <div className="flex gap-4 justify-between">
        <p>Status:</p>
        <b>{data?.status}</b>
      </div>
      <p>You will not be able to undo this action!</p>
      <div className="flex gap-4 justify-between">
        {cancel ? (
          <button className="btn-theme-light" onClick={() => cancel()}>
            Cancel
          </button>
        ) : null}
        <Button1
          loading={loading}
          className="!bg-red-500 !text-white"
          onClick={handleSubmit}
        >
          Delete
        </Button1>
      </div>
    </div>
  );
}
