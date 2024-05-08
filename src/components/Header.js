import React, { useEffect, useState } from "react";
import SearchInput from "./form/SearchInput";
import { FormControlLabel, SwipeableDrawer } from "@mui/material";
import {
  Close,
  Home,
  Menu,
  Notifications,
  PersonRounded,
  RocketLaunchRounded,
  Settings,
  ShoppingCartOutlined,
  SupportAgentOutlined,
  SupportAgentRounded,
} from "@mui/icons-material";
import CustomMenu from "./utils/CustomMenu";
import moment from "moment/moment";
import Button1 from "./form/Button1";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/userSlice";
import { Link, useLocation } from "react-router-dom";
import IOSSwitch from "./form/IOSSwitch";
import Logo from "./Logo/Logo";
import { Icon } from "@iconify/react";
import Applications from "./Applications";
import CopyText from "./mini/CopyText";
import flight from '../assets/icons/packages/Flight.svg'
import hotel from '../assets/icons/packages/Hotel.svg'
import tour from '../assets/icons/packages/Tour.svg'
import getOwnTeams from "../controllers/settings/team/getOwnTeams";
import acceptTeamInvitation from "../controllers/settings/team/acceptTeamInvitation";
import getPoints from "../controllers/points/getPoints";
import { def } from "../config";
import { getTestLevel } from "../utils/testLevel";


const colors = ["#1E61DC", "#D9A513", "#1EA994", "#1E61DC", "#B52026"];

export default function Header() {
  const { user } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [teamInvites,setTeamInvites] = useState([])
  const [acceptLoading,setAcceptLoading] = useState(false);
  const [point,setPoint] = useState(0);
  

  async function handleTeamAccept(id,i) {
    setAcceptLoading(true);
    const res = await acceptTeamInvitation(id);
    setAcceptLoading(false);
    if(res.return) {
      setOpen(false);

      if(i!==null) handleClose(null,i)
      loadInvites();
    }
  }
  
  useEffect(() => {
    loadInvites();
    loadPoints();
  },[])

  async function loadPoints() {
    const res = await getPoints();
    if(res.return) {
      setPoint(res.data?.data?.points)
    }
  }

  const init = [
    {
      date: "9/19/2023",
      title: "Complete the quick start tutorial",
      description:
        "This tutorial shows you how easy and fast it is to start selling flights with Intraverse",
    },
    {
      date: "9/10/2023",
      title: "View our guides",
      description:
        "Visit our guide section to learn more about the Intraverse API, and start building your integration",
    },
    {
      date: "9/10/2023",
      title: "View our guides",
      description:
        "Visit our guide section to learn more about the Intraverse API, and start building your integration",
    },
    {
      date: "9/10/2023",
      title: "View our guides",
      description:
        "Visit our guide section to learn more about the Intraverse API, and start building your integration",
    },
  ]
  const [notifications,setNotification] = useState(init);


  useEffect(() => {
    if(teamInvites?.length)
      setNotification([...teamInvites?.map((obj,i) => ({...obj,
        date: moment(obj?.updatedAt)?.format('D/MM/YYYY'),
        title: 'You got a team invite for '+obj?.role+' role',
        description: <div className="py-2 flex gap-2">
          <div>
            <Button1 size='small' loading={acceptLoading} variant='outlined' onClick={(ev) => {ev?.stopPropagation();handleTeamAccept(obj?.acceptHash,i)}}>Accept</Button1>
          </div>
        </div>
      })),...init])

    //eslint-disable-next-line
  },[teamInvites])

  async function loadInvites() {
    const res = await getOwnTeams();
    if(res.return) {
      setTeamInvites(res.data?.data?.filter(obj => obj.status !== 'Active') || [])
    }
  }

  function handleLogout() {
    dispatch(logout());
  }

  function handleClose(ev,i) {
    ev?.stopPropagation();
    setNotification(arr => arr?.filter((_,ind) => ind !== i))
  }

  const location = useLocation();
  const pathname = location.pathname;
  const page = pathname.replaceAll('/','')

  const devStatus = getTestLevel(def?.devStatus);
  const activeAccount = user?.detail?.requestedVerification || user?.detail?.isVerified || user?.userType === 'Admin';

  return (
    <div>
      <div className="hidden md:flex items-center gap-10 px-md py-2">
        <Logo />

        {activeAccount ? 
          <div className="hidden lg:flex gap-4">
            <Link to='/order/new/flight' className="rounded-full py-2 px-5 text-[#233767] bg-[#E7F6FF] hover:bg-[#e0eff8] transition-all hover:shadow-lg shadow-md">
              <img alt='' src={flight} className="w-4 h-4" />
            </Link>
            {devStatus < 1 ? 
              <Link to='/order/new/hotel' className="rounded-full py-2 px-5 text-[#233767] bg-[#E7F6FF] hover:bg-[#e0eff8] transition-all hover:shadow-lg shadow-md">
                <img alt='' src={hotel} className="w-4 h-4"/>
              </Link>
            :null}
            {devStatus < 1 ? 
              <Link to='/order/new/tour' className="rounded-full py-2 px-5 text-[#233767] bg-[#E7F6FF] hover:bg-[#e0eff8] transition-all hover:shadow-lg shadow-md">
                <img alt='' src={tour} className="w-4 h-4"/>
              </Link>
            :null}
          </div>
        :null}

        {activeAccount ? 
          <div className="flex-1">
            <SearchInput autoComplete="off" exampleview={true} searchview={true} />
          </div>
        :null}
        <div className="flex flex-1 justify-end gap-5 items-center text-primary/50">
          {activeAccount && (getTestLevel() <= getTestLevel('dev')) ? 
            <div className="">
              <small>Go Live</small>
              <FormControlLabel
                control={<IOSSwitch sx={{ m: 1 }} defaultCheckedx />}
                />
            </div>
          :null}

          {/* Account Menu */
            activeAccount &&
            def.devTest ? 
          <CustomMenu
            element={
              <div className="rounded-md xbg-primary/10 w-7 h-7 px-4 flex items-center flex-center justify-center">
                <Notifications className="!text-[20px]" />
              </div>
            }
          >
            <div className="min-w-[40vw] max-w-[800px] shadow-md border">
              <div
                className="flex justify-between items-center gap-4 p-2 px-4 bg-secondary/70 "
                style={{ backdropFilter: "blur(8px)" }}
              >
                Notifications
                <small>Last updated: 2hrs ago</small>
              </div>
              <div className="p-4 bg-secondary flex flex-col gap-2 overflow-y-auto max-h-[80vh]">
                {notifications.map((obj, i) => {
                  const currentDate = moment();
                  const objDate = moment(new Date(obj.date));
                  const formattedDate = objDate.isSame(currentDate, "day")
                    ? "Today"
                    : objDate.isSame(
                        currentDate.clone().subtract(1, "day"),
                        "day",
                      )
                    ? "Yesterday"
                    : objDate.format("DD/MM/YYYY");

                  return (
                    <div
                      className={`relative bg-primary/10 p-4 rounded-r-lg border-l-[15px] `}
                      style={{ borderColor: colors[i % (colors.length - 1)] }}
                      key={i}
                    >
                      <Close onClick={(ev) => handleClose(ev,i)} className="absolute top-0 right-0 m-3 cursor-pointer" />
                      <b className="text-primary/50">{formattedDate}</b>
                      <h5>{obj.title}</h5>
                      <p>{obj.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </CustomMenu>
            :null
          }
          
          {
            activeAccount &&
            def.devTest ? 
              <SupportAgentOutlined />
            :null
          }

          {activeAccount ?
            <Link className="" variant="text" to="/settings/">
              <Icon icon="ant-design:setting-filled" className="text-xl" />
            </Link>
          :null}

          {activeAccount ? 
            <Applications />
          :null}

          <CustomMenu
            element={
              <div className="rounded-full overflow-hidden bg-theme1/10 w-9 h-9 text-lg flex items-center justify-center font-extrabold">
                {/* {user?.detail?.agencyLogo ? (
                  <img
                    src={user?.detail?.agencyLogo}
                    alt=""
                    className="object-contain w-full h-full"
                  />
                ) : (
                  )} */}
                {user?.firstName?.at(0)}
              </div>
            }
          >
            <div className="shadow-md border bg-secondary p-6 flex flex-col gap-1">
              <div className="flex flex-col gap-2 items-center">
                {user?.detail?.agencyLogo ? (
                  <img
                  src={user?.detail?.agencyLogo}
                    alt=""
                    className="max-h-[50px]"
                  />
                ) : (
                  user?.firstName?.at(0)
                )}

                <p>
                  Hi, {user?.firstName} {user?.lastName}
                </p>

                {activeAccount ? 
                  <Link to='/settings/' className="btn-theme rounded-md">Manage your business</Link>
                :null}

                <div className="w-full flex flex-col gap-2 pt-3">
                  <div className="flex flex-col">
                    <p>Intraverse Point</p>
                    <span>{point}</span>
                  </div>
                  <div className="flex flex-col">
                    <p>Referral Link</p>
                    <span className="flex gap-4">
                      <CopyText>
                        <input type='text' className="border-0" disabled value={user?.detail?.agencyURL} />
                      </CopyText>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <p>Referral Code</p>
                    <span>{user?.reference}</span>
                  </div>
                </div>
              </div>

              <Button1
                onClick={handleLogout}
                variant={"text"}
                className="text-primary"
              >
                Logout
              </Button1>
            </div>
          </CustomMenu>
        </div>
      </div>

      {/* Mobile View */}
      <div className="bg-black">
        <div className="flex md:hidden justify-between items-center bg-opacity-40 gap-6 bg-theme1 text-white py-4 px-md">
          <Logo />
          {/* <h4 className="text-secondary">Intraverse</h4> */}
          <div
            className="rounded-md bg-primary/10 w-7 h-7 text-center flex-center justify-center"
            onClick={() => setOpen(true)}
          >
            <Menu className="cursor-pointer" />
          </div>
          <SwipeableDrawer
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            anchor="right"
            SlideProps={{className: 'w-[300px] max-w-[90vw]'}}
          >
            <div className="w-full h-full shadow-md border bg-secondary flex flex-col gap-4 p-4 overflow-y-auto overflow-hidden">
              {/* {activeAccount?
                <div className="flex gap-4 justify-evenly pb-4">
                  <Link to='/order/new/flight' className="rounded-full py-2 px-5 text-[#233767] bg-[#E7F6FF] hover:bg-[#e0eff8] transition-all hover:shadow-lg shadow-md">
                    <img alt='' src={flight} className="w-4 h-4" />
                  </Link>
                  {devStatus < 1 ? 
                  <Link to='/order/new/hotel' className="rounded-full py-2 px-5 text-[#233767] bg-[#E7F6FF] hover:bg-[#e0eff8] transition-all hover:shadow-lg shadow-md">
                    <img alt='' src={hotel} className="w-4 h-4"/>
                  </Link>
                  :null}
                  {devStatus < 1 ? 
                    <Link to='/order/new/tour' className="rounded-full py-2 px-5 text-[#233767] bg-[#E7F6FF] hover:bg-[#e0eff8] transition-all hover:shadow-lg shadow-md">
                      <img alt='' src={tour} className="w-4 h-4"/>
                    </Link>
                  :null}
                </div>
              :null} */}

              <p className="p-4 py-0">
                Welcome, {user?.firstName}.
              </p>

              <CustomLink callback={() => setOpen(false)} to={"/"} active={page === ''} Icon={Home} label="Home" />

              {!activeAccount ? <CustomLink callback={() => setOpen(false)}
                to={"/getting-started/"}
                active={page === 'getting-started'}
                Icon={RocketLaunchRounded}
                className='-rotate-45'
                label="Getting Started"
              />:null}


              {activeAccount?
                <CustomLink callback={() => setOpen(false)}
                  to={"/order/"}
                  active={page === 'order'}
                  Icon={ShoppingCartOutlined}
                  label="Orders"
                />
              :null}

              {activeAccount?
                <CustomLink callback={() => setOpen(false)}
                  to={"/users/"}
                  active={page === 'users'}
                  Icon={PersonRounded}
                  label="Customers"
                />
              :null}


              {activeAccount?
                <CustomLink callback={() => setOpen(false)}
                  to={"/training/"}
                  active={page === 'training'}
                  Icon={SupportAgentRounded}
                  label="Support"
                />
              :null}

              {activeAccount?
                <CustomLink callback={() => setOpen(false)}
                  to={"/settings/"}
                  active={page === 'settings'}
                  Icon={Settings}
                  label="Settings"
                />
              :null}

              <Button1
                onClick={handleLogout}
                variant={"text"}
                className="text-primary !w-auto"
              >
                Logout
              </Button1>
            </div>
          </SwipeableDrawer>
          {/* <CustomMenu element={
              <div className='rounded-md bg-primary/10 w-7 h-7 text-center flex-center justify-center'>
                <Menu className='cursor-pointer' />
              </div>
            }>
              <div className='shadow-md border bg-secondary flex flex-col '>
                <Link className='btn-theme-light text-end' variant='text' to='/settings/'>Settings</Link>
                <Button1 onClick={handleLogout} variant={'text'} className='text-primary !w-auto'>Logout</Button1>
              </div>
          </CustomMenu> */}
        </div>
      </div>
    </div>
  );
}
function CustomLink({ to, active, Icon, label, className, callback }) {
  return (
    <Link to={to} onClick={() => callback && callback('closing')}>
      {" "}
      <Button1
        className={`!justify-start ${
          active ? "btn-theme" : "btn-theme-light"
        }  whitespace-nowrap`}
      >
        <Icon
          className={`${active ? "text-secondary/80" : ""} ${className}`}
          fontSize="small"
        />
        {label}
      </Button1>
    </Link>
  );
}
