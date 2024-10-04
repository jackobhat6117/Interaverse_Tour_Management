import React from 'react';
import CardList from '../../../components/Settings/fees/FlightCard';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import MultipleSelect from '../../../components/Settings/fees/MultipleSelect';

const Flight = () => {
  const cardData1 = [
    { title: 'API ticketing fee', amount: '$534,000', btn: "save" , highlight: true},
    { title: 'International flight ticketing fee', amount : '$534,000' , btn: "save"},
    { title: 'Local flight ticketing', amount : '$534,000', btn: "save" },
    { title: 'Regional flight ticketing fee', amount: '$534,000', btn: "save" },
  ];


  const cardData2 = [
    { title: 'Fee name here', amount: '$534,000', btn: "save" },
    { title: 'Fee name here', amount : '$534,000' , btn: "save"},
    { title: 'Fee name here', amount : '$534,000', btn: "save" },
    
  ]

   return (
    <div className="container mx-auto py-5">
        <MultipleSelect/>
        <div className='mt-5'>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <h5>Ticketing</h5>
        </AccordionSummary>
        <AccordionDetails>
           <CardList cards={cardData1} />
        </AccordionDetails>
      </Accordion>

        </div>
        
    <div className='my-3'>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <h5>Ancillary/Extras</h5>
        </AccordionSummary>
        <AccordionDetails>
           <CardList cards={cardData2} />
        </AccordionDetails>
      </Accordion>

        </div>

        <div className='my-3'>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <h5>Rebook</h5>
        </AccordionSummary>
        <AccordionDetails>
           {/* <CardList cards={cardData} /> */}
        </AccordionDetails>
      </Accordion>

        </div>


    </div>
  );
};

export default Flight;
