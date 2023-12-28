const moment = require("moment");
/**
 *
 * @param {string} dateOfBirth YYYY-MM-DD
 * @returns
 */
export function getPassengerCategory(dateOfBirth) {
  const currentDate = moment();
  const birthDate = moment(dateOfBirth, "YYYY-MM-DD");
  const age = currentDate.diff(birthDate, "years");

  if (age >= 12) {
    return "Adult";
  } else if (age < 2) {
    return "Infant";
  } else {
    return "Child";
  }
}
