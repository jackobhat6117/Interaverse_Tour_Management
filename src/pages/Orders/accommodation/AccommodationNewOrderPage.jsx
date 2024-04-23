import React, { useState } from "react";
import CalendarInput1 from "../../../components/form/CalendarInput1";
import CountriesInput from "../../../components/form/CountriesInput";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function AccommodationNewOrderPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [coutry, setCountry] = useState(null);
  const [traveler, setTraveler] = useState(null);

  const OnDateChange = (text) => {
    setDate(text);
  };

  const OnCountryChange = (selected) => {
    setCountry(selected);
  };

  const handleChangeTraveler = (e) => {};

  const OnSearch = () => {
    navigate("/accommodation/results");
  };

  return (
    <div className={Classname.container}>
      <div className={Classname.content}>
        {/* Page title */}
        <div className={Classname.titleContainer}>
          {`Stays > Orders >`}{" "}
          <span className={Classname.titleMain}>New Order</span>
        </div>

        {/* Form container */}
        <div className={Classname.formContainer}>
          <div className={Classname.form}>
            <span className={Classname.formTitle}>Search for Stays</span>
            <span className={Classname.formInputLabel}>Enter location</span>
            <CountriesInput
              placeholder="e.g Nigeria"
              label=" "
              value={coutry || ""}
              onChange={(val) => OnCountryChange(val)}
            />
            <span className={Classname.formInputLabel}>Select dates</span>
            <CalendarInput1
              className="w-full border border-primary/20 rounded-md p-2"
              value={date || ""}
              onChange={(value) => OnDateChange(value?.start || value)}
            />
            <span className={Classname.formInputLabel}>Travelers</span>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={traveler}
                onChange={handleChangeTraveler}
                className="h-10"
              >
                <MenuItem value={1}>1 Adult, 2 Children</MenuItem>
                <MenuItem value={2}>1 Adult, 2 Children</MenuItem>
                <MenuItem value={2}>1 Adult, 2 Children</MenuItem>
              </Select>
            </FormControl>
            <button className={Classname.formButton} onClick={OnSearch}>
              Search for stays
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccommodationNewOrderPage;

const Classname = {
  container:
    "flex w-screen min-h-screen relative bg-white flex-col items-center px-3 sm:px-10 font-main",
  content: "flex w-full flex-col flex-1 ",
  titleContainer: "w-full text-xl font-bold text-gray-400 my-10",
  titleMain: "text-black",

  formContainer: "flex w-full flex-1 items-center justify-center px-0 sm:px-10",
  form: "w-full max-w-600px flex flex-col",
  formTitle: "font-black text-primaryText text-lg mb-6",
  formInputLabel: "flex font-bold text-base mb-2 mt-6 text-gray-500",
  formButton:
    "w-full text-white bg-theme1 font-bold h-12 flex items-center justify-center rounded-xl mt-10",
};
