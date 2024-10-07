import React, { useState , useEffect } from 'react';
import CardList from '../../../../components/Settings/fees/FlightCard';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SingleSelectDropdown from '../../../../components/Settings/fees/SingleDropDown';


const Wallet = () => {


const cardData1 = [
        { title: 'Card fee', amount: '$534,000', btn: 'save'},
        { title: 'Bank transfer fee', amount: '$534,000', btn: 'save' },
      ];

  const cardData2 = [
    { title: 'No card payment', amount: '$534,000', btn: 'save'},
    { title: 'Bank transfer fee', amount: '$534,000', btn: 'save' },
    { title: 'Wallet fee', amount: '$534,000', btn: 'save' },
    { title: 'Saved fee', amount: '$534,000', btn: 'save' }
  ];


  return (
    <div className="container mx-auto ">
        <div className="my-5">
          <Accordion
               expanded={true} 
               sx={{ 
                 boxShadow: 'none', 
                 backgroundColor: '#F7F7F7', 
                 borderBottom: '1px solid #ddd', 
                 paddingBottom: '1rem'  
               }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <h5 className='text-[#2E2E32]'>Top up</h5>
            </AccordionSummary>
            <AccordionDetails>
              <CardList cards={cardData1} />
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="mt-5">
          <Accordion 
               expanded={true} 
               sx={{ 
                 boxShadow: 'none', 
                 backgroundColor: '#F7F7F7', 
                 borderBottom: '1px solid #ddd', 
                 paddingBottom: '1rem'  
               }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <h5 className='text-[#2E2E32]'>Order Payment</h5>
            </AccordionSummary>
            <AccordionDetails>
              <CardList cards={cardData2} />
            </AccordionDetails>
          </Accordion>
        </div>


        
       
      </div>
      
  
  );
};

export default Wallet;