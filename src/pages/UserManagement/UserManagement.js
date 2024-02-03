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
import { enqueueSnackbar } from "notistack";
import { ReviewBusinessProfile } from "../../components/ProfileSurvey/New/ProfileSurvey";

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
      populate: 'detail'
    }
    const res = await getAccounts((new URLSearchParams(params))?.toString());
    setLoading(false);
    if (res.return) {
      let dataMod = res.data?.data.map((data) => ({
        ...data,
        name: `${data.firstName} ${data.lastName}`,
      }));
      setData(dataMod || []);
    } else enqueueSnackbar("Failed fetching users!", { variant: "error" });
  }
  const columns = [
    {
      field: "status",
      headerName: "",
      renderCell: (params) => (
        <b className="text-theme1 font-black light-bg p-2 rounded-md">
          {params.value}
        </b>
      ),
    },
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "userId", headerName: "User Id" },
    { field: "createdAt", headerName: "Date Registered" },
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
          <div className="flex gap-2 items-center">
            <SearchInput />
            <Button1 className="h-full !w-auto sm:!px-6">Search</Button1>
          </div>
        </div>
        <CustomTable
          loading={loading}
          columns={columns}
          rows={data}
          className="min-w-[555px]"
          onRowSelectionModelChange={(val) => handleRowSelect(val)}
        />
      </div>
      <div className="flex justify-center" ref={detailRef}>
        {selected ? (
          <Detail data={selected} close={() => setSelected()} reload={() => {setSelected(); console.log('hereeee'); load()}} />
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

  console.log(" -> ",data)
  const Component = () => (
    <div className="p-4 rounded-lg light-bg flex flex-col gap-4 flex-1">
      <div className="flex gap-4 justify-between items-center py-4">
        {data.accountStatus === 'Active' ? (
          <span className="success">Active</span>
        ) : (
          <span className="error">Inactive</span>
        )}
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
        <Row name="User Id:" value={data.userId} />
        <Row name="Phone Number:" value={data.phoneNumber} />
        <Row name="Gender:" value={data.gender} />
        <Row name="DOB:" value={data.dob} />
        <Row name="Nationality:" value={data.nationality} />
        <Row name="Date Registered:" value={data.date} />
        <Row name="Completed Orders:" value={data.orders} />
      </div>

      <div className="pt-10 flex flex-col gap-4">
        <div className="flex gap-4">
          <Button1 className="flex gap-2 !items-center !bg-primary/10 !text-primary/70">
            <Icon fontSize={"18"} icon={"mdi:password-reset"} />
            Reset Password
          </Button1>
          <Button1 className="flex gap-2 !items-center !bg-primary/90">
            <Icon fontSize={"18"} icon={"mdi:user-off"} />
            Disable User
          </Button1>
        </div>
        <Button1
          className={"flex gap-2 !items-center "+(data?.detail?.isVerified?'!bg-red-500 !text-white':'')}
          onClick={() => setOpenBusiness(true)}
        >
          {data?.detail?.isVerified ? 'Deactivate Business' : 'Activate Business'}
        </Button1>
        <Button1
          className="flex gap-2 !items-center !bg-red-500"
          onClick={setOpenRemove}
        >
          <Icon fontSize={"18"} icon={"material-symbols:delete-outline"} />
          Remove User
        </Button1>
      </div>
    </div>
  );
  return (
    <div>
      <div className="hidden md:block">
        <Component />
      </div>
      <Modal1 open={openEdit} setOpen={setOpenEdit}>
        <EditForm data={data} close={() => setOpenEdit(false)} />
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
    </div>
  );
}

function EditForm({ data, close }) {
  const [obj] = useState(data);
  const fullName = obj?.name?.split(" ");
  let firstName = fullName[0];
  let lastName = fullName[1];
  return (
    <div className="p-10 flex flex-col gap-3">
      <div className="flex gap-4 justify-between pb-4">
        <h4>Edit User Details</h4>
        <p>
          User Id: <b>{data.userId}</b>
        </p>
      </div>
      <div className="flex gap-4">
        <TextInput label={"First Name"} value={firstName} />
        <TextInput label={"Last Name"} value={lastName} />
      </div>
      <EmailInput label="Email Address" />
      <PhoneNumberInput />
      <div className="flex gap-4">
        <SelectInput>
          <MenuItem>Male</MenuItem>
          <MenuItem>Female</MenuItem>
        </SelectInput>
        <TextInput type="date" label="DOB (Date of Birth)" />
        <TextInput label={"Nationality"} />
      </div>
      <div className="flex gap-3 py-5">
        <Button1 variant={"text"} className="flex-1" onClick={close}>
          Cancel
        </Button1>
        <Button1>Save Chanages</Button1>
      </div>
    </div>
  );
}

export default React.memo(UserManagement);
