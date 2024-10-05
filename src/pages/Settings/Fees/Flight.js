import React, { useState , useEffect } from 'react';
import CardList from '../../../components/Settings/fees/FlightCard';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SingleSelectDropdown from '../../../components/Settings/fees/SingleDropDown';


const Flight = () => {
  const [selectedOption, setSelectedOption] = useState('Pre-Ticketing Fee');
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [expandedPanel, setExpandedPanel] = useState(null); 

  const handleSelectionChange = (value) => {
    setSelectedOption(value); 
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };


  useEffect(() => {
    if (isFirstRender) {
      setExpandedPanel('panel1');
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  const cardData1 = [
    { title: 'API ticketing fee', amount: '$534,000', btn: 'save',  highlight: true},
    { title: 'International flight ticketing fee', amount: '$534,000', btn: 'save' },
    { title: 'Local flight ticketing', amount: '$534,000', btn: 'save' },
    { title: 'Regional flight ticketing fee', amount: '$534,000', btn: 'save' }
  ];

  const cardData2 = [
    { title: 'Fee name here', amount: '$534,000', btn: 'save' },
    { title: 'Fee name here', amount: '$534,000', btn: 'save' },
    { title: 'Fee name here', amount: '$534,000', btn: 'save' }
  ];

  const cardData3 = [
    { title: 'void fee', amount: '$534,000', btn: 'save'},
    { title: 'Re-issue fee', amount: '$534,000', btn: 'save' },
    { title: 'Name change fee', amount: '$534,000', btn: 'save' },
    { title: 'Change passenger details fee', amount: '$534,000', btn: 'save' },
  ];

  const cardData4 = [
    { title: 'Full refund fee', amount: '$534,000', btn: 'save' },
    { title: 'Partial refund fee', amount: '$534,000', btn: 'save' },
    
  ];

  return (
    <div className="container mx-auto py-5">
      <SingleSelectDropdown 
        selectedOption={selectedOption} 
        onSelectionChange={handleSelectionChange} 
      />
      {selectedOption === 'Pre-Ticketing Fee' ? (
        <div>
        <div className="mt-5">
          <Accordion 
            expanded={expandedPanel === 'panel1'}
            onChange={handleAccordionChange('panel1')}
          >
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
        <div className="my-3">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <h5>Ancillary/Extras</h5>
            </AccordionSummary>
            <AccordionDetails>
              <CardList cards={cardData2} />
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="my-3">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <h5>Reebook</h5>
            </AccordionSummary>
            <AccordionDetails>
              {/* <CardList cards={cardData2} /> */}
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      
      ) : (
        <div>
        <div className="mt-5">
          <Accordion
            expanded={expandedPanel === 'panel1'}
            onChange={handleAccordionChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
            </AccordionSummary>
            <AccordionDetails>
              <CardList cards={cardData3} />
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="my-3">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <h5>Cancel/Refund</h5>
            </AccordionSummary>
            <AccordionDetails>
              <CardList cards={cardData4} />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      )}
    </div>
  );
};

export default Flight;
