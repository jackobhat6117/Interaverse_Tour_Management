import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function ViewDropdown({ classname, value, onChange }) {
  return (
    <div className={`${Classname.container} ${classname}`}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Listing</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Listing"
          onChange={onChange}
          className={Classname.select}
        >
          <MenuItem value="Grid">
            <div className={Classname.menu}>
              <img src="/IconGrid.svg" alt="" className={Classname.icon} />
              <span>Grid View</span>
            </div>
          </MenuItem>
          <MenuItem value="List">
            <div className={Classname.menu}>
              <img src="/IconList.svg" alt="" className={Classname.icon} />
              <span>List View</span>
            </div>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default ViewDropdown;

const Classname = {
  container: "w-52",
  select: "bg-gray-100 text-xs flex flex-row",
  icon: "mr-2 w-4 h-4 object-contain",
  menu: "flex items-center",
};
