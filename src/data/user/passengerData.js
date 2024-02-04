export const passengerDataTemp = {
  "birthDate":"",
  "firstName":"",
  "lastName":"",
  "nationality":"",
  "gender":"",
  "passportId":"",
  "boardingUserType":"",
  "email":"",
  "phoneNumber":"",
  "issuanceLocation":"",
  "issuanceDate":"",
  "issuanceCountry":"",
  "validityCountry":"",
  "passportExpirationDate":""
}

export const passengerDataTempFilled = {
  "birthDate":"6/19/1999",
  "firstName":"Test",
  "lastName":"User",
  "nationality":"ET",
  "gender":["MALE","FEMALE"][parseInt(Math.random()*2)],
  "passportId":"1000",
  "boardingUserType":"ADULT",
  "email":`test${parseInt(Math.random()*999)}@gmail.com`,
  "phoneNumber":"251-940067965",
  "issuanceLocation":"ET",
  "issuanceDate":"6/19/2023",
  "issuanceCountry":"ET",
  "validityCountry":"ET",
  "passportExpirationDate":"6/19/2024"
}