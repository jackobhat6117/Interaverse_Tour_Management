import React, { useState } from 'react';
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

const SupplierSection = ({ title, providers }) => {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDealCodeModalOpen, setIsDealCodeModalOpen] = useState(false); 
  const [isPaymentTimeLimitModalOpen, setIsPaymentTimeLimitModalOpen] = useState(false); 

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

  const dealCodes = ['1029033', '390833', '8928480', '3803393'];

  return (
    <div className="mb-6">
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }} aria-label="supplier table">
          <TableHead>
            <TableRow>
              <TableCell className="bg-[#F0F6FC] text-gray-700 !font-semibold px-4">
                {title}
              </TableCell>
              <TableCell align="right" className="bg-[#F0F6FC] text-gray-700 !font-semibold !px-10">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {providers.map((provider) => (
              <TableRow
                key={provider.name}
                onClick={() => setSelectedProvider(provider)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '' },
                  '& .MuiTableCell-root': { padding: '10px 8px' },
                }}
              >
                <TableCell component="th" scope="row">
                  <div className="flex items-center gap-2">
                    <p className="h-10 w-10 rounded-full bg-blue-50 flex justify-center items-center text-sm">
                      {provider.initials}
                    </p>
                    <p className="text-sm">{provider.name}</p>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <div className="flex justify-end gap-4 items-center">
                    <ToggleSwitch toggleValue={provider.toggle} />
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

      {/* Modal for Deal Code */}
      <Modal isOpen={isDealCodeModalOpen} onClose={() => setIsDealCodeModalOpen(false)} title = {'Deal Codes'}>
        <div>
          <div className="flex items-center flex-wrap ">
            <div className='w-full sm:w-[85%]'>
              <p>Add a Code</p>
              <input
                type="text"
                className="border-2 rounded p-1 w-full !border-gray-300"
              />
            </div>
            <button className="bg-[#0067FF] text-white sm:w-[13%] w-full sm:ml-2 !mt-5 sm:mt-0 px-4 py-1 rounded flex items-center justify-center">
              Add
            </button>
          </div>

          <div className="mt-4">
            <p className="text-gray-500 mb-2">Current Codes</p>
            {dealCodes.map((code, index) => (
              <div key={index} className="flex items-center justify-between mb-2 py-3  border-b">
                <p className='!text-gray-900'>{code}</p>
                <div className="flex items-center gap-2">
                  <ToggleSwitch toggleValue={true} />
                  <button><Icon icon={'material-symbols-light:delete-outline'}/></button>
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
          <div className="flex items-center justify-between mt-4">
            <button className=" text-black rounded w-[20%]">
              Go back
            </button>
            <button className="bg-[#0067FF] text-white px-4 py-2 rounded w-[75%] ">
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SupplierSection;
