import { FormControlLabel, Radio, RadioGroup, Slider } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter, setFilter } from "../../redux/reducers/tour/filterSlice";
import {
  tourFilterDestination,
  tourFilterDuration,
  tourFilterInterests,
  tourFilterLanguages,
  tourFilterServices,
  tourFilterTime,
} from "../../data/tour/tourFilter";

function TourFilter() {
  const dispatch = useDispatch();
  const { filterData } = useSelector((state) => state.tourFilter);
  const [searchInterest, setSearchInterest] = useState("");

  const activeFilterKeys = () => {
    const { price, ...data } = filterData;
    const filterArray = Object.entries(data).map(([key, value]) => ({
      key,
      value,
    }));
    const values = filterArray.filter((val) => val.value !== null);
    return values;
  };

  const activeFilter = () => {
    let active = false;
    const { price, ...data } = filterData;
    let findActive = Object.values(data).find((val) => val !== null);
    if (findActive) {
      active = true;
    }

    return active;
  };

  const activeFilterValues = () => {
    const { price, ...data } = filterData;
    let activeValues = Object.values(data).filter((val) => val !== null);
    return activeValues.length;
  };

  const handleClearFilter = () => {
    dispatch(clearFilter());
  };

  const handleRemoveFilter = (category) => {
    let data = { ...filterData };
    data[category] = null;
    dispatch(setFilter(data));
  };

  const handlePriceChange = (e) => {
    let data = { ...filterData };
    data.price = e.target.value;
    dispatch(setFilter(data));
  };

  const handleClearPrice = () => {
    let data = { ...filterData };
    data.price = null;
    dispatch(setFilter(data));
  };

  const calculatePrice = () => {
    let amount = 200000;
    if (filterData.price) {
      amount += filterData.price * 10000;
    }
    return amount.toLocaleString();
  };

  const handleTimeChange = (e) => {
    let data = { ...filterData };
    data.time = e.target.value;
    dispatch(setFilter(data));
  };

  const handleDurationChange = (e) => {
    let data = { ...filterData };
    data.duration = e.target.value;
    dispatch(setFilter(data));
  };

  const handleDestinationChange = (e) => {
    let data = { ...filterData };
    data.destination = e.target.value;
    dispatch(setFilter(data));
  };

  const handleLanguageChange = (e) => {
    let data = { ...filterData };
    data.language = e.target.value;
    dispatch(setFilter(data));
  };

  const handleInterestChange = (e) => {
    let data = { ...filterData };
    data.interest = e.target.value;
    dispatch(setFilter(data));
  };

  const handleInterestSearch = (e) => {
    setSearchInterest(e.target.value);
  };

  const handleServiceChange = (e) => {
    let data = { ...filterData };
    data.service = e.target.value;
    dispatch(setFilter(data));
  };

  return (
    <div className={Classname.container}>
      <div className={Classname.divider}></div>
      {/* Active filters */}
      {activeFilter() && (
        <>
          <div className={Classname.title}>
            <span>{activeFilterValues()} filter active</span>
            <div
              className={Classname.closeIconContainer}
              onClick={handleClearFilter}
            >
              <img src="/IconClose.svg" alt="" />
              <span>Clear filters</span>
            </div>
          </div>
          <div className={Classname.filtersContainer}>
            {activeFilterKeys().map((filter, index) => (
              <div
                className={Classname.filter}
                key={index}
                onClick={() => handleRemoveFilter(filter.key)}
              >
                <span>{filter.value}</span>
                <img src="/IconCloseWhite.svg" alt="" />
              </div>
            ))}
          </div>
          <div className={Classname.divider}></div>
        </>
      )}

      {/* Price filter */}
      <div className={Classname.title}>
        <span>Price</span>
        <div className={Classname.priceClear} onClick={handleClearPrice}>
          {filterData.price ? <span>Clear</span> : <></>}
          <img src="/IconArrowHeadUp.svg" alt="" />
        </div>
      </div>

      <span className={Classname.filterPriceAmount}>
        {calculatePrice()} - Any price
      </span>

      <Slider
        value={filterData.price || 0}
        aria-label="Default"
        onChange={handlePriceChange}
      />
      <span className={Classname.filterPriceBottom}>Any</span>
      <div className={Classname.divider}></div>

      {/* Time filter */}
      <div className={Classname.title}>
        <span>Time</span>
        <div className={Classname.priceClear}>
          <img src="/IconArrowHeadUp.svg" alt="" />
        </div>
      </div>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        className="mt-2"
        value={filterData.time}
        onChange={handleTimeChange}
      >
        {tourFilterTime.map((time, index) => (
          <span className={Classname.filterTimeOption} key={index}>
            <FormControlLabel
              value={time.value}
              control={<Radio size="small" />}
              label={time.label}
            />
            <span>{time.label1}</span>
          </span>
        ))}
      </RadioGroup>
      <div className={Classname.divider}></div>
      {/* Duration filter */}
      <div className={Classname.title}>
        <span>Duration</span>
        <div className={Classname.priceClear}>
          <img src="/IconArrowHeadUp.svg" alt="" />
        </div>
      </div>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        className="mt-2"
        value={filterData.duration}
        onChange={handleDurationChange}
      >
        {tourFilterDuration.map((duration, index) => (
          <FormControlLabel
            key={index}
            value={duration.value}
            control={<Radio size="small" />}
            label={duration.label}
          />
        ))}
      </RadioGroup>
      <div className={Classname.divider}></div>
      {/* Destination filter */}
      <div className={Classname.title}>
        <span>Destination</span>
        <div className={Classname.priceClear}>
          <img src="/IconArrowHeadUp.svg" alt="" />
        </div>
      </div>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        className="mt-2"
        value={filterData.destination}
        onChange={handleDestinationChange}
      >
        {tourFilterDestination.map((destination, index) => (
          <FormControlLabel
            key={index}
            value={destination}
            control={<Radio size="small" />}
            label={destination}
          />
        ))}
      </RadioGroup>
      <div className={Classname.divider}></div>
      {/* Language filter */}
      <div className={Classname.title}>
        <span>Languages</span>
        <div className={Classname.priceClear}>
          <img src="/IconArrowHeadUp.svg" alt="" />
        </div>
      </div>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        className="mt-2"
        value={filterData.language}
        onChange={handleLanguageChange}
      >
        {tourFilterLanguages.map((language, index) => (
          <FormControlLabel
            key={index}
            value={language}
            control={<Radio size="small" />}
            label={language}
          />
        ))}
      </RadioGroup>
      <div className={Classname.divider}></div>
      {/* Interest filter */}
      <div className={Classname.title}>
        <span>Interest</span>
        <div className={Classname.priceClear}>
          <img src="/IconArrowHeadUp.svg" alt="" />
        </div>
      </div>
      <div className={Classname.searchBarContainer}>
        <input
          type="text"
          value={searchInterest}
          onChange={handleInterestSearch}
          placeholder="Search Interests"
          className={Classname.searchInput}
        />
        <img src="/IconSearch.svg" alt="" />
      </div>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        className="mt-2"
        value={filterData.interest}
        onChange={handleInterestChange}
      >
        {tourFilterInterests.map((interest, index) => (
          <FormControlLabel
            key={index}
            value={interest}
            control={<Radio size="small" />}
            label={interest}
          />
        ))}
      </RadioGroup>
      <div className={Classname.divider}></div>
      {/* Service filter */}
      <div className={Classname.title}>
        <span>Service</span>
        <div className={Classname.priceClear}>
          <img src="/IconArrowHeadUp.svg" alt="" />
        </div>
      </div>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        className="mt-2"
        value={filterData.service}
        onChange={handleServiceChange}
      >
        {tourFilterServices.map((service, index) => (
          <FormControlLabel
            key={index}
            value={service}
            control={<Radio size="small" />}
            label={service}
          />
        ))}
      </RadioGroup>
    </div>
  );
}

export default TourFilter;

const Classname = {
  container:
    "w-full flex flex-col bg-gray-100 rounded-lg px-4 py-6 border border-gray-200 mb-20 overflow-scroll max-h-screen scroll-hide",
  title: "flex w-full justify-between items-center font-bold text-sm mt-2",
  closeIconContainer: "flex gap-2 items-center cursor-pointer",
  priceClear: "flex gap-2 items-center cursor-pointer text-primary1",
  filtersContainer: "flex flex-wrap gap-2 py-2",
  filter:
    "flex items-center cursor-pointer bg-primary1 text-white font-bold text-xxs gap-1 px-2 py-1 rounded-md",
  filterPriceBottom: "text-right text-sm mb-2",
  filterPriceAmount: "text-primary1 text-sm mt-2",
  filterTimeOption: "flex text-sm items-center justify-between",

  searchBarContainer:
    "w-full bg-white h-10 border-2 border-gray-200 rounded-lg flex items-center px-2 justify-between gap-2 mt-2 flex-shrink-0",
  searchInput: "text-sm",

  divider: "w-full border border-gray-200 my-1 mb-2",
};
