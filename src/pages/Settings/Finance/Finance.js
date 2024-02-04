import React from "react";

export default function Finance() {
  return (
    <div
      className={`flex flex-col gap-4 h-full flex-1`}
    >
      <div className="flex flex-col gap-4">
        <h5>Payouts</h5>
        You don't have any pending payout.
        <hr />
        <h2>$0</h2>
        <hr />
        <h5>Payout history</h5>
        You don't have any past payouts.
      </div>
    </div>
  );
}
