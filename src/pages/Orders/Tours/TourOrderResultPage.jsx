import React, { useState } from "react";
import { tourHeaderOptions } from "../../../data/tour/tourOptions";
import TourFilter from "../../../components/filter/TourFilter";
import CalendarInput1 from "../../../components/form/CalendarInput1";
import { tourOffers } from "../../../data/tour/tourData";
import TourCard from "../../../components/tour/TourCard";
import SightCard from "../../../components/tour/SightCard";
import { Pagination } from "@mui/material";
import CountriesInput from "../../../components/form/CountriesInput";
import TourCard1 from "../../../components/tour/TourCard1";
import SortDropdown from "../../../components/filter/SortDropdown";
import ViewDropdown from "../../../components/filter/ViewDropdown";

function TourOrderResultPage() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [sort, setSort] = useState("Recommended");
  const [view, setView] = useState("Grid");

  const OnDateChange = (text) => {
    setDate(text);
  };

  const OnLocationChange = (selected) => {
    setLocation(selected);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleViewChange = (e) => {
    setView(e.target.value);
  };

  const handleSearch = () => {};

  const handlePageChange = (e, p) => {
    setPage(p);
  };

  return (
    <div className={Classname.container}>
      <div className={Classname.content}>
        {/* Page title */}
        <div className={Classname.titleContainer}>
          {`Tour > Orders >`}{" "}
          <span className={Classname.titleMain}>New Order</span>
        </div>

        <div className={Classname.cityContainer}>
          <span>London</span>
          {!edit && (
            <button className={Classname.editButton} onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>
        {edit && (
          <div className={Classname.cityEditContainer}>
            <CountriesInput
              placeholder="e.g Nigeria"
              className={Classname.cityEditCountryInput}
              label="Location"
              value={location || ""}
              onChange={(val) => OnLocationChange(val)}
            />
            <div className={Classname.cityEditCountryInput}>
              <CalendarInput1
                className={Classname.cityEditDateInput}
                value={date || ""}
                onChange={(value) => OnDateChange(value?.start || value)}
              />
            </div>
            <button className={Classname.searchButton} onClick={handleSearch}>
              Search
            </button>
          </div>
        )}

        <div className={Classname.dropdownsContainer}>
          <ViewDropdown value={view} onChange={handleViewChange} />
          <SortDropdown value={sort} onChange={handleSortChange} />
        </div>

        {/* Content */}
        <div className={Classname.resultContent}>
          {/* Filter content */}
          <div className={Classname.resultFilterContainer}>
            <div className={Classname.resultDateContainer}>
              <span className={Classname.resultDateTitle}>
                When are you travelling?
              </span>
              <CalendarInput1
                className={Classname.resultDateInput}
                value={date || ""}
                onChange={(value) => OnDateChange(value?.start || value)}
              />
            </div>
            <TourFilter />
          </div>
          {/* Tours content */}
          <div className={Classname.resultToursContainer}>
            <span className={Classname.resutlToursTitle}>Top activities</span>
            <div className={Classname.resultTopActivities}>
              {tourOffers.slice(0, 5).map((tour, index) => (
                <TourCard tour={tour} key={index} />
              ))}
            </div>
            <span className={Classname.resutlToursTitle}>
              Top sights in London
            </span>
            <div className={Classname.resultTopSights}>
              {tourOffers.slice(0, 5).map((tour, index) => (
                <SightCard tour={tour} key={index} />
              ))}
            </div>
            <span className={Classname.resutlToursTitle}>
              Available Activities ({tourOffers.length})
            </span>
            <div className={Classname.resultActivities}>
              {tourOffers.map((tour, index) =>
                view === "Grid" ? (
                  <TourCard tour={tour} key={index} />
                ) : (
                  <TourCard1 tour={tour} key={index} />
                )
              )}
            </div>
            <div className={Classname.paginationContainer}>
              <Pagination
                count={10}
                variant="outlined"
                shape="rounded"
                size="large"
                page={page}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourOrderResultPage;

const Classname = {
  container:
    "flex w-screen min-h-screen relative bg-white flex-col items-center px-3 sm:px-10 font-main",
  content: "flex w-full flex-col flex-1",
  titleContainer: "w-full text-xl font-bold text-gray-400 my-10 mb-4",
  titleMain: "text-black",

  cityContainer: "flex items-center gap-2 text-5xl font-black",
  editButton: "bg-primary1 text-sm text-white font-bold py-1 px-3 rounded-md",
  cityEditContainer: "flex items-center w-full justify-between gap-10 mt-6",
  searchButton: "bg-primary1 text-sm text-white font-bold py-1 px-3 rounded-md",
  cityEditCountryInput: "flex-1",
  cityEditDateInput: "border border-primary/20 rounded-md p-2 flex-1 w-full",

  optionsContainer:
    "w-full flex flex-wrap bg-gray-200 overflow-hidden border border-gray-300",
  option:
    "flex flex-1 px-2 sm:px-10 text-xxxs sm:text-base h-16 items-center justify-center sm:justify-start text-center sm:text-start font-bold border border-gray-300 cursor-pointer min-w-100px sm:min-w-200px ",
  optionLast: "",
  optionActive: "bg-primary1 text-white",

  dropdownsContainer: "flex justify-end items-center gap-4 mt-6",

  resultContent: "flex w-full gap-10 mt-10",
  resultFilterContainer: "flex flex-col w-72 ",
  resultDateContainer: "w-full bg-primary1 pt-6 rounded-t-xl p-4 mb-2",
  resultDateTitle: "text-white font-semibold text-sm",
  resultDateInput: "w-full bg-white border border-white rounded-md p-2 mt-2",

  resultToursContainer: "flex flex-1 flex-col",
  resutlToursTitle: "text-lg font-bold mb-4",
  resultTopActivities: "flex flex-wrap justify-between mb-10 gap-10",
  resultTopSights: "flex flex-wrap justify-between mb-10 gap-10",
  resultActivities: "flex flex-wrap justify-between gap-10 mb-10",

  paginationContainer: "flex w-full items-center justify-center mb-10",
};
