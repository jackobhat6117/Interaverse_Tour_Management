import React, { useState , useEffect } from 'react';
import CardList from '../../../components/Settings/fees/FlightCard';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SingleSelectDropdown from '../../../components/Settings/fees/SingleDropDown';


const Tour = () => {


  const cardData1 = [
    { title: 'Confirmed booking fee', amount: '$534,000', btn: 'save'},
    { title: 'Cancellation fee', amount: '$534,000', btn: 'save' },
    { title: 'Refund fee', amount: '$534,000', btn: 'save' },
    { title: 'Change fee', amount: '$534,000', btn: 'save' }
  ];


  return (
    <div className="container mx-auto py-5">
        <div>
        <div className="mt-5">
          <Accordion expanded= {true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <h5>Tours Booking</h5>
            </AccordionSummary>
            <AccordionDetails>
              <CardList cards={cardData1} />
            </AccordionDetails>
          </Accordion>
        </div>
       
      </div>
    </div>
  );
};

export default Tour;
