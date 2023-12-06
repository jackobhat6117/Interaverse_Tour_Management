import React from "react";
import SelectInput from "./SelectInput";
import { MenuItem } from "@mui/material";
import CalendarInput1 from "./CalendarInput1";

export default function FilterCalendar({ dateFilter, setDateFilter }) {
  return (
    <div className="bg-primary/10 p-2 rounded-md flex-1  flex items-center gap-2">
      <SelectInput
        size="small"
        label={""}
        className="bg-secondary"
        value={dateFilter?.range || "week"}
        onChange={(event) => {
          if (setDateFilter) {
            setDateFilter({
              ...dateFilter,
              range: event.target.value,
            });
          }
        }}
      >
        <MenuItem value="week">Weekly</MenuItem>
        <MenuItem value="month">Monthly</MenuItem>
        <MenuItem value="year">Yearly</MenuItem>
        <MenuItem value="All">All</MenuItem>
      </SelectInput>
      <CalendarInput1
        onChange={(value) => {
          if (setDateFilter) {
            setDateFilter({
              ...dateFilter,
              date: new Date(value.start).toLocaleDateString(),
            });
          }
        }}
      />
    </div>
  );
}
