import React from "react";

export default function PassengerView({ passenger, page, newData }) {
  const Detail = ({ data, label }) => (
    <div className="flex flex-col gap-2">
      <div className="bg-primary/5 rounded-md p-2 px-4">{label}</div>
      <div className="flex flex-col gap-2">
        {/* <div className="flex justify-between gap-3">
            <p className="flex-1">Title</p>
            <div className="flex-1">{obj.title}</div>
          </div> */}
        <div className="flex justify-between gap-3">
          <p className="flex-1">First Name</p>
          <div className="flex-1">{data.firstName}</div>
        </div>
        <div className="flex justify-between gap-3">
          <p className="flex-1">Last name</p>
          <div className="flex-1">{data.lastName}</div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex flex-col gap-4">
      {page !== "confirmation" ? (
        <div className="flex gap-4 justify-between items-center">
          <h5>Changed Passenger Details</h5>
          <small className="bg-orange-200 text-orange-600 p-1 rounded-md px-4">
            Changes Detected
          </small>
        </div>
      ) : null}
      <div className="flex gap-4 justify-between">
        <div className="flex gap-6 w-full">
          {page !== "confirmation" ? (
            <div className="flex-1">
              <Detail
                data={{
                  firstName: passenger?.name?.firstName,
                  lastName: passenger?.name?.lastName,
                }}
                label="Previous Details"
              />
            </div>
          ) : null}
          {page !== "confirmation" ? <div className="border h-full" /> : null}
          <div className="flex-1">
            <Detail
              data={{
                firstName: newData?.firstName,
                lastName: newData?.lastName,
              }}
              label="New Details"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
