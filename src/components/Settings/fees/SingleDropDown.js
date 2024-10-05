import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const options = [
  { value: 'Pre-Ticketing Fee', label: 'Pre-Ticketing Fee' },
  { value: 'Post-Ticketing Fee', label: 'Post-Ticketing Fee' }
];

export default function SingleSelectDropdown({ onSelectionChange, selectedOption }) {
  const theme = useTheme();
  const [selectedOptions, setSelectedOptions] = React.useState(selectedOption);

  const handleChange = (event) => {
    setSelectedOptions(event.target.value);
    onSelectionChange(event.target.value); 
  };

  return (
    <div>
      <FormControl sx={{ mr: 1, width: 350 }}>
        <Select
          value={selectedOption}
          onChange={handleChange}
          MenuProps={MenuProps}
          displayEmpty
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
