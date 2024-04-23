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
