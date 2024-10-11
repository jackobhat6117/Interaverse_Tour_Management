import React from 'react';

const formatDateTime = (dateString) => {
  const date = new Date(dateString);

  // Format the date as YYYY-MM-DD
  const formattedDate = date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // Format the time as hh:mm AM/PM
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).toUpperCase();

  return `${formattedDate}, ${formattedTime}`;
};

const DateTimeFormatter = ({ dateString, className }) => {
  return <span className={className}>{formatDateTime(dateString)}</span>;
};

export default DateTimeFormatter;
