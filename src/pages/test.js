import React from 'react'
import convertFlightObject, { createFlightCat } from '../features/utils/flight/flightOfferObj'
import { clone } from '../features/utils/objClone'
import { formatMoney } from '../features/utils/formatMoney'

export default function Test() {
//   const res = flightOfferRes.map(obj => convertFlightObject(obj))
//   console.log(res)
//   let cat = (createFlightCat(res))
//   sortByCat(cat.cheapest)

//   function sortByCat(arr) {
//     let temp = clone(res);
//     let sortedData = [];
//     arr.map(i => sortedData.push(temp[i]))

//     console.log("sorted: ",sortedData)

//   }
    // let price = 'NGN 123122,323'
    // let regex = /^[A-Za-z\s]+/;
    // var numericPrice = parseFloat(price.replace(regex, '').replaceAll(',',''));

  return (
    <div>{formatMoney('NGN 123,123,123')}</div>
  )
}


const flightOfferRes = [
  {
      "id": "0",
      "directions": [
          [
              {
                  "segmentRef": "+GvJ4vVqWDKAI1WsAAAAAA==",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/MS@2x.png",
                          "description": "MS"
                      },
                      "marketing": "MS",
                      "operating": "MS"
                  },
                  "aircraftType": "738",
                  "flightNumber": "876",
                  "departure": {
                      "date": "2024-01-10T14:45:00.000+01:00",
                      "location": "LOS",
                      "time": "13:45",
                      "terminal": "I"
                  },
                  "arrival": {
                      "date": "2024-01-10T20:45:00.000+02:00",
                      "location": "CAI",
                      "terminal": "3"
                  },
                  "numberOfStops": 0,
                  "baggage": "2 piece",
                  "bookingClass": "Y",
                  "cabinClass": "Economy",
                  "duration": "300",
                  "stops": []
              },
              {
                  "segmentRef": "+GvJ4vVqWDKAK1WsAAAAAA==",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/MS@2x.png",
                          "description": "MS"
                      },
                      "marketing": "MS",
                      "operating": "MS"
                  },
                  "aircraftType": "773",
                  "flightNumber": "777",
                  "departure": {
                      "date": "2024-01-11T09:25:00.000+02:00",
                      "location": "CAI",
                      "time": "07:25",
                      "terminal": "3"
                  },
                  "arrival": {
                      "date": "2024-01-11T12:35:00.000+00:00",
                      "location": "LHR",
                      "terminal": "2"
                  },
                  "numberOfStops": 0,
                  "baggage": "2 piece",
                  "bookingClass": "Y",
                  "cabinClass": "Economy",
                  "duration": "310",
                  "stops": []
              }
          ]
      ],
      "pricingInformation": {
          "price": {
              "basePrice": "USD 1213.00",
              "taxes": "NGN 681833.00",
              "totalPrice": "NGN 1773533.00"
          },
          "passengerFares": {
              "adult": {
                  "basePrice": "USD 693.00",
                  "taxes": "NGN 344809.00",
                  "totalPrice": "NGN 968509.00",
                  "passengerCount": 1
              },
              "child": {
                  "basePrice": "USD 520.00",
                  "taxes": "NGN 337024.00",
                  "totalPrice": "NGN 805024.00",
                  "passengerCount": 1
              }
          }
      },
      "destinations": [
          {
              "from": "LOS",
              "to": "LHR",
              "departure": {
                  "date": "2024-01-10"
              },
              "date": "Wed Jan 10 2024 00:00:00 GMT+0300"
          }
      ],
      "supplier": "Travelport"
  },
  {
      "id": "1",
      "directions": [
          [
              {
                  "segmentRef": "+GvJ4vVqWDKAM1WsAAAAAA==",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/VS@2x.png",
                          "description": "VS"
                      },
                      "marketing": "VS",
                      "operating": "VS"
                  },
                  "aircraftType": "351",
                  "flightNumber": "412",
                  "departure": {
                      "date": "2024-01-10T09:15:00.000+01:00",
                      "location": "LOS",
                      "time": "08:15",
                      "terminal": "I"
                  },
                  "arrival": {
                      "date": "2024-01-10T14:50:00.000+00:00",
                      "location": "LHR",
                      "terminal": "3"
                  },
                  "numberOfStops": 0,
                  "baggage": "2 piece",
                  "bookingClass": "Y",
                  "cabinClass": "Economy",
                  "duration": "395",
                  "stops": []
              }
          ]
      ],
      "pricingInformation": {
          "price": {
              "basePrice": "USD 4722.00",
              "taxes": "NGN 744120.00",
              "totalPrice": "NGN 4993920.00"
          },
          "passengerFares": {
              "adult": {
                  "basePrice": "USD 2698.00",
                  "taxes": "NGN 387225.00",
                  "totalPrice": "NGN 2815425.00",
                  "passengerCount": 1
              },
              "child": {
                  "basePrice": "USD 2024.00",
                  "taxes": "NGN 356895.00",
                  "totalPrice": "NGN 2178495.00",
                  "passengerCount": 1
              }
          }
      },
      "destinations": [
          {
              "from": "LOS",
              "to": "LHR",
              "departure": {
                  "date": "2024-01-10"
              },
              "date": "Wed Jan 10 2024 00:00:00 GMT+0300"
          }
      ],
      "supplier": "Travelport"
  },
  {
      "id": "1",
      "directions": [
          [
              {
                  "segmentRef": "14",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/AT@2x.png",
                          "description": "AT"
                      },
                      "marketing": "AT",
                      "operating": "AT"
                  },
                  "aircraftType": "7M8",
                  "seatAvailability": "36",
                  "flightNumber": "801",
                  "cabinClass": "Y",
                  "bookingClass": "P",
                  "departure": {
                      "time": "17:10:00",
                      "date": "2024-01-10",
                      "terminal": "4",
                      "location": "LHR"
                  },
                  "arrival": {
                      "time": "21:30:00",
                      "date": "2024-01-10",
                      "terminal": "2",
                      "location": "CMN"
                  },
                  "duration": "200",
                  "numberOfStops": 0,
                  "baggage": "2 pcs"
              },
              {
                  "segmentRef": "21",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/AT@2x.png",
                          "description": "AT"
                      },
                      "marketing": "AT",
                      "operating": "AT"
                  },
                  "aircraftType": "73H",
                  "seatAvailability": "36",
                  "flightNumber": "555",
                  "cabinClass": "Y",
                  "bookingClass": "P",
                  "departure": {
                      "time": "23:40:00",
                      "date": "2024-01-10",
                      "terminal": "1",
                      "location": "CMN"
                  },
                  "arrival": {
                      "time": "04:10:00",
                      "date": "2024-01-10",
                      "terminal": "I",
                      "location": "LOS"
                  },
                  "duration": "270",
                  "numberOfStops": 0,
                  "baggage": "2 pcs"
              }
          ]
      ],
      "pricingInformation": {
          "passengerFares": {
              "adult": {
                  "basePrice": "USD 133",
                  "passengerCount": 1,
                  "taxes": "USD 332.4",
                  "totalPrice": "USD 465.4"
              },
              "child": {
                  "basePrice": "USD 100",
                  "passengerCount": 1,
                  "taxes": "USD 223.3",
                  "totalPrice": "USD 323.3"
              }
          },
          "price": {
              "basePrice": "USD 186",
              "taxes": "USD 555.7",
              "totalPrice": "USD 788.7"
          }
      },
      "destinations": [
          {
              "from": "LOS",
              "to": "LHR",
              "departure": {
                  "date": "2024-01-10"
              },
              "date": "Wed Jan 10 2024 00:00:00 GMT+0300"
          }
      ],
      "supplier": "Sabre"
  },
  {
      "id": "2",
      "directions": [
          [
              {
                  "segmentRef": "23",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/WB@2x.png",
                          "description": "WB"
                      },
                      "marketing": "WB",
                      "operating": "WB"
                  },
                  "aircraftType": "332",
                  "seatAvailability": "36",
                  "flightNumber": "711",
                  "cabinClass": "Y",
                  "bookingClass": "N",
                  "departure": {
                      "time": "20:30:00",
                      "date": "2024-01-10",
                      "terminal": "3",
                      "location": "LHR"
                  },
                  "arrival": {
                      "time": "07:00:00",
                      "date": "2024-01-10",
                      "location": "KGL"
                  },
                  "duration": "510",
                  "numberOfStops": 0,
                  "baggage": "4 pcs"
              },
              {
                  "segmentRef": "17",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/WB@2x.png",
                          "description": "WB"
                      },
                      "marketing": "WB",
                      "operating": "WB"
                  },
                  "aircraftType": "332",
                  "seatAvailability": "36",
                  "flightNumber": "202",
                  "cabinClass": "Y",
                  "bookingClass": "N",
                  "departure": {
                      "time": "09:10:00",
                      "date": "2024-01-10",
                      "location": "KGL"
                  },
                  "arrival": {
                      "time": "12:40:00",
                      "date": "2024-01-10",
                      "terminal": "I",
                      "location": "LOS"
                  },
                  "duration": "270",
                  "numberOfStops": 0,
                  "baggage": "4 pcs"
              }
          ]
      ],
      "pricingInformation": {
          "passengerFares": {
              "adult": {
                  "basePrice": "USD 180",
                  "passengerCount": 1,
                  "taxes": "USD 373.1",
                  "totalPrice": "USD 553.1"
              },
              "child": {
                  "basePrice": "USD 135",
                  "passengerCount": 1,
                  "taxes": "USD 264",
                  "totalPrice": "USD 399"
              }
          },
          "price": {
              "basePrice": "USD 252",
              "taxes": "USD 637.1",
              "totalPrice": "USD 952.1"
          }
      },
      "destinations": [
          {
              "from": "LOS",
              "to": "LHR",
              "departure": {
                  "date": "2024-01-10"
              },
              "date": "Wed Jan 10 2024 00:00:00 GMT+0300"
          }
      ],
      "supplier": "Sabre"
  },
  {
      "id": "3",
      "directions": [
          [
              {
                  "segmentRef": "5",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/TK@2x.png",
                          "description": "TK"
                      },
                      "marketing": "TK",
                      "operating": "TK"
                  },
                  "aircraftType": "32Q",
                  "seatAvailability": "36",
                  "flightNumber": "1984",
                  "cabinClass": "Y",
                  "bookingClass": "Q",
                  "departure": {
                      "time": "22:20:00",
                      "date": "2024-01-10",
                      "terminal": "2",
                      "location": "LHR"
                  },
                  "arrival": {
                      "time": "05:05:00",
                      "date": "2024-01-10",
                      "location": "IST"
                  },
                  "duration": "225",
                  "numberOfStops": 0,
                  "baggage": "4 pcs"
              },
              {
                  "segmentRef": "6",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/TK@2x.png",
                          "description": "TK"
                      },
                      "marketing": "TK",
                      "operating": "TK"
                  },
                  "aircraftType": "333",
                  "seatAvailability": "36",
                  "flightNumber": "625",
                  "cabinClass": "Y",
                  "bookingClass": "Q",
                  "departure": {
                      "time": "15:20:00",
                      "date": "2024-01-10",
                      "location": "IST"
                  },
                  "arrival": {
                      "time": "20:25:00",
                      "date": "2024-01-10",
                      "terminal": "I",
                      "location": "LOS"
                  },
                  "duration": "425",
                  "numberOfStops": 0,
                  "baggage": "4 pcs"
              }
          ]
      ],
      "pricingInformation": {
          "passengerFares": {
              "adult": {
                  "basePrice": "USD 256",
                  "passengerCount": 1,
                  "taxes": "USD 330.3",
                  "totalPrice": "USD 586.3"
              },
              "child": {
                  "basePrice": "USD 192",
                  "passengerCount": 1,
                  "taxes": "USD 221.2",
                  "totalPrice": "USD 413.2"
              }
          },
          "price": {
              "basePrice": "USD 357",
              "taxes": "USD 551.5",
              "totalPrice": "USD 999.5"
          }
      },
      "destinations": [
          {
              "from": "LOS",
              "to": "LHR",
              "departure": {
                  "date": "2024-01-10"
              },
              "date": "Wed Jan 10 2024 00:00:00 GMT+0300"
          }
      ],
      "supplier": "Sabre"
  },
  {
      "id": "4",
      "directions": [
          [
              {
                  "segmentRef": "19",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/AF@2x.png",
                          "description": "AF"
                      },
                      "marketing": "AF",
                      "operating": "AF"
                  },
                  "aircraftType": "223",
                  "seatAvailability": "54",
                  "flightNumber": "1181",
                  "cabinClass": "Y",
                  "bookingClass": "L,T",
                  "departure": {
                      "time": "19:45:00",
                      "date": "2024-01-10",
                      "terminal": "4",
                      "location": "LHR"
                  },
                  "arrival": {
                      "time": "22:05:00",
                      "date": "2024-01-10",
                      "terminal": "2E",
                      "location": "CDG"
                  },
                  "duration": "80",
                  "numberOfStops": 0,
                  "baggage": "2 pcs"
              },
              {
                  "segmentRef": "8",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/AF@2x.png",
                          "description": "AF"
                      },
                      "marketing": "AF",
                      "operating": "KL"
                  },
                  "aircraftType": "73H",
                  "seatAvailability": "54",
                  "flightNumber": "8230",
                  "cabinClass": "Y",
                  "bookingClass": "L,T",
                  "departure": {
                      "time": "10:20:00",
                      "date": "2024-01-10",
                      "terminal": "2F",
                      "location": "CDG"
                  },
                  "arrival": {
                      "time": "11:45:00",
                      "date": "2024-01-10",
                      "location": "AMS"
                  },
                  "duration": "85",
                  "numberOfStops": 0,
                  "baggage": "2 pcs"
              },
              {
                  "segmentRef": "11",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/AF@2x.png",
                          "description": "AF"
                      },
                      "marketing": "AF",
                      "operating": "KL"
                  },
                  "aircraftType": "333",
                  "seatAvailability": "54",
                  "flightNumber": "8434",
                  "cabinClass": "Y",
                  "bookingClass": "L,T",
                  "departure": {
                      "time": "13:50:00",
                      "date": "2024-01-10",
                      "location": "AMS"
                  },
                  "arrival": {
                      "time": "20:35:00",
                      "date": "2024-01-10",
                      "terminal": "I",
                      "location": "LOS"
                  },
                  "duration": "405",
                  "numberOfStops": 0,
                  "baggage": "2 pcs"
              }
          ]
      ],
      "pricingInformation": {
          "passengerFares": {
              "adult": {
                  "basePrice": "USD 435",
                  "passengerCount": 1,
                  "taxes": "USD 307.7",
                  "totalPrice": "USD 742.7"
              },
              "child": {
                  "basePrice": "USD 328",
                  "passengerCount": 1,
                  "taxes": "USD 198.6",
                  "totalPrice": "USD 526.6"
              }
          },
          "price": {
              "basePrice": "USD 609",
              "taxes": "USD 506.3",
              "totalPrice": "USD 1,269.3"
          }
      },
      "destinations": [
          {
              "from": "LOS",
              "to": "LHR",
              "departure": {
                  "date": "2024-01-10"
              },
              "date": "Wed Jan 10 2024 00:00:00 GMT+0300"
          }
      ],
      "supplier": "Sabre"
  },
  {
      "id": "5",
      "directions": [
          [
              {
                  "segmentRef": "12",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/ET@2x.png",
                          "description": "ET"
                      },
                      "marketing": "ET",
                      "operating": "ET"
                  },
                  "aircraftType": "350",
                  "seatAvailability": "24",
                  "flightNumber": "701",
                  "cabinClass": "Y",
                  "bookingClass": "H",
                  "departure": {
                      "time": "20:15:00",
                      "date": "2024-01-10",
                      "terminal": "2",
                      "location": "LHR"
                  },
                  "arrival": {
                      "time": "07:00:00",
                      "date": "2024-01-10",
                      "terminal": "2",
                      "location": "ADD"
                  },
                  "duration": "465",
                  "numberOfStops": 0,
                  "baggage": "4 pcs"
              },
              {
                  "segmentRef": "18",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/ET@2x.png",
                          "description": "ET"
                      },
                      "marketing": "ET",
                      "operating": "ET"
                  },
                  "aircraftType": "77W",
                  "seatAvailability": "24",
                  "flightNumber": "901",
                  "cabinClass": "Y",
                  "bookingClass": "H",
                  "departure": {
                      "time": "09:00:00",
                      "date": "2024-01-10",
                      "terminal": "2",
                      "location": "ADD"
                  },
                  "arrival": {
                      "time": "12:25:00",
                      "date": "2024-01-10",
                      "terminal": "I",
                      "location": "LOS"
                  },
                  "duration": "325",
                  "numberOfStops": 0,
                  "baggage": "4 pcs"
              }
          ]
      ],
      "pricingInformation": {
          "passengerFares": {
              "adult": {
                  "basePrice": "USD 427",
                  "passengerCount": 1,
                  "taxes": "USD 341.6",
                  "totalPrice": "USD 768.6"
              },
              "child": {
                  "basePrice": "USD 321",
                  "passengerCount": 1,
                  "taxes": "USD 232.5",
                  "totalPrice": "USD 553.5"
              }
          },
          "price": {
              "basePrice": "USD 597",
              "taxes": "USD 574.1",
              "totalPrice": "USD 1,322.1"
          }
      },
      "destinations": [
          {
              "from": "LOS",
              "to": "LHR",
              "departure": {
                  "date": "2024-01-10"
              },
              "date": "Wed Jan 10 2024 00:00:00 GMT+0300"
          }
      ],
      "supplier": "Sabre"
  },
  {
      "id": "6",
      "directions": [
          [
              {
                  "segmentRef": "7",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/BA@2x.png",
                          "description": "BA"
                      },
                      "marketing": "BA",
                      "operating": "BA"
                  },
                  "aircraftType": "781",
                  "seatAvailability": "18",
                  "flightNumber": "75",
                  "cabinClass": "Y",
                  "bookingClass": "V",
                  "departure": {
                      "time": "10:10:00",
                      "date": "2024-01-10",
                      "terminal": "5",
                      "location": "LHR"
                  },
                  "arrival": {
                      "time": "17:45:00",
                      "date": "2024-01-10",
                      "terminal": "I",
                      "location": "LOS"
                  },
                  "duration": "395",
                  "numberOfStops": 0,
                  "baggage": "4 pcs"
              }
          ]
      ],
      "pricingInformation": {
          "passengerFares": {
              "adult": {
                  "basePrice": "USD 473",
                  "passengerCount": 1,
                  "taxes": "USD 316.8",
                  "totalPrice": "USD 789.8"
              },
              "child": {
                  "basePrice": "USD 358",
                  "passengerCount": 1,
                  "taxes": "USD 207.7",
                  "totalPrice": "USD 565.7"
              }
          },
          "price": {
              "basePrice": "USD 663",
              "taxes": "USD 524.5",
              "totalPrice": "USD 1,355.5"
          }
      },
      "destinations": [
          {
              "from": "LOS",
              "to": "LHR",
              "departure": {
                  "date": "2024-01-10"
              },
              "date": "Wed Jan 10 2024 00:00:00 GMT+0300"
          }
      ],
      "supplier": "Sabre"
  },
  {
      "id": "7",
      "directions": [
          [
              {
                  "segmentRef": "22",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/QR@2x.png",
                          "description": "QR"
                      },
                      "marketing": "QR",
                      "operating": "QR"
                  },
                  "aircraftType": "77W",
                  "seatAvailability": "36",
                  "flightNumber": "8",
                  "cabinClass": "Y",
                  "bookingClass": "N",
                  "departure": {
                      "time": "14:55:00",
                      "date": "2024-01-10",
                      "terminal": "4",
                      "location": "LHR"
                  },
                  "arrival": {
                      "time": "00:45:00",
                      "date": "2024-01-10",
                      "location": "DOH"
                  },
                  "duration": "410",
                  "numberOfStops": 0,
                  "baggage": "4 pcs"
              },
              {
                  "segmentRef": "1",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/QR@2x.png",
                          "description": "QR"
                      },
                      "marketing": "QR",
                      "operating": "QR"
                  },
                  "aircraftType": "789",
                  "seatAvailability": "36",
                  "flightNumber": "1407",
                  "cabinClass": "Y",
                  "bookingClass": "N",
                  "departure": {
                      "time": "01:30:00",
                      "date": "2024-01-10",
                      "location": "DOH"
                  },
                  "arrival": {
                      "time": "08:50:00",
                      "date": "2024-01-10",
                      "terminal": "I",
                      "location": "LOS"
                  },
                  "duration": "560",
                  "numberOfStops": 0,
                  "baggage": "4 pcs"
              }
          ]
      ],
      "pricingInformation": {
          "passengerFares": {
              "adult": {
                  "basePrice": "USD 445",
                  "passengerCount": 1,
                  "taxes": "USD 361.5",
                  "totalPrice": "USD 806.5"
              },
              "child": {
                  "basePrice": "USD 340",
                  "passengerCount": 1,
                  "taxes": "USD 252.4",
                  "totalPrice": "USD 592.4"
              }
          },
          "price": {
              "basePrice": "USD 626",
              "taxes": "USD 613.9",
              "totalPrice": "USD 1,398.9"
          }
      },
      "destinations": [
          {
              "from": "LOS",
              "to": "LHR",
              "departure": {
                  "date": "2024-01-10"
              },
              "date": "Wed Jan 10 2024 00:00:00 GMT+0300"
          }
      ],
      "supplier": "Sabre"
  },
  {
      "id": "8",
      "directions": [
          [
              {
                  "segmentRef": "9",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/QR@2x.png",
                          "description": "QR"
                      },
                      "marketing": "QR",
                      "operating": "QR"
                  },
                  "aircraftType": "388",
                  "seatAvailability": "36",
                  "flightNumber": "4",
                  "cabinClass": "Y",
                  "bookingClass": "N",
                  "departure": {
                      "time": "14:15:00",
                      "date": "2024-01-10",
                      "terminal": "4",
                      "location": "LHR"
                  },
                  "arrival": {
                      "time": "00:05:00",
                      "date": "2024-01-10",
                      "location": "DOH"
                  },
                  "duration": "410",
                  "numberOfStops": 0,
                  "baggage": "4 pcs"
              },
              {
                  "segmentRef": "1",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/QR@2x.png",
                          "description": "QR"
                      },
                      "marketing": "QR",
                      "operating": "QR"
                  },
                  "aircraftType": "789",
                  "seatAvailability": "36",
                  "flightNumber": "1407",
                  "cabinClass": "Y",
                  "bookingClass": "N",
                  "departure": {
                      "time": "01:30:00",
                      "date": "2024-01-10",
                      "location": "DOH"
                  },
                  "arrival": {
                      "time": "08:50:00",
                      "date": "2024-01-10",
                      "terminal": "I",
                      "location": "LOS"
                  },
                  "duration": "560",
                  "numberOfStops": 0,
                  "baggage": "4 pcs"
              }
          ]
      ],
      "pricingInformation": {
          "passengerFares": {
              "adult": {
                  "basePrice": "USD 445",
                  "passengerCount": 1,
                  "taxes": "USD 361.5",
                  "totalPrice": "USD 806.5"
              },
              "child": {
                  "basePrice": "USD 340",
                  "passengerCount": 1,
                  "taxes": "USD 252.4",
                  "totalPrice": "USD 592.4"
              }
          },
          "price": {
              "basePrice": "USD 626",
              "taxes": "USD 613.9",
              "totalPrice": "USD 1,398.9"
          }
      },
      "destinations": [
          {
              "from": "LOS",
              "to": "LHR",
              "departure": {
                  "date": "2024-01-10"
              },
              "date": "Wed Jan 10 2024 00:00:00 GMT+0300"
          }
      ],
      "supplier": "Sabre"
  },
  {
      "id": "9",
      "directions": [
          [
              {
                  "segmentRef": "16",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/QR@2x.png",
                          "description": "QR"
                      },
                      "marketing": "QR",
                      "operating": "BA"
                  },
                  "aircraftType": "777",
                  "seatAvailability": "36",
                  "flightNumber": "9711",
                  "cabinClass": "Y",
                  "bookingClass": "N",
                  "departure": {
                      "time": "14:05:00",
                      "date": "2024-01-10",
                      "terminal": "5",
                      "location": "LHR"
                  },
                  "arrival": {
                      "time": "00:15:00",
                      "date": "2024-01-10",
                      "location": "DOH"
                  },
                  "duration": "430",
                  "numberOfStops": 0,
                  "baggage": "4 pcs"
              },
              {
                  "segmentRef": "1",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/QR@2x.png",
                          "description": "QR"
                      },
                      "marketing": "QR",
                      "operating": "QR"
                  },
                  "aircraftType": "789",
                  "seatAvailability": "36",
                  "flightNumber": "1407",
                  "cabinClass": "Y",
                  "bookingClass": "N",
                  "departure": {
                      "time": "01:30:00",
                      "date": "2024-01-10",
                      "location": "DOH"
                  },
                  "arrival": {
                      "time": "08:50:00",
                      "date": "2024-01-10",
                      "terminal": "I",
                      "location": "LOS"
                  },
                  "duration": "560",
                  "numberOfStops": 0,
                  "baggage": "4 pcs"
              }
          ]
      ],
      "pricingInformation": {
          "passengerFares": {
              "adult": {
                  "basePrice": "USD 445",
                  "passengerCount": 1,
                  "taxes": "USD 361.5",
                  "totalPrice": "USD 806.5"
              },
              "child": {
                  "basePrice": "USD 340",
                  "passengerCount": 1,
                  "taxes": "USD 252.4",
                  "totalPrice": "USD 592.4"
              }
          },
          "price": {
              "basePrice": "USD 626",
              "taxes": "USD 613.9",
              "totalPrice": "USD 1,398.9"
          }
      },
      "destinations": [
          {
              "from": "LOS",
              "to": "LHR",
              "departure": {
                  "date": "2024-01-10"
              },
              "date": "Wed Jan 10 2024 00:00:00 GMT+0300"
          }
      ],
      "supplier": "Sabre"
  },
  {
      "id": "10",
      "directions": [
          [
              {
                  "segmentRef": "2",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/QR@2x.png",
                          "description": "QR"
                      },
                      "marketing": "QR",
                      "operating": "QR"
                  },
                  "aircraftType": "388",
                  "seatAvailability": "36",
                  "flightNumber": "10",
                  "cabinClass": "Y",
                  "bookingClass": "N",
                  "departure": {
                      "time": "08:35:00",
                      "date": "2024-01-10",
                      "terminal": "4",
                      "location": "LHR"
                  },
                  "arrival": {
                      "time": "18:25:00",
                      "date": "2024-01-10",
                      "location": "DOH"
                  },
                  "duration": "410",
                  "numberOfStops": 0,
                  "baggage": "4 pcs"
              },
              {
                  "segmentRef": "1",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/QR@2x.png",
                          "description": "QR"
                      },
                      "marketing": "QR",
                      "operating": "QR"
                  },
                  "aircraftType": "789",
                  "seatAvailability": "36",
                  "flightNumber": "1407",
                  "cabinClass": "Y",
                  "bookingClass": "N",
                  "departure": {
                      "time": "01:30:00",
                      "date": "2024-01-10",
                      "location": "DOH"
                  },
                  "arrival": {
                      "time": "08:50:00",
                      "date": "2024-01-10",
                      "terminal": "I",
                      "location": "LOS"
                  },
                  "duration": "560",
                  "numberOfStops": 0,
                  "baggage": "4 pcs"
              }
          ]
      ],
      "pricingInformation": {
          "passengerFares": {
              "adult": {
                  "basePrice": "USD 445",
                  "passengerCount": 1,
                  "taxes": "USD 361.5",
                  "totalPrice": "USD 806.5"
              },
              "child": {
                  "basePrice": "USD 340",
                  "passengerCount": 1,
                  "taxes": "USD 252.4",
                  "totalPrice": "USD 592.4"
              }
          },
          "price": {
              "basePrice": "USD 626",
              "taxes": "USD 613.9",
              "totalPrice": "USD 1,398.9"
          }
      },
      "destinations": [
          {
              "from": "LOS",
              "to": "LHR",
              "departure": {
                  "date": "2024-01-10"
              },
              "date": "Wed Jan 10 2024 00:00:00 GMT+0300"
          }
      ],
      "supplier": "Sabre"
  },
  {
      "id": "11",
      "directions": [
          [
              {
                  "segmentRef": "4",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/QR@2x.png",
                          "description": "QR"
                      },
                      "marketing": "QR",
                      "operating": "QR"
                  },
                  "aircraftType": "77W",
                  "seatAvailability": "36",
                  "flightNumber": "6",
                  "cabinClass": "Y",
                  "bookingClass": "N",
                  "departure": {
                      "time": "08:05:00",
                      "date": "2024-01-10",
                      "terminal": "4",
                      "location": "LHR"
                  },
                  "arrival": {
                      "time": "17:55:00",
                      "date": "2024-01-10",
                      "location": "DOH"
                  },
                  "duration": "410",
                  "numberOfStops": 0,
                  "baggage": "4 pcs"
              },
              {
                  "segmentRef": "1",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/QR@2x.png",
                          "description": "QR"
                      },
                      "marketing": "QR",
                      "operating": "QR"
                  },
                  "aircraftType": "789",
                  "seatAvailability": "36",
                  "flightNumber": "1407",
                  "cabinClass": "Y",
                  "bookingClass": "N",
                  "departure": {
                      "time": "01:30:00",
                      "date": "2024-01-10",
                      "location": "DOH"
                  },
                  "arrival": {
                      "time": "08:50:00",
                      "date": "2024-01-10",
                      "terminal": "I",
                      "location": "LOS"
                  },
                  "duration": "560",
                  "numberOfStops": 0,
                  "baggage": "4 pcs"
              }
          ]
      ],
      "pricingInformation": {
          "passengerFares": {
              "adult": {
                  "basePrice": "USD 445",
                  "passengerCount": 1,
                  "taxes": "USD 361.5",
                  "totalPrice": "USD 806.5"
              },
              "child": {
                  "basePrice": "USD 340",
                  "passengerCount": 1,
                  "taxes": "USD 252.4",
                  "totalPrice": "USD 592.4"
              }
          },
          "price": {
              "basePrice": "USD 626",
              "taxes": "USD 613.9",
              "totalPrice": "USD 1,398.9"
          }
      },
      "destinations": [
          {
              "from": "LOS",
              "to": "LHR",
              "departure": {
                  "date": "2024-01-10"
              },
              "date": "Wed Jan 10 2024 00:00:00 GMT+0300"
          }
      ],
      "supplier": "Sabre"
  },
  {
      "id": "12",
      "directions": [
          [
              {
                  "segmentRef": "25",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/KL@2x.png",
                          "description": "KL"
                      },
                      "marketing": "KL",
                      "operating": "KL"
                  },
                  "aircraftType": "295",
                  "seatAvailability": "54",
                  "flightNumber": "1032",
                  "cabinClass": "Y",
                  "bookingClass": "L,Q",
                  "departure": {
                      "time": "20:25:00",
                      "date": "2024-01-10",
                      "terminal": "4",
                      "location": "LHR"
                  },
                  "arrival": {
                      "time": "22:35:00",
                      "date": "2024-01-10",
                      "location": "AMS"
                  },
                  "duration": "70",
                  "numberOfStops": 0,
                  "baggage": "2 pcs"
              },
              {
                  "segmentRef": "15",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/KL@2x.png",
                          "description": "KL"
                      },
                      "marketing": "KL",
                      "operating": "KL"
                  },
                  "aircraftType": "73J",
                  "seatAvailability": "54",
                  "flightNumber": "1223",
                  "cabinClass": "Y",
                  "bookingClass": "L,Q",
                  "departure": {
                      "time": "06:50:00",
                      "date": "2024-01-10",
                      "location": "AMS"
                  },
                  "arrival": {
                      "time": "08:10:00",
                      "date": "2024-01-10",
                      "terminal": "2F",
                      "location": "CDG"
                  },
                  "duration": "80",
                  "numberOfStops": 0,
                  "baggage": "2 pcs"
              },
              {
                  "segmentRef": "10",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/KL@2x.png",
                          "description": "KL"
                      },
                      "marketing": "KL",
                      "operating": "AF"
                  },
                  "aircraftType": "332",
                  "seatAvailability": "54",
                  "flightNumber": "2355",
                  "cabinClass": "Y",
                  "bookingClass": "L,Q",
                  "departure": {
                      "time": "14:40:00",
                      "date": "2024-01-10",
                      "terminal": "2E",
                      "location": "CDG"
                  },
                  "arrival": {
                      "time": "21:05:00",
                      "date": "2024-01-10",
                      "terminal": "I",
                      "location": "LOS"
                  },
                  "duration": "385",
                  "numberOfStops": 0,
                  "baggage": "2 pcs"
              }
          ]
      ],
      "pricingInformation": {
          "passengerFares": {
              "adult": {
                  "basePrice": "USD 511",
                  "passengerCount": 1,
                  "taxes": "USD 315.5",
                  "totalPrice": "USD 826.5"
              },
              "child": {
                  "basePrice": "USD 386",
                  "passengerCount": 1,
                  "taxes": "USD 206.4",
                  "totalPrice": "USD 592.4"
              }
          },
          "price": {
              "basePrice": "USD 716",
              "taxes": "USD 521.9",
              "totalPrice": "USD 1,418.9"
          }
      },
      "destinations": [
          {
              "from": "LOS",
              "to": "LHR",
              "departure": {
                  "date": "2024-01-10"
              },
              "date": "Wed Jan 10 2024 00:00:00 GMT+0300"
          }
      ],
      "supplier": "Sabre"
  },
  {
      "id": "13",
      "directions": [
          [
              {
                  "segmentRef": "25",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/KL@2x.png",
                          "description": "KL"
                      },
                      "marketing": "KL",
                      "operating": "KL"
                  },
                  "aircraftType": "295",
                  "seatAvailability": "54",
                  "flightNumber": "1032",
                  "cabinClass": "Y",
                  "bookingClass": "L,Q",
                  "departure": {
                      "time": "20:25:00",
                      "date": "2024-01-10",
                      "terminal": "4",
                      "location": "LHR"
                  },
                  "arrival": {
                      "time": "22:35:00",
                      "date": "2024-01-10",
                      "location": "AMS"
                  },
                  "duration": "70",
                  "numberOfStops": 0,
                  "baggage": "2 pcs"
              },
              {
                  "segmentRef": "20",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/KL@2x.png",
                          "description": "KL"
                      },
                      "marketing": "KL",
                      "operating": "KL"
                  },
                  "aircraftType": "73H",
                  "seatAvailability": "54",
                  "flightNumber": "1227",
                  "cabinClass": "Y",
                  "bookingClass": "L,Q",
                  "departure": {
                      "time": "07:15:00",
                      "date": "2024-01-10",
                      "location": "AMS"
                  },
                  "arrival": {
                      "time": "08:45:00",
                      "date": "2024-01-10",
                      "terminal": "2F",
                      "location": "CDG"
                  },
                  "duration": "90",
                  "numberOfStops": 0,
                  "baggage": "2 pcs"
              },
              {
                  "segmentRef": "10",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/KL@2x.png",
                          "description": "KL"
                      },
                      "marketing": "KL",
                      "operating": "AF"
                  },
                  "aircraftType": "332",
                  "seatAvailability": "54",
                  "flightNumber": "2355",
                  "cabinClass": "Y",
                  "bookingClass": "L,Q",
                  "departure": {
                      "time": "14:40:00",
                      "date": "2024-01-10",
                      "terminal": "2E",
                      "location": "CDG"
                  },
                  "arrival": {
                      "time": "21:05:00",
                      "date": "2024-01-10",
                      "terminal": "I",
                      "location": "LOS"
                  },
                  "duration": "385",
                  "numberOfStops": 0,
                  "baggage": "2 pcs"
              }
          ]
      ],
      "pricingInformation": {
          "passengerFares": {
              "adult": {
                  "basePrice": "USD 511",
                  "passengerCount": 1,
                  "taxes": "USD 315.5",
                  "totalPrice": "USD 826.5"
              },
              "child": {
                  "basePrice": "USD 386",
                  "passengerCount": 1,
                  "taxes": "USD 206.4",
                  "totalPrice": "USD 592.4"
              }
          },
          "price": {
              "basePrice": "USD 716",
              "taxes": "USD 521.9",
              "totalPrice": "USD 1,418.9"
          }
      },
      "destinations": [
          {
              "from": "LOS",
              "to": "LHR",
              "departure": {
                  "date": "2024-01-10"
              },
              "date": "Wed Jan 10 2024 00:00:00 GMT+0300"
          }
      ],
      "supplier": "Sabre"
  },
  {
      "id": "14",
      "directions": [
          [
              {
                  "segmentRef": "24",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/VS@2x.png",
                          "description": "VS"
                      },
                      "marketing": "VS",
                      "operating": "VS"
                  },
                  "aircraftType": "351",
                  "seatAvailability": "18",
                  "flightNumber": "411",
                  "cabinClass": "Y",
                  "bookingClass": "T",
                  "departure": {
                      "time": "22:15:00",
                      "date": "2024-01-10",
                      "terminal": "3",
                      "location": "LHR"
                  },
                  "arrival": {
                      "time": "05:45:00",
                      "date": "2024-01-10",
                      "terminal": "I",
                      "location": "LOS"
                  },
                  "duration": "390",
                  "numberOfStops": 0,
                  "baggage": "0 pcs"
              }
          ]
      ],
      "pricingInformation": {
          "passengerFares": {
              "adult": {
                  "basePrice": "USD 692",
                  "passengerCount": 1,
                  "taxes": "USD 316.8",
                  "totalPrice": "USD 1,008.8"
              },
              "child": {
                  "basePrice": "USD 519",
                  "passengerCount": 1,
                  "taxes": "USD 207.7",
                  "totalPrice": "USD 726.7"
              }
          },
          "price": {
              "basePrice": "USD 966",
              "taxes": "USD 524.5",
              "totalPrice": "USD 1,735.5"
          }
      },
      "destinations": [
          {
              "from": "LOS",
              "to": "LHR",
              "departure": {
                  "date": "2024-01-10"
              },
              "date": "Wed Jan 10 2024 00:00:00 GMT+0300"
          }
      ],
      "supplier": "Sabre"
  },
  {
      "id": "15",
      "directions": [
          [
              {
                  "segmentRef": "19",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/AF@2x.png",
                          "description": "AF"
                      },
                      "marketing": "AF",
                      "operating": "AF"
                  },
                  "aircraftType": "223",
                  "seatAvailability": "36",
                  "flightNumber": "1181",
                  "cabinClass": "Y",
                  "bookingClass": "Y,M",
                  "departure": {
                      "time": "19:45:00",
                      "date": "2024-01-10",
                      "terminal": "4",
                      "location": "LHR"
                  },
                  "arrival": {
                      "time": "22:05:00",
                      "date": "2024-01-10",
                      "terminal": "2E",
                      "location": "CDG"
                  },
                  "duration": "80",
                  "numberOfStops": 0,
                  "baggage": "2 pcs"
              },
              {
                  "segmentRef": "3",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/AF@2x.png",
                          "description": "AF"
                      },
                      "marketing": "AF",
                      "operating": "AF"
                  },
                  "aircraftType": "321",
                  "seatAvailability": "36",
                  "flightNumber": "1240",
                  "cabinClass": "Y",
                  "bookingClass": "Y,M",
                  "departure": {
                      "time": "07:10:00",
                      "date": "2024-01-10",
                      "terminal": "2F",
                      "location": "CDG"
                  },
                  "arrival": {
                      "time": "08:35:00",
                      "date": "2024-01-10",
                      "location": "AMS"
                  },
                  "duration": "85",
                  "numberOfStops": 0,
                  "baggage": "2 pcs"
              },
              {
                  "segmentRef": "11",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/AF@2x.png",
                          "description": "AF"
                      },
                      "marketing": "AF",
                      "operating": "KL"
                  },
                  "aircraftType": "333",
                  "seatAvailability": "36",
                  "flightNumber": "8434",
                  "cabinClass": "Y",
                  "bookingClass": "Y,M",
                  "departure": {
                      "time": "13:50:00",
                      "date": "2024-01-10",
                      "location": "AMS"
                  },
                  "arrival": {
                      "time": "20:35:00",
                      "date": "2024-01-10",
                      "terminal": "I",
                      "location": "LOS"
                  },
                  "duration": "405",
                  "numberOfStops": 0,
                  "baggage": "2 pcs"
              }
          ]
      ],
      "pricingInformation": {
          "passengerFares": {
              "adult": {
                  "basePrice": "USD 1,176",
                  "passengerCount": 1,
                  "taxes": "USD 305.5",
                  "totalPrice": "USD 1,481.5"
              },
              "child": {
                  "basePrice": "USD 885",
                  "passengerCount": 1,
                  "taxes": "USD 196.4",
                  "totalPrice": "USD 1,081.4"
              }
          },
          "price": {
              "basePrice": "USD 1,644",
              "taxes": "USD 501.9",
              "totalPrice": "USD 2,562.9"
          }
      },
      "destinations": [
          {
              "from": "LOS",
              "to": "LHR",
              "departure": {
                  "date": "2024-01-10"
              },
              "date": "Wed Jan 10 2024 00:00:00 GMT+0300"
          }
      ],
      "supplier": "Sabre"
  },
  {
      "id": "16",
      "directions": [
          [
              {
                  "segmentRef": "19",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/AF@2x.png",
                          "description": "AF"
                      },
                      "marketing": "AF",
                      "operating": "AF"
                  },
                  "aircraftType": "223",
                  "seatAvailability": "54",
                  "flightNumber": "1181",
                  "cabinClass": "Y",
                  "bookingClass": "Y,M",
                  "departure": {
                      "time": "19:45:00",
                      "date": "2024-01-10",
                      "terminal": "4",
                      "location": "LHR"
                  },
                  "arrival": {
                      "time": "22:05:00",
                      "date": "2024-01-10",
                      "terminal": "2E",
                      "location": "CDG"
                  },
                  "duration": "80",
                  "numberOfStops": 0,
                  "baggage": "2 pcs"
              },
              {
                  "segmentRef": "13",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/AF@2x.png",
                          "description": "AF"
                      },
                      "marketing": "AF",
                      "operating": "AF"
                  },
                  "aircraftType": "223",
                  "seatAvailability": "54",
                  "flightNumber": "1340",
                  "cabinClass": "Y",
                  "bookingClass": "Y,M",
                  "departure": {
                      "time": "08:05:00",
                      "date": "2024-01-10",
                      "terminal": "2F",
                      "location": "CDG"
                  },
                  "arrival": {
                      "time": "09:30:00",
                      "date": "2024-01-10",
                      "location": "AMS"
                  },
                  "duration": "85",
                  "numberOfStops": 0,
                  "baggage": "2 pcs"
              },
              {
                  "segmentRef": "11",
                  "airline": {
                      "image": {
                          "url": "https://pics.avs.io/200/200/AF@2x.png",
                          "description": "AF"
                      },
                      "marketing": "AF",
                      "operating": "KL"
                  },
                  "aircraftType": "333",
                  "seatAvailability": "54",
                  "flightNumber": "8434",
                  "cabinClass": "Y",
                  "bookingClass": "Y,M",
                  "departure": {
                      "time": "13:50:00",
                      "date": "2024-01-10",
                      "location": "AMS"
                  },
                  "arrival": {
                      "time": "20:35:00",
                      "date": "2024-01-10",
                      "terminal": "I",
                      "location": "LOS"
                  },
                  "duration": "405",
                  "numberOfStops": 0,
                  "baggage": "2 pcs"
              }
          ]
      ],
      "pricingInformation": {
          "passengerFares": {
              "adult": {
                  "basePrice": "USD 1,176",
                  "passengerCount": 1,
                  "taxes": "USD 305.5",
                  "totalPrice": "USD 1,481.5"
              },
              "child": {
                  "basePrice": "USD 885",
                  "passengerCount": 1,
                  "taxes": "USD 196.4",
                  "totalPrice": "USD 1,081.4"
              }
          },
          "price": {
              "basePrice": "USD 1,644",
              "taxes": "USD 501.9",
              "totalPrice": "USD 2,562.9"
          }
      },
      "destinations": [
          {
              "from": "LOS",
              "to": "LHR",
              "departure": {
                  "date": "2024-01-10"
              },
              "date": "Wed Jan 10 2024 00:00:00 GMT+0300"
          }
      ],
      "supplier": "Sabre"
  }
]