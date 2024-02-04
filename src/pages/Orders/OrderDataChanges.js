import { MenuItem } from '@mui/material';
import React, { createContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { alertType } from '../../data/constants';
import CustomMenu from '../../components/utils/CustomMenu';
import Icon from '../../components/HOC/Icon';
import { formatMoney } from '../../features/utils/formatMoney';
import CustomTable from '../../components/Table/CustomTable';


const ActionContext = createContext();

export const Menu = (props) => {
  const { className, label, value, showFor, hideFor, ...extraProps } = props;
  const ShowerClass = showFor?.includes(value?.toLowerCase() || value)
    ? ""
    : !showFor
    ? ""
    : "!hidden";
  const hiderClass = !hideFor?.includes(value?.toLowerCase() || value)
    ? ""
    : !hideFor
    ? ""
    : "!hidden";

  return (
    <MenuItem
      className={`${className} ${ShowerClass} ${hiderClass}`}
      value={value}
      {...extraProps}
    >
      {label || value}
    </MenuItem>
  );
};

function StatusCol({ params }) {
  const status = "Needs Review";
  const navigate = useNavigate();

  const orderType = params?.row?.type?.toLowerCase() || "type";

  return (
    <div className="flex justify-between items-center gap-2 w-full ">
      <span className={`${alertType[status.toLowerCase()]}`}>{status}</span>
      <CustomMenu
        element={
          <label className="block p-2 px-4 cursor-pointer">
            <Icon icon={"pepicons-pop:dots-y"} />
          </label>
        }
      >
        <div className="menuItem">
            <Menu
            value={status}
            label="View Order"
            onClick={() =>
                navigate(`/order/${orderType}/${params?.row?.id}?change=true`)
            }
            />
        </div>
      </CustomMenu>
    </div>
  );
}

export default function OrderDataChanges({data}) {

    const columns = [
        { field: "date", headerName: "Created Date" },
        { field: "bookingId", headerName: "ID" },
        { field: "name", headerName: "Name" ,flex: 1},
        {
          field: "provider",
          headerName: "Provider",
          renderCell: (params) => {
            let type = params.row?.type?.toLowerCase();
            return (
              <div className="flex flex-col ">
                {params.value}
                <small className={`text-xs px-2 p-1 rounded-md ${type}`}>
                  {params.row?.type}
                </small>
              </div>
            );
          },
        },
        { field: "updatedDate", headerName: "Activity Date" },
        { field: "bookRef", headerName: "PNR" },
        {
          field: "status",
          headerName: "Status",
          minWidth: 160,
          renderCell: (params) => (
            <StatusCol
              params={params}
            />
          ),
        },
      ];
    
  return (
    <div>
        <CustomTable rows={data} columns={columns} />
    </div>
  )
}
