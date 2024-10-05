import React, { useState , useEffect } from 'react';
import CardList from '../../../components/Settings/fees/FlightCard';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SingleSelectDropdown from '../../../components/Settings/fees/SingleDropDown';


const Wallet = () => {


const cardData1 = [
        { title: 'One time setup fee', amount: '$534,000', btn: 'save'},
        { title: 'Monthly subscription fee', amount: '$534,000', btn: 'save' },
      ];


  return (
    <div className="container mx-auto py-5">
       
        <div className="mt-5">
          <Accordion expanded= {true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <h5>White-label</h5>
            </AccordionSummary>
            <AccordionDetails>
              <CardList cards={cardData1} />
            </AccordionDetails>
          </Accordion>
        </div>        
       
      </div>
      
  
  );
};

export default Wallet;
