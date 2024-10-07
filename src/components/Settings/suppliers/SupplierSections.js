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

const SupplierSection = ({ title, providers }) => {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="mb-6">
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }} aria-label="supplier table">
          <TableHead>
            <TableRow>
              <TableCell className="bg-[#F0F6FC] text-gray-700 !font-semibold  px-4">
                {title}
              </TableCell>
              <TableCell align="right" className="bg-[#F0F6FC] text-gray-700 !font-semibold  !px-10 ">
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
                  {/* Display initials followed by provider name */}
                  <div className="flex items-center gap-2">
                    <p className="h-10 w-10 rounded-full bg-blue-50 flex justify-center items-center text-sm">
                      {provider.initials}
                    </p>
                    <p className="text-sm">{provider.name}</p>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <div className="flex justify-end gap-4 items-center">
                    <ToggleSwitch />
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
                      <MenuItem onClick={handleMenuClose}>
                        <ListItemIcon>
                          <AccessTimeIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Payment Time Limit</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>
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
    </div>
  );
};

export default SupplierSection;
