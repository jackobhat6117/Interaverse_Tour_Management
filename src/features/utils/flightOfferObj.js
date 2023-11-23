export default function convertFlightObject(newObj) {
  var oldObj = {
    farePrice: {
      fareTotal: parseFloat(newObj.pricingInformation.price.basePrice.split(' ')[1]),
      convertedTotal: parseFloat(newObj.pricingInformation.price.totalPrice.split(' ')[1])
    },
    passengers: {
      adult: {
        totalAmountWithoutTax: parseFloat(newObj.pricingInformation.passengerFares.adult.totalPrice.split(' ')[1]),
        totalAmount: parseFloat(newObj.pricingInformation.passengerFares.adult.basePrice.split(' ')[1]),
        total: newObj.pricingInformation.passengerFares.adult.passengerCount
      }
    },
    segments: []
  };

  newObj.directions.forEach(function(direction) {
    var segment = {
      flights: [],
      departureLocation: direction[0].departure.location,
      arrivalLocation: direction[direction.length - 1].arrival.location,
      departureDate: direction[0].departure.date,
      arrivalDate: direction[direction.length - 1].arrival.date
    };

    direction.forEach(function(flight) {
      var oldFlight = {
        carrierIcon: flight.airline.image.url,
        marketingCarrier: flight.airline.marketing,
        equipment: flight.aircraftType,
        flightNumber: flight.flightNumber,
        cabin: flight.cabinClass,
        bookingClass: flight.bookingClass,
        departureTime: flight.departure.time,
        departureDate: flight.departure.date,
        departureTerminal: flight.departure.terminal,
        departureLocation: flight.departure.location,
        arrivalTime: flight.arrival.time,
        arrivalDate: flight.arrival.date,
        arrivalTerminal: flight.arrival.terminal,
        arrivalLocation: flight.arrival.location,
        duration: flight.duration,
        numberOfStops: flight.numberOfStops,
        baggage: flight.baggage
      };

      segment.flights.push(oldFlight);
    });

    oldObj.segments.push(segment);
  });

  return oldObj;
}

export const newFlightObj = {
  "id": "1",
  "directions": [
    [
      {
        "segmentRef": "15",
        "airline": {
          "image": {
            "url": "https://pics.avs.io/200/200/AF@2x.png",
            "description": "AF"
          },
          "marketing": "AF",
          "operating": "AF"
        },
        "aircraftType": "332",
        "seatAvailability": 2,
        "flightNumber": "149",
        "cabinClass": "ECONOMY",
        "bookingClass": "T",
        "departure": {
          "time": "23:30",
          "date": "Nov,24,2023",
          "terminal": "I",
          "location": "LOS"
        },
        "arrival": {
          "time": "06:00",
          "date": "Nov,25,2023",
          "terminal": "2E",
          "location": "CDG"
        },
        "duration": "PT6H30M",
        "numberOfStops": 0,
        "baggage": "1 pc"
      },
      {
        "segmentRef": "16",
        "airline": {
          "image": {
            "url": "https://pics.avs.io/200/200/AF@2x.png",
            "description": "AF"
          },
          "marketing": "AF",
          "operating": "AF"
        },
        "aircraftType": "321",
        "seatAvailability": 2,
        "flightNumber": "1680",
        "cabinClass": "ECONOMY",
        "bookingClass": "L",
        "departure": {
          "time": "07:35",
          "date": "Nov,25,2023",
          "terminal": "2E",
          "location": "CDG"
        },
        "arrival": {
          "time": "08:00",
          "date": "Nov,25,2023",
          "terminal": "4",
          "location": "LHR"
        },
        "duration": "PT1H25M",
        "numberOfStops": 0,
        "baggage": "1 pc"
      }
    ],
    [
      {
        "segmentRef": "42",
        "airline": {
          "image": {
            "url": "https://pics.avs.io/200/200/KL@2x.png",
            "description": "KL"
          },
          "marketing": "KL",
          "operating": "KL"
        },
        "aircraftType": "73W",
        "seatAvailability": 2,
        "flightNumber": "128",
        "cabinClass": "ECONOMY",
        "bookingClass": "L",
        "departure": {
          "time": "20:25",
          "date": "Nov,28,2023",
          "terminal": "3",
          "location": "LHR"
        },
        "arrival": {
          "time": "22:40",
          "date": "Nov,28,2023",
          "location": "AMS"
        },
        "duration": "PT1H15M",
        "numberOfStops": 0,
        "baggage": "1 pc"
      },
      {
        "segmentRef": "43",
        "airline": {
          "image": {
            "url": "https://pics.avs.io/200/200/KL@2x.png",
            "description": "KL"
          },
          "marketing": "KL",
          "operating": "KL"
        },
        "aircraftType": "332",
        "seatAvailability": 2,
        "flightNumber": "587",
        "cabinClass": "ECONOMY",
        "bookingClass": "N",
        "departure": {
          "time": "13:50",
          "date": "Nov,29,2023",
          "location": "AMS"
        },
        "arrival": {
          "time": "20:35",
          "date": "Nov,29,2023",
          "terminal": "I",
          "location": "LOS"
        },
        "duration": "PT6H45M",
        "numberOfStops": 0,
        "baggage": "1 pc"
      }
    ]
  ],
  "pricingInformation": {
    "price": {
      "basePrice": "USD 499",
      "totalPrice": "USD 1,612.6",
      "taxes": "USD 0"
    },
    "passengerFares": {
      "adult": {
        "totalPrice": "USD 895.3",
        "basePrice": "USD 284",
        "taxes": "USD 0",
        "passengerCount": 1
      },
      "child": {
        "totalPrice": "USD 717.3",
        "basePrice": "USD 215",
        "taxes": "USD 0",
        "passengerCount": 1
      }
    }
  },
  "destinations": [
    {
      "from": "LOS",
      "to": "LHR",
      "departure": {
        "date": "2023-11-24"
      }
    },
    {
      "from": "LHR",
      "to": "LOS",
      "departure": {
        "date": "2023-11-28"
      }
    }
  ],
  "supplier": "Amadeus"
}