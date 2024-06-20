import React, { useEffect, useReducer, useRef, useState } from "react";
import SearchInput from "../../components/form/SearchInput";
import Button1 from "../../components/form/Button1";
import CustomTable from "../../components/Table/CustomTable";
import { CloseOutlined } from "@mui/icons-material";
import { ProfilePicture } from "../../components/form/ProfilePicture";
import { Icon } from "@iconify/react";
import Modal1 from "../../components/DIsplay/Modal/Modal1";
import TextInput from "../../components/form/TextInput";
import EmailInput from "../../components/form/EmailInput";
import PhoneNumberInput from "../../components/form/PhoneNumberInput";
import SelectInput from "../../components/form/SelectInput";
import { MenuItem } from "@mui/material";
import getAccounts from "../../controllers/user/getAccounts";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { ReviewBusinessProfile } from "../../components/ProfileSurvey/New/ProfileSurvey";
import moment from "moment";
import activateAccount from "../../controllers/user/activateAccount";
import deActivateAccount from "../../controllers/user/deactivateAccount";
import { useDispatch, useSelector } from "react-redux";
import updateUsersProfile from "../../controllers/user/updateUsersProfile";
import { alertType } from "../../data/constants";
import BusinessDocument from "../../components/ProfileSurvey/New/BusinessDocument";
import topupAgencyWallet from "../../controllers/settings/wallet/topupAgencyWallet";

const temp = [
  {
    status: "OK",
    name: "John Doe",
    email: "johndoe@gmail.com",
    phoneNumber: "+234-940067965",
    gender: "Male",
    dob: "23rd Feb,1999",
    nationality: "Nigerian",
    orders: 5,
    userId: "123",
    date: "7:30pm 24/04/2023",
    active: true,
  },
  {
    status: "SA",
    name: "Doe John",
    email: "doecho@gmail.com",
    phoneNumber: "+234-940067965",
    gender: "Male",
    dob: "23rd Feb,1999",
    nationality: "Nigerian",
    orders: 10,
    userId: "123",
    date: "7:30pm 24/04/2023",
    active: false,
  },
];
function UserManagement() {
  const [selected, setSelected] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const detailRef = useRef();

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if(selected && detailRef.current)
      detailRef.current?.scrollIntoView({behavior: 'smooth'})
  },[selected])

  async function load() {
    setLoading(true);
    const params = {
      populate: 'detail',
      limit: 0
    }
    const res = await getAccounts((new URLSearchParams(params))?.toString());
    setLoading(false);
    if (res.return) {
      let dataMod = res.data?.data.map((data) => ({
        ...data,
        id: data._id,
        email: data?.email,
        businessStatus: data?.detail?.isVerified ? 'Verified' : data?.detail?.requestedVerification ? 'Requested Verification' : 'Not Submited',
        name: `${data.firstName} ${data.lastName}`,
      }));
      setData(dataMod || []);
      if(selected?._id)
        setSelected(
          dataMod.find((obj, i) => {
            return obj._id === selected?._id;
          }),
        )
    } else enqueueSnackbar("Failed fetching users!", { variant: "error" });

  }
  const columns = [
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email"},
    { field: "businessStatus", headerName: 'Business Status'},
    // { field: "_id", headerName: "User Id" },
    { field: "createdAt", headerName: "Date Registered",
      renderCell: (params) => (
        moment(params.value)?.format('YYYY/MM/DD hh:mm a')
      )
    },
    {field: 'accountStatus', headerName: 'Account Status',
      renderCell: (params) => (
        <b className={`!bg-transparent font-black light-bg p-2 rounded-md ${alertType[params.value?.toLowerCase()]}`}>
          {params?.value}
        </b>
      )
    }
  ];

  function handleRowSelect(rows) {
    if (rows.length)
      setSelected(
        data.find((obj, i) => {
          return obj.id === rows[0];
        }),
      );
  }

  return (
    <div className="pd-md flex flex-wrap-reverse gap-4">
      <div className="flex flex-1 min-w-[400px] flex-col gap-10 overflow-hidden">
        <div className="flex flex-col gap-4">
          <h5>User Management</h5>
          {/* <div className="flex gap-2 items-center">
            <SearchInput />
            <Button1 className="h-full !w-auto sm:!px-6">Search</Button1>
          </div> */}
        </div>
        <CustomTable
          searchProps={{
            searchable: true
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          pageSizeOptions={[10,20,50,100]}
          loading={loading}
          columns={columns}
          rows={data}
          className="min-w-[555px]"
          onRowSelectionModelChange={(val) => handleRowSelect(val)}
        />
      </div>
      <div className="flex justify-center" ref={detailRef}>
        {selected ? (
          <Detail data={selected} close={() => setSelected()} reload={() => {load()}} />
        ) : null}
      </div>
    </div>
  );
}

const Row = ({ name, value }) => (
  <div className="flex gap-2">
    <p className="w-[30%]">{name}</p>
    <b className="w-[68%]">{value}</b>
  </div>
);

function Detail({ data, close, reload }) {
  const [openRemove, setOpenRemove] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openBusiness,setOpenBusiness] = useState(false);
  const [loadings,setLoadings] = useState({enableUser:false,disableUser: false})
  const [openWalletTopup,setOpenWalletTopup] = useState(false);

  const [openDocUpload,setOpenDocUpload] = useState(false);
  
  async function enableUser() {
    setLoadings({...loadings,enableUser: true})
    const res = await activateAccount(data?._id);
    if(res.return) {
      reload && reload();
    }
    setTimeout(() => setLoadings({...loadings,enableUser: false}),2000)
  }
  async function disableUser() {
    setLoadings({...loadings,disableUser: true})
    const res = await deActivateAccount(data?._id);
    if(res.return) {
      reload && reload();
    }
    setTimeout(() => setLoadings({...loadings,disableUser: false}),2000)
  }

  async function handleDocUpload(payload) {

    const res = await updateUsersProfile(data?._id,payload)
    if(res.return) {
      enqueueSnackbar('Documents Uploaded',{variant: 'success'})
      setOpenDocUpload(false);
      reload && reload()
    } else enqueueSnackbar(res.msg,{variant: 'error'})
    return res.return
  }

  console.log(" -> ",data)
  const Component = () => (
    <div className="p-4 rounded-lg light-bg flex flex-col gap-4 flex-1">
      <div className="flex gap-4 justify-between items-center py-4">
        <div className='flex flex-col gap-1 text-center'>
          <small>Account Status</small>
          {data.accountStatus === 'Active' ? (
            <span className="success">Active</span>
          ) : (
            <span className="error">Inactive</span>
          )}
        </div>
        <div className="p-2 bg-secondary">
          <CloseOutlined
            onClick={() => close()}
            className="m-1 text-2xl cursor-pointer hover:scale-110"
          />
        </div>
      </div>

      <div className="flex gap-4 justify-between">
        <ProfilePicture readOnly />
        <div className="flex flex-col gap-3 flex-1">
          <h2>{data.name}</h2>
          <p>{data.email}</p>
        </div>
        <div
          onClick={() => setOpenEdit(true)}
          className="flex flex-col gap-1 justify-center bg-primary text-primary/50 hover:text-primary font-bold bg-opacity-5 p-5 px-10 cursor-pointer hover:bg-opacity-10"
        >
          <Icon icon="tabler:edit" className="text-2xl translate-x-[3px]" />
          Edit
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* <Row name="User Id:" value={data?.detail?._id} /> */}
        <Row name="Id" value={data?._id} />
        <Row name="Phone Number" value={data?.phone} />
        <Row name="User Type" value={data?.userType} />
        {/* <Row name="DOB" value={data.dob} /> */}
        {/* <Row name="Nationality" value={data.nationality} /> */}
        <Row name="Date Registered" value={moment(data?.createdAt)?.format('YYYY/DD/MM hh:mm a')} />
        {/* <Row name="Completed Orders:" value={data.orders} /> */}
      </div>

      <div className="pt-10 flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            {/* <Button1 onClick={() => setOpenWalletTopup(true)}>
              Topup Wallet
            </Button1> */}
            <WalletTopup data={data} reload={() => reload && reload()} />
          </div>
          <div className='flex-1'>
            <Button1 className='flex items-center gap-2' onClick={() => setOpenDocUpload(true)}>
              <Icon icon='ep:document' />
              Upload Document
            </Button1>
          </div>
        </div>
        <div className="flex gap-4">
          <Button1 disabled className="flex gap-2 !items-center !bg-primary/10 !text-primary/70">
            <Icon fontSize={"18"} icon={"mdi:password-reset"} />
            Reset Password
          </Button1>
          {data?.accountStatus === 'Active' ? 
            <Button1 loading={loadings.disableUser} className="flex gap-2 !border-secondary !text-secondary !items-center !bg-primary/90" onClick={disableUser}>
              <Icon fontSize={"18"} icon={"mdi:user-off"} />
              Disable User
            </Button1>
          :
            <Button1 loading={loadings.enableUser} className="flex gap-2 !border-secondary !text-secondary !items-center !bg-primary/90" onClick={enableUser}>
              <Icon fontSize={"18"} icon={"mdi:user"} />
              Enable User
            </Button1>
          }
        </div>
        <div title={!data?.detail?.isVerified && !data?.detail?.requestedVerification ? 'User havent submitted bussiness information':null}>
          <Button1
            disabled={!data?.detail?.isVerified && !data?.detail?.requestedVerification}
            className={"flex gap-2 !items-center "+(data?.detail?.isVerified?'!bg-red-500 !text-white':'')}
            onClick={() => setOpenBusiness(true)}
          >
            {data?.detail?.isVerified ? 'Deactivate Business' : 'Activate Business'}
          </Button1>
        </div>
        {/* <Button1
          className="flex gap-2 !items-center !bg-red-500"
          onClick={setOpenRemove}
        >
          <Icon fontSize={"18"} icon={"material-symbols:delete-outline"} />
          Remove User
        </Button1> */}
      </div>
    </div>
  );
  return (
    <div>
      <div className="hidden md:block">
        <Component />
      </div>
      <Modal1 open={openEdit} setOpen={setOpenEdit}>
        <EditForm data={data} close={() => setOpenEdit(false)} reload={() => {reload()}} />
      </Modal1>
      <Modal1 open={openRemove} setOpen={setOpenRemove} className={""}>
        <div className="p-10 flex flex-col gap-5 items-center justify-center max-w-[400px]">
          <h4>Delete {data.name}</h4>
          <p>
            This is to inform you that you’re about to delete a user called{" "}
            {data.name} from your data base. Note that is action is permanent
            and this user information cannot be recovered.
          </p>
          <div className="flex py-5 gap-2 w-full">
            <Button1
              className="w-auto flex-1"
              onClick={() => setOpenRemove(false)}
            >
              Cancel
            </Button1>
            <Button1 className="btn !bg-red-500 ">Delete</Button1>
          </div>
        </div>
      </Modal1>
      <Modal1 open={openBusiness} setOpen={setOpenBusiness}>
        <div className="card p-10">
          <ReviewBusinessProfile user={data} callback={(res) => {res && setOpenBusiness(false); reload && reload()}} />
        </div>
      </Modal1>
      <div className="md:hidden">
        <Modal1 open={data} setOpen={close} className={"md:hidden"}>
          <Component />
        </Modal1>
      </div>
      <Modal1 open={openDocUpload} setOpen={setOpenDocUpload}>
        <div className="p-10">
          <BusinessDocument updateProfile={handleDocUpload} next={() => console.log('callback')} user={data} />
        </div>
      </Modal1>
    </div>
  );
}

function WalletTopup({reload,data:defData}) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({ ...(defData || {}),amount: undefined });
    const [loading,setLoading] = useState(false);
  
    console.log(defData)
    const handleTopUp = async () => {
      setLoading(true);
      const res = await topupAgencyWallet({
        accountId: data?._id,
        amount: Number(data?.amount),
      });
      setLoading(false);
      if(res.return) {
        enqueueSnackbar('Wallet debited successully',{variant: 'success'})
        setOpen(false);
      } else enqueueSnackbar(res.msg,{variant: 'error'})
    };
  
    return (
      <div>
        <Button1 onClick={() => setOpen(true)}>Top-up Balance</Button1>
        <Modal1 open={open} setOpen={setOpen}>
          <div className="p-4 flex flex-col gap-6 max-w-[800px]">
            <h4>Top-up balance</h4>
            <TextInput
              label="Amount"
              type="number"
              value={data.amount}
              onChange={(ev) => setData({ ...data, amount: ev.target.value })}
              InputProps={{
                endAdornment: "NGN",
              }}
            />
          </div>
          <div className="flex gap-2 p-4">
            <Button1 className="btn-theme-light" onClick={() => setOpen(false)}>
              Cancel
            </Button1>
            {/* <PaystackButton
              config={{
                amount: data.amount * 100,
                reference: generateRef("WTR-"),
                email: user?.email,
              }}
              onSuccess={(reference) => {
                handleTopUp(reference?.reference);
              }}
            > */}
              <Button1 loading={loading} onClick={handleTopUp} className={"whitespace-nowrap"}>Save Changes</Button1>
            {/* </PaystackButton> */}
          </div>
        </Modal1>
      </div>
    );
  }
  
