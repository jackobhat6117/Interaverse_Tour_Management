import React from "react";

function CheckBox({ name }) {
  return (
    <label>
      <input type="CheckBox" className="mr-2" />
      {name}
    </label>
  );
}

export default CheckBox;
