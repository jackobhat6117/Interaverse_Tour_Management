import React, { useState } from 'react';
import CardList from '../../../../components/Settings/fees/FlightCard';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SingleSelectDropdown from '../../../../components/Settings/fees/SingleDropDown';

const Flight = () => {
  const [selectedOption, setSelectedOption] = useState('Pre-Ticketing Fee');

  const handleSelectionChange = (value) => {
    setSelectedOption(value); 
  };

  const cardData1 = [
    { title: 'API ticketing fee', amount: '$534,000', btn: 'save', highlight: true },
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
    { title: 'void fee', amount: '$534,000', btn: 'save' },
    { title: 'Re-issue fee', amount: '$534,000', btn: 'save' },
    { title: 'Name change fee', amount: '$534,000', btn: 'save' },
    { title: 'Change passenger details fee', amount: '$534,000', btn: 'save' },
  ];

  const cardData4 = [
    { title: 'Full refund fee', amount: '$534,000', btn: 'save' },
    { title: 'Partial refund fee', amount: '$534,000', btn: 'save' }
  ];

  return (
    <div className="container">
      <SingleSelectDropdown 
        selectedOption={selectedOption} 
        onSelectionChange={handleSelectionChange} 
      />
      {selectedOption === 'Pre-Ticketing Fee' ? (
        <div>
          <div className=" mx-0">
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
                <h5 className='text-[#2E2E32]'>Ticketing</h5>
              </AccordionSummary>
              <AccordionDetails>
                <CardList cards={cardData1} />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="my-3">
            <Accordion 
              sx={{ 
                boxShadow: 'none', 
                backgroundColor: '#F7F7F7', 
                borderBottom: '1px solid #ddd', 
                paddingBottom: '1rem'  
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <h5 className='text-[#2E2E32]'>Ancillary/Extras</h5>
              </AccordionSummary>
              <AccordionDetails>
                <CardList cards={cardData2} />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="my-3">
            <Accordion 
              sx={{ 
                boxShadow: 'none', 
                backgroundColor: '#F7F7F7', 
                borderBottom: '1px solid #ddd', 
                paddingBottom: '1rem'  
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <h5 className='text-[#2E2E32] font-bold'>Reebook</h5>
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
                <h5 className='text-[#2E2E32]'>Void</h5>
              </AccordionSummary>
              <AccordionDetails>
                <CardList cards={cardData3} />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="my-3">
            <Accordion 
               sx={{ 
                boxShadow: 'none', 
                backgroundColor: '#F7F7F7', 
                borderBottom: '1px solid #ddd', 
                paddingBottom: '1rem'  
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <h5 className='text-[#2E2E32]'>Re-issue</h5>
              </AccordionSummary>
              <AccordionDetails>
                <CardList cards={cardData4} />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="my-3">
            <Accordion 
               sx={{ 
                boxShadow: 'none', 
                backgroundColor: '#F7F7F7', 
                borderBottom: '1px solid #ddd', 
                paddingBottom: '1rem'  
              }}
              
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <h5 className='text-[#2E2E32]'>Name Change</h5>
              </AccordionSummary>
              <AccordionDetails>
                <CardList cards={cardData4} />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="my-3">
            <Accordion 
               sx={{ 
                boxShadow: 'none', 
                backgroundColor: '#F7F7F7', 
                borderBottom: '1px solid #ddd', 
                paddingBottom: '1rem'  
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <h5 className='text-[#2E2E32]'>Change Passenger Details</h5>
              </AccordionSummary>
              <AccordionDetails>
                <CardList cards={cardData4} />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="my-3">
            <Accordion 
               sx={{ 
                boxShadow: 'none', 
                backgroundColor: '#F7F7F7', 
                borderBottom: '1px solid #ddd', 
                paddingBottom: '1rem'  
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <h5 className='text-[#2E2E32]'>Cancel/Refund</h5>
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
