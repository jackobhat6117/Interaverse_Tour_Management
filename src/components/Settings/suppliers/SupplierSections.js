import React, { useCallback, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ToggleSwitch from './ToggleSwitch';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Modal from './Modal'; 
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Icon from '../../HOC/Icon';
import { useSnackbar } from 'notistack';
import addDealCode from '../../../controllers/settings/dealCodes/addDealCode';
import getDealCodes from '../../../controllers/settings/dealCodes/getDealCodes';
import deleteDealCode from '../../../controllers/settings/dealCodes/deleteDealCode';
import { Link } from 'react-router-dom';
import getSuppliersName from '../../../controllers/settings/supplier/getSuppliers';
import Loading from '../../animation/loading';
import DateTimeFormatter from '../../formatDate/FormatDate';
import { IndeterminateCheckBox } from '@mui/icons-material';
import LoadingBar from '../../animation/LoadingBar';




  const SupplierSection = ({allSuppliers, localFlights}) => {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDealCodeModalOpen, setIsDealCodeModalOpen] = useState(false); 
  const [isPaymentTimeLimitModalOpen, setIsPaymentTimeLimitModalOpen] = useState(false); 
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState("")
  const [dealCodes, setDealCodes] = useState([])
  const { enqueueSnackbar } = useSnackbar();
  
  
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDealCodeClick = () => {
    setIsDealCodeModalOpen(true); 
    handleMenuClose(); 
  };

  const handlePaymentTimeLimitClick = () => {
    setIsPaymentTimeLimitModalOpen(true); 
    handleMenuClose();
  };


  
const loadDealCodes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getDealCodes();
      if (res?.return === 1) {
        console.log('thisres', res)
        setDealCodes(res.data.data);

      }
    } catch (error) {
      enqueueSnackbar("Error loading deal codes.", { variant: "error" });
    }
    setLoading(false);
  }, [enqueueSnackbar]);

  useEffect(() => {
    loadDealCodes();
  }, [loadDealCodes]);

  const handleCreateDealCode = async () => {
    setLoading(true);
    try {
      const data = { airline: "VS", code };
      const res = await addDealCode(data);
      
      if (res?.return === 1) {
        setCode(code => code = "")
        
        enqueueSnackbar("Deal Code Created Successfully.", { variant: "success" });
        await loadDealCodes(); 
    
      } else {
        enqueueSnackbar("Failed to create deal code.", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error creating deal code.", { variant: "error" });
    }
    setLoading(false);
    setIsDealCodeModalOpen(false);
  };

  const handleDeleteDealCode = async (id) => {
    setLoading(true);
    try {
      const res = await deleteDealCode(id);
      if (res?.return === 1) {
        enqueueSnackbar("Deal Code Deleted Successfully.", { variant: "success" });
        await loadDealCodes(); 
      } else {
        enqueueSnackbar("Failed to delete deal code.", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error deleting deal code.", { variant: "error" });
    }
    setLoading(false);
  };

   loading  &&  <LoadingBar /> 

  return (
    <div className="mb-6">
        <div>
         

     {allSuppliers && allSuppliers.length > 0 ?  (
            <TableContainer component={Paper} elevation={0}>
 
            <Table sx={{ minWidth: 650 }} aria-label="supplier table">
                <TableHead>
                
                <TableRow>
                    <TableCell className="bg-[#F0F6FC] text-gray-700 !font-semibold px-4">
                    {'All Suppliers'}
                    </TableCell>
                    <TableCell align="right" className="bg-[#F0F6FC] text-gray-700 !font-semibold !px-10">
                    Actions
                    </TableCell>
                </TableRow>
                </TableHead>

    <TableBody>
      {allSuppliers?.map((item, index) => (
        <TableRow
          key={IndeterminateCheckBox}
          sx={{
            cursor: 'pointer',
            '&:hover': { backgroundColor: '' },
            '& .MuiTableCell-root': { padding: '10px 8px' },
          }}
        >
          <TableCell component="th" scope="row">
            <div className="flex items-center gap-2">
              <p className="h-10 w-10 rounded-full bg-blue-50 flex justify-center items-center text-sm">
                {item.name.slice(0,2)}
              </p>
              <p className="text-sm">{item.name}</p>
            </div>
          </TableCell>

          <TableCell align="right">
            <div className="flex justify-end gap-4 items-center">
              <div className="flex gap-1 justify-center items-center">
                <p>
                  <Icon icon={'stash:clock-light'} />
                </p>
                <p>{item.expiration}m</p>
              </div>

              <ToggleSwitch toggleValue={''} />
              <MoreVertIcon
                onClick={handleMenuClick}
                style={{ cursor: 'pointer' }}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{ boxShadow: 'none' }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handlePaymentTimeLimitClick}>
                  <ListItemIcon>
                    <AccessTimeIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Payment Time Limit</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDealCodeClick}>
                  <ListItemIcon>
                    <ConfirmationNumberIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Deal Code</ListItemText>
                </MenuItem>
              </Menu>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  </TableContainer>
     ): <p className='text-center'>No Data</p>}
    
 
  <div className="!my-5"></div>

  {/* Local Flights Table */}

     {localFlights && localFlights.length > 0 ? ( <TableContainer component={Paper} elevation={0}>
  <Table sx={{ minWidth: 650 }} aria-label="local flights table">
    <TableHead >
      <TableRow>
        <TableCell className="bg-[#F0F6FC] text-gray-700 !font-semibold px-4">
          {'Local Flights'}
        </TableCell>
        <TableCell align="right" className="bg-[#F0F6FC] text-gray-700 !font-semibold !px-10">
          Actions
        </TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {localFlights?.map((item, index) => (
        <TableRow key={index} sx={{ cursor: 'pointer' }}>
          <TableCell component="th" scope="row">
            <div className="flex items-center gap-2">
              <p className="h-10 w-10 rounded-full bg-blue-50 flex justify-center items-center text-sm">
                {item.name.slice(0,2)}
              </p>
              <p className="text-sm">{item.name}</p>
            </div>
          </TableCell>
          <TableCell align="right">
            <div className="flex justify-end gap-4 items-center">
            <div className="flex gap-1 justify-center items-center">
                <p>
                  <Icon icon={'stash:clock-light'} />
                </p>
                <p>{item.expiration}m</p>
              </div>

              <ToggleSwitch toggleValue={''} />
              <MoreVertIcon onClick={handleMenuClick} style={{ cursor: 'pointer' }} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  </TableContainer>): <p> </p>}
 


      {/* Modal for Deal Code */}
      <Modal isOpen={isDealCodeModalOpen} onClose={() => setIsDealCodeModalOpen(false)} title = {'Deal Codes'}>
        <div>
          <div className="flex items-center flex-wrap ">
            <div className='w-full sm:w-[85%]'>
              <p>Add a Code</p>
              <input
                type="text"
                className="border-2 rounded p-1  px-2 w-full !border-gray-300"
                value = {code}
                onChange={(e) => setCode(e.target.value)}
                />
            </div>
            <button className="bg-[#0067FF] text-white sm:w-[13%] w-full sm:ml-2 !mt-5 sm:mt-0 px-4 py-1 rounded flex items-center justify-center" onClick={handleCreateDealCode}>
              Add
            </button>
          </div>

          <div className="mt-4">
           
            <p className="text-gray-500 mb-2">Current Codes</p>
            {loading && <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-30 z-10">
          <Loading /> 
        </div>}
            {dealCodes.map((item, index) => (
              <div key={index} className="flex items-center justify-between mb-2 py-3  border-b">
                <p className='!text-gray-900'>{item.code}</p>
                <div className="flex items-center gap-2">
                  <DateTimeFormatter dateString={item.createdAt}  className = {'text-gray-600 text-sm font-main'}/>
                  <ToggleSwitch toggleValue={item.isActive} />
                  <button onClick={() => handleDeleteDealCode(item._id)}><Icon icon={'material-symbols-light:delete-outline'}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Modal for Payment Time Limit */}
      <Modal isOpen={isPaymentTimeLimitModalOpen} onClose={() => setIsPaymentTimeLimitModalOpen(false)} title = {'Payment Time Limit'}>
        <div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className='w-full'>
              <p>Time</p>
              <input
                type="text"
                placeholder="Enter time limit"
                className="border-2 rounded p-2 w-full !border-gray-300"
              />
            </div>
          </div>
          <div className="mt-4">
           
           <p className="!text-gray-800 mb-2">Current Time Limit</p>
           {/* {loading && <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-30 z-10">
         <Loading /> 
       </div>} */}
           {dealCodes.map((item, index) => (
             <div key={index} className="flex items-center justify-between mb-2 py-3  border-b border-gray-200">
               <p className='!text-gray-900'>{index}</p>
               <div className="flex items-center gap-2">
                 <DateTimeFormatter dateString={item.createdAt}  className = {'text-gray-600 text-sm font-main'}/>
                 <ToggleSwitch toggleValue={item.isActive} />
                 <button onClick={() => handleDeleteDealCode(item._id)}><Icon icon={'material-symbols-light:delete-outline'}/></button>
               </div>
             </div>
           ))}
         </div>
          <div className="flex items-center justify-between mt-4">   
            <button className=" text-black rounded w-[20%] font-bold" onClick={() => setIsPaymentTimeLimitModalOpen(false)}>
              Go back
            </button>
            <button className="bg-[#0067FF] text-white px-4 py-2 rounded w-[75%] ">
              Confirm
            </button>
          </div>
        </div>
      </Modal>
            
        </div>

    </div>
  );
};

export default SupplierSection;