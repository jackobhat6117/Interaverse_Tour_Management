import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const options = [
  { value: 'Pre-Ticketing Fee', label: 'Pre-Ticketing Fee' },
  { value: 'Post-Ticketing Fee', label: 'Post-Ticketing Fee' }
];

export default function SingleSelectAccordion({ onSelectionChange, selectedOption }) {
  const [expanded, setExpanded] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState(selectedOption);

  const handleChange = (value) => {
    setSelectedOptions(value);
    onSelectionChange(value);
    setExpanded(false);  // Collapse accordion after selection
  };

  return (
    <div className='mt-5'>
      <Accordion 
        expanded={expanded} 
        onChange={() => setExpanded(!expanded)} 
        sx={{  
          width: { xs: '100%', sm: '100%', md: '400px' }, 
          boxShadow: 'none',
          border: '1px solid #ddd',
          borderRadius: '22px', 
          overflow: 'hidden', 
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content"
          id="panel-header"
          disableGutters 
          sx={{ 
            borderRadius: '22px', 
          }}
        >
          <Typography>{selectedOptions || 'Select an Option'}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {options.map((option) => (
              <ListItemButton
                key={option.value}
                selected={selectedOptions === option.value}
                onClick={() => handleChange(option.value)}
              >
                <ListItemText primary={option.label} />
              </ListItemButton>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