function EditForm({ data:defData, close, reload }) {
  const [data,setData] = useState(defData);
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  console.log(defData)

  async function handleSubmit(ev) {
    ev?.preventDefault();

    const {firstName,lastName,email,phone} = data;
    setLoading(true);
    const res = await updateUsersProfile(data?._id,{firstName,lastName,email,phone})
    setLoading(false);
    if(res.return) {
      enqueueSnackbar('Success',{variant: 'success'})
      close && close();
      reload && reload();
    } else enqueueSnackbar(res.msg,{variant: 'error'})
  }
  
  return (
    <form onSubmit={handleSubmit} className="p-10 flex flex-col gap-3">
      <div className="flex gap-4 items-center flex-wrap justify-between pb-4">
        <h5>Edit User Details</h5>
        <p>
          User Id: <b>{data?._id}</b>
        </p>
      </div>
      <div className="flex gap-4">
        <TextInput label={"First Name"} value={data?.firstName} onChange={(ev) => setData({...data,firstName: ev.target.value})} />
        <TextInput label={"Last Name"} value={data?.lastName} onChange={(ev) => setData({...data,lastName: ev.target.value})} />
      </div>
      <EmailInput value={data?.email} onChange={(ev) => setData({...data,email: ev.target.value})} label="Email Address" />
      <PhoneNumberInput value={data?.phone} label='Phone Number' onChange={(val) => setData({...data,phone: val})} />
      {/* <div className="flex gap-4">
        <SelectInput>
          <MenuItem>Male</MenuItem>
          <MenuItem>Female</MenuItem>
        </SelectInput>
        <TextInput type="date" label="DOB (Date of Birth)" />
        <TextInput label={"Nationality"} />
      </div> */}
      <div className="flex gap-3 py-5">
        <Button1 type='button' variant={"text"} className="flex-1" onClick={close}>
          Cancel
        </Button1>
        <Button1 type='submit' loading={loading}>Save Chanages</Button1>
      </div>
    </form>
  );
}

export default React.memo(UserManagement);
