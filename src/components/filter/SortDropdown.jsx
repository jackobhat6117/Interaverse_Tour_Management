import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function SortDropdown({ classname, value, onChange }) {
  return (
    <div className={`${Classname.container} ${classname}`}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Sort"
          onChange={onChange}
          className={Classname.select}
        >
          <MenuItem value="Recommended">Recommended</MenuItem>
          <MenuItem value="Recent">Recent</MenuItem>
          <MenuItem value="Price">Price</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SortDropdown;

const Classname = {
  container: "w-52",
  select: "bg-gray-100 text-xs",
};
