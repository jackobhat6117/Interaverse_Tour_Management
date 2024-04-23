import { FormControlLabel, Radio, RadioGroup, Slider } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilterStays,
  setStaysFilter,
} from "../../redux/reducers/tour/filterSlice";
import {
  stayAmenitiesFilters,
  stayDayFilters,
  stayPaymentTypeFilters,
  stayPopularFilters,
  stayPropertyFilters,
  stayRatingFilters,
} from "../../data/tour/stayFilter";

function StayFilter() {
  const dispatch = useDispatch();
  const { filterStayData } = useSelector((state) => state.tourFilter);

  const activeFilterKeys = () => {
    const { price, propertyName, ...data } = filterStayData;
    const filterArray = Object.entries(data).map(([key, value]) => ({
      key,
      value,
    }));
    const values = filterArray.filter((val) => val.value !== null);
    return values;
  };

  const activeFilter = () => {
    let active = false;
    const { price, propertyName, ...data } = filterStayData;
    let findActive = Object.values(data).find((val) => val !== null);
    if (findActive) {
      active = true;
    }

    return active;
  };

  const activeFilterValues = () => {
    const { price, propertyName, ...data } = filterStayData;
    let activeValues = Object.values(data).filter((val) => val !== null);
    return activeValues.length;
  };

  const handleclearFilterStays = () => {
    dispatch(clearFilterStays());
  };

  const handleRemoveFilter = (category) => {
    let data = { ...filterStayData };
    data[category] = null;
    dispatch(setStaysFilter(data));
  };

  const handlePriceChange = (e) => {
    let data = { ...filterStayData };
    data.price = e.target.value;
    dispatch(setStaysFilter(data));
  };

  const handleClearPrice = () => {
    let data = { ...filterStayData };
    data.price = null;
    dispatch(setStaysFilter(data));
  };

  const calculatePrice = () => {
    let amount = 200000;
    if (filterStayData.price) {
      amount += filterStayData.price * 10000;
    }
    return amount.toLocaleString();
  };

  const handlePopularFilterChange = (e) => {
    let data = { ...filterStayData };
    data.popular = e.target.value;
    dispatch(setStaysFilter(data));
  };

  const handleRatingFilterChange = (e) => {
    let data = { ...filterStayData };
    data.rating = e.target.value;
    dispatch(setStaysFilter(data));
  };

  const handleDayFilterChange = (day) => {
    let data = { ...filterStayData };
    data.day = day;
    dispatch(setStaysFilter(data));
  };

  const handlePaymentFilterChange = (e) => {
    let data = { ...filterStayData };
    data.payment = e.target.value;
    dispatch(setStaysFilter(data));
  };

  const handlePropertyChange = (e) => {
    let data = { ...filterStayData };
    data.property = e.target.value;
    dispatch(setStaysFilter(data));
  };

  const handlePropertyNameChange = (e) => {
    let data = { ...filterStayData };
    data.propertyName = e.target.value;
    dispatch(setStaysFilter(data));
  };

  const handleAmenitiesChange = (e) => {
    let data = { ...filterStayData };
    data.amenities = e.target.value;
    dispatch(setStaysFilter(data));
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
              onClick={handleclearFilterStays}
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

      {/* Interest filter */}
      <div className={Classname.title}>
        <span>Search by property name</span>
        <div className={Classname.priceClear}>
          <img src="/IconArrowHeadUp.svg" alt="" />
        </div>
      </div>
      <div className={Classname.searchBarContainer}>
        <input
          type="text"
          value={filterStayData.handlePropertyNameChange}
          onChange={handlePropertyNameChange}
          placeholder="Search Property"
          className={Classname.searchInput}
        />
        <img src="/IconSearch.svg" alt="" />
      </div>

      <div className={Classname.divider}></div>

      {/* Price filter */}
      <div className={Classname.title}>
        <span>Price</span>
        <div className={Classname.priceClear} onClick={handleClearPrice}>
          {filterStayData.price ? <span>Clear</span> : <></>}
          <img src="/IconArrowHeadUp.svg" alt="" />
        </div>
      </div>

      <span className={Classname.filterPriceAmount}>
        {calculatePrice()} - Any price
      </span>

      <Slider
        value={filterStayData.price || 0}
        aria-label="Default"
        onChange={handlePriceChange}
      />
      <span className={Classname.filterPriceBottom}>Any</span>
      <div className={Classname.divider}></div>

      {/* Popular filter */}
      <div className={Classname.title}>
        <span>Popular Filters</span>
        <div className={Classname.priceClear}>
          <img src="/IconArrowHeadUp.svg" alt="" />
        </div>
      </div>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        className="mt-2"
        value={filterStayData.popular}
        onChange={handlePopularFilterChange}
      >
        {stayPopularFilters.map((popular, index) => (
          <span className={Classname.filterTimeOption} key={index}>
            <FormControlLabel
              value={popular}
              control={<Radio size="small" />}
              label={popular}
            />
          </span>
        ))}
      </RadioGroup>
      <div className={Classname.divider}></div>
      {/* Guest rating filter */}
      <div className={Classname.title}>
        <span>Guest rating</span>
        <div className={Classname.priceClear}>
          <img src="/IconArrowHeadUp.svg" alt="" />
        </div>
      </div>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        className="mt-2"
        value={filterStayData.rating}
        onChange={handleRatingFilterChange}
      >
        {stayRatingFilters.map((rating, index) => (
          <FormControlLabel
            key={index}
            value={rating.value}
            control={<Radio size="small" />}
            label={rating.label}
          />
        ))}
      </RadioGroup>
      <div className={Classname.divider}></div>
      {/* Day filter */}
      <div className={Classname.title}>
        <span>Day</span>
        <div className={Classname.priceClear}>
          <img src="/IconArrowHeadUp.svg" alt="" />
        </div>
      </div>
      <div className={Classname.daysContainer}>
        {stayDayFilters.map((day, index) => (
          <div
            className={`${Classname.day} ${
              filterStayData.day === day.value && Classname.dayActive
            }`}
            key={index}
            onClick={() => handleDayFilterChange(day.value)}
          >
            {day.label}
          </div>
        ))}
      </div>
      <div className={Classname.divider}></div>
      {/* Payment filter */}
      <div className={Classname.title}>
        <span>Payment Type</span>
        <div className={Classname.priceClear}>
          <img src="/IconArrowHeadUp.svg" alt="" />
        </div>
      </div>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        className="mt-2"
        value={filterStayData.payment}
        onChange={handlePaymentFilterChange}
      >
        {stayPaymentTypeFilters.map((payment, index) => (
          <FormControlLabel
            key={index}
            value={payment.value}
            control={<Radio size="small" />}
            label={payment.label}
          />
        ))}
      </RadioGroup>
      <div className={Classname.divider}></div>
      {/* Property filter */}
      <div className={Classname.title}>
        <span>Property Type</span>
        <div className={Classname.priceClear}>
          <img src="/IconArrowHeadUp.svg" alt="" />
        </div>
      </div>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        className="mt-2"
        value={filterStayData.property}
        onChange={handlePropertyChange}
      >
        {stayPropertyFilters.map((property, index) => (
          <FormControlLabel
            key={index}
            value={property}
            control={<Radio size="small" />}
            label={property}
          />
        ))}
        <span className="ml-6 mt-2 mb-2">More ... </span>
      </RadioGroup>
      <div className={Classname.divider}></div>

      {/* Amenities filter */}
      <div className={Classname.title}>
        <span>Amenities</span>
        <div className={Classname.priceClear}>
          <img src="/IconArrowHeadUp.svg" alt="" />
        </div>
      </div>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        className="mt-2"
        value={filterStayData.property}
        onChange={handleAmenitiesChange}
      >
        {stayAmenitiesFilters.map((amenities, index) => (
          <FormControlLabel
            key={index}
            value={amenities}
            control={<Radio size="small" />}
            label={amenities}
          />
        ))}
        <span className="ml-6 mt-2 mb-2">More ... </span>
      </RadioGroup>
    </div>
  );
}

export default StayFilter;

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
  daysContainer: "flex flex-full items-center flex-wrap gap-2 my-4",
  day: "w-7 h-7 rounded-full flex items-center justify-center text-white font-bold bg-primary1 text-xs cursor-pointer opacity-40",
  dayActive: "opacity-100",

  searchBarContainer:
    "w-full bg-white h-10 border-2 border-gray-200 rounded-lg flex items-center px-2 justify-between gap-2 mt-2 flex-shrink-0 mb-4",
  searchInput: "text-sm",

  divider: "w-full border border-gray-200 my-1 mb-2",
};
