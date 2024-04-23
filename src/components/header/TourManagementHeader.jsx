import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setManagementTab } from "../../redux/reducers/tour/tabSlice";

function TourManagementHeader() {
  const { managementTab } = useSelector((state) => state.tabSlice);
  const dispatch = useDispatch();

  const onTabSelect = (selected) => {
    dispatch(setManagementTab(selected));
  };

  return (
    <div className={Classname.container}>
      <div className={Classname.content}>
        <div className={Classname.tab} onClick={() => onTabSelect("home")}>
          <div className={Classname.tabContent}>
            <img src="/IconTabHome.svg" alt="" className={Classname.tabIcon} />
            <span>Home</span>
          </div>
          {managementTab === "home" && (
            <div className="w-full h-1 bg-primary1"></div>
          )}
        </div>
        <div className={Classname.tab} onClick={() => onTabSelect("create")}>
          <div className={Classname.tabContent}>
            <img
              src="/IconTagCreate.svg"
              alt=""
              className={Classname.tabIcon}
            />
            <span>Create</span>
          </div>
          {managementTab === "create" && (
            <div className="w-full h-1 bg-primary1"></div>
          )}
        </div>
        <div className={Classname.tab} onClick={() => onTabSelect("manage")}>
          <div className={Classname.tabContent}>
            <img
              src="/IconTabManage.svg"
              alt=""
              className={Classname.tabIcon}
            />
            <span>Manage</span>
          </div>
          {managementTab === "manage" && (
            <div className="w-full h-1 bg-primary1"></div>
          )}
        </div>
        <div className={Classname.tab} onClick={() => onTabSelect("book")}>
          <div className={Classname.tabContent}>
            <img src="/IconTabBook.svg" alt="" className={Classname.tabIcon} />
            <span>Booking</span>
          </div>
          {managementTab === "book" && (
            <div className="w-full h-1 bg-primary1"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TourManagementHeader;

const Classname = {
  container:
    "w-screen flex items-center justify-center shadow-md fixed bg-white",
  content: "flex w-full max-w-7xl",
  tab: "flex flex-1 items-center justify-center font-bold text-gray-500 cursor-pointer flex-col",
  tabContent: "flex items-center gap-2 py-4",
  tabIcon: "",
};
