import moment from "moment";


export default function getFlightDuration(departureDateTime,arrivalDateTime,display) {
  const duration = moment.duration(arrivalDateTime.diff(departureDateTime));
  const durationInMinutes = duration.asMinutes();
  const days = Math.floor(durationInMinutes / (24 * 60));
  const hours = Math.floor((durationInMinutes % (24 * 60)) / 60);
  const minutes = durationInMinutes % 60;

  let formattedDuration = '';
  if(display === 'short')
    formattedDuration = `${days?days+'day ':''} ${hours}H ${minutes.toString().padStart(2, '0')}M`;
  else
    formattedDuration = `${days?days+'day ':''} ${hours}Hours ${minutes.toString().padStart(2, '0')}Minutes`;

  return formattedDuration;
}

export function getFlightDurationFromList(dateTimeList, display) {
  if (dateTimeList.length < 2) {
    throw new Error('At least two dateTime values are required.');
  }

  const departureDateTime = moment(dateTimeList[0]);
  const arrivalDateTime = moment(dateTimeList[dateTimeList.length - 1]);
  const duration = moment.duration(arrivalDateTime.diff(departureDateTime));
  const durationInMinutes = duration.asMinutes();
  const days = Math.floor(durationInMinutes / (24 * 60));
  const hours = Math.floor((durationInMinutes % (24 * 60)) / 60);
  const minutes = durationInMinutes % 60;

  let formattedDuration = '';
  const min = minutes.toString().padStart(2, '0')
  if (display === 'short') {
    formattedDuration = `${days ? days + 'day ' : ''}${parseInt(hours) ? hours + 'H' : ''} ${parseInt(min) ? min + 'M' : ''}`;
  } else {
    formattedDuration = `${days ? days + 'day ' : ''}${parseInt(hours) ? hours + 'Hours' : ''} ${parseInt(min) ? min + 'Minutes' : ''}`;
  }

  return formattedDuration;
}