import React, { useState } from 'react'
import { formatMoney } from '../features/utils/formatMoney'

export default function Test() {
	const [selected, setSelected] = useState({});

	let deck = seatMapData[0]?.decks?.at(0);
	let seats = deck?.seats

	function handleReturn(obj) {
		console.log(obj)
	}

	function toggleSeat(obj, loc) {
		// console.log(' toggle seat : ',obj)
		if (selected[loc]) removeFromSeat(loc)
		else placeSeat(obj, loc)
	}
	function placeSeat(row, key) {
		// let newObj = clone(selected);
		// newObj[key] = row;
		setSelected({ [key]: row })

		handleReturn({ [key]: row })
	}
	function removeFromSeat(key) {
		const { [key]: _, ...rest } = selected;
		setSelected(rest)

		handleReturn(rest)
	}

	let width = deck?.deckConfiguration?.width;
	let length = deck?.deckConfiguration?.length;

	return (
		<div className='test flex flex-col flex-wrap'>
			{[...Array(length)]?.map((_,i) => 
				<div className='flex gap-2 justify-center'> {
					[...Array(width)]?.map((_,j) => width*i+j < seats?.length && (
						<span className='bg-black text-white p-2 m-2 w-10 h-10 flex flex-col items-center justify-center '>
							{/* {seats?.at((width*(i))+j)?.number} */}
							{width*i+j}
							<small>
								{seats?.at(width*i+j)?.characteristicsCodes?.includes('W') ? 'window':''}
							</small>
						</span>
				))
				}</div>
			)}
			{/* {seats?.map((obj, i) => (
				<div className='flex gap-2' key={i}> */}
					{/* {deck} */}
					{/* {obj.rowDetails.seatOccupationDetails && obj.rowDetails.seatOccupationDetails.map((col, i) => {
						let loc = obj.rowDetails.seatRowNumber + "" + col.seatColumn
						return (
							<label key={i} onClick={() => toggleSeat(obj, loc)}
								className={`w-10 h-10 bg-primary/10 flex flex-col items-center justify-center cursor-pointer
                hover:shadow-md shadow-primary hover:border-theme1 border
                ${selected[loc] ? ' bg-theme1 ' : ''}
                `}>
								{loc}
								<small className='w-full !text-[8px] text-center'>{col.seatCharacteristic['3'] === 'W' && "window"}</small>
							</label>
						)
					})} */}
				{/* </div>
			))} */}
		</div>
	)
}
const seatMapData = [
	{
		"id": "1",
		"type": "seatmap",
		"departure": {
			"iataCode": "LOS",
			"terminal": "I",
			"at": "2024-01-17T23:55:00"
		},
		"arrival": {
			"iataCode": "FRA",
			"terminal": "1",
			"at": "2024-01-18T06:25:00"
		},
		"carrierCode": "LH",
		"number": "569",
		"operating": {
			"carrierCode": "LH"
		},
		"aircraft": {
			"code": "343"
		},
		"class": "L",
		"flightOfferId": "125480",
		"segmentId": "5",
		"decks": [
			{
				"deckType": "MAIN",
				"deckConfiguration": {
					"width": 10,
					"length": 35,
					"startSeatRow": 16,
					"endSeatRow": 46,
					"startWingsX": 0,
					"endWingsX": 10,
					"startWingsRow": 16,
					"endWingsRow": 27,
					"exitRowsX": [
						16
					]
				},
				"facilities": [
					{
						"code": "G",
						"column": "A",
						"row": "27",
						"position": "REAR",
						"coordinates": {
							"x": 11,
							"y": 0
						}
					},
					{
						"code": "G",
						"column": "K",
						"row": "27",
						"position": "REAR",
						"coordinates": {
							"x": 11,
							"y": 9
						}
					},
					{
						"code": "G",
						"column": "E",
						"row": "27",
						"position": "REAR",
						"coordinates": {
							"x": 11,
							"y": 4
						}
					},
					{
						"code": "G",
						"column": "D",
						"row": "27",
						"position": "REAR",
						"coordinates": {
							"x": 11,
							"y": 3
						}
					},
					{
						"code": "LA",
						"column": "A",
						"row": "27",
						"position": "REAR",
						"coordinates": {
							"x": 12,
							"y": 0
						}
					},
					{
						"code": "LA",
						"column": "K",
						"row": "27",
						"position": "REAR",
						"coordinates": {
							"x": 12,
							"y": 9
						}
					},
					{
						"code": "LA",
						"column": "E",
						"row": "27",
						"position": "REAR",
						"coordinates": {
							"x": 12,
							"y": 4
						}
					},
					{
						"code": "LA",
						"column": "D",
						"row": "27",
						"position": "REAR",
						"coordinates": {
							"x": 12,
							"y": 3
						}
					},
					{
						"code": "LA",
						"column": "A",
						"row": "27",
						"position": "REAR",
						"coordinates": {
							"x": 13,
							"y": 0
						}
					},
					{
						"code": "LA",
						"column": "K",
						"row": "27",
						"position": "REAR",
						"coordinates": {
							"x": 13,
							"y": 9
						}
					},
					{
						"code": "SO",
						"column": "D",
						"row": "27",
						"position": "REAR",
						"coordinates": {
							"x": 14,
							"y": 3
						}
					},
					{
						"code": "SO",
						"column": "G",
						"row": "27",
						"position": "REAR",
						"coordinates": {
							"x": 14,
							"y": 6
						}
					},
					{
						"code": "SO",
						"column": "E",
						"row": "27",
						"position": "REAR",
						"coordinates": {
							"x": 14,
							"y": 4
						}
					},
					{
						"code": "SO",
						"column": "F",
						"row": "27",
						"position": "REAR",
						"coordinates": {
							"x": 14,
							"y": 5
						}
					},
					{
						"code": "G",
						"column": "D",
						"row": "46",
						"position": "REAR",
						"coordinates": {
							"x": 33,
							"y": 3
						}
					},
					{
						"code": "G",
						"column": "G",
						"row": "46",
						"position": "REAR",
						"coordinates": {
							"x": 33,
							"y": 6
						}
					},
					{
						"code": "G",
						"column": "E",
						"row": "46",
						"position": "REAR",
						"coordinates": {
							"x": 33,
							"y": 4
						}
					},
					{
						"code": "G",
						"column": "F",
						"row": "46",
						"position": "REAR",
						"coordinates": {
							"x": 33,
							"y": 5
						}
					},
					{
						"code": "G",
						"column": "D",
						"row": "46",
						"position": "REAR",
						"coordinates": {
							"x": 34,
							"y": 3
						}
					},
					{
						"code": "G",
						"column": "G",
						"row": "46",
						"position": "REAR",
						"coordinates": {
							"x": 34,
							"y": 6
						}
					},
					{
						"code": "G",
						"column": "E",
						"row": "46",
						"position": "REAR",
						"coordinates": {
							"x": 34,
							"y": 4
						}
					},
					{
						"code": "G",
						"column": "F",
						"row": "46",
						"position": "REAR",
						"coordinates": {
							"x": 34,
							"y": 5
						}
					}
				],
				"seats": [
					{
						"cabin": "ECONOMY",
						"number": "16A",
						"characteristicsCodes": [
							"CH",
							"L",
							"LS",
							"OW",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 0,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "16C",
						"characteristicsCodes": [
							"A",
							"CH",
							"L",
							"LS",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 0,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "16D",
						"characteristicsCodes": [
							"A",
							"CH",
							"L",
							"LS",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 0,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "16E",
						"characteristicsCodes": [
							"9",
							"CH",
							"L",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 0,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "16G",
						"characteristicsCodes": [
							"A",
							"CH",
							"L",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 0,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "16H",
						"characteristicsCodes": [
							"A",
							"CH",
							"L",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 0,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "16K",
						"characteristicsCodes": [
							"CH",
							"L",
							"OW",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 0,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "18A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"O",
							"OW",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 1,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "18C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"O",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 1,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "18D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"O",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 1,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "18E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS",
							"O",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 1,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "18F",
						"characteristicsCodes": [
							"9",
							"CH",
							"O",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 1,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "18G",
						"characteristicsCodes": [
							"A",
							"CH",
							"O",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 1,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "18H",
						"characteristicsCodes": [
							"A",
							"CH",
							"O",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 1,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "18K",
						"characteristicsCodes": [
							"CH",
							"O",
							"OW",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 1,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "19A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"O",
							"OW",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 2,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "19C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"O",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 2,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "19D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"O",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 2,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "19E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS",
							"O",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 2,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "19F",
						"characteristicsCodes": [
							"9",
							"CH",
							"O",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 2,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "19G",
						"characteristicsCodes": [
							"A",
							"CH",
							"O",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 2,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "19H",
						"characteristicsCodes": [
							"A",
							"CH",
							"O",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 2,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "19K",
						"characteristicsCodes": [
							"CH",
							"O",
							"OW",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 2,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "20A",
						"characteristicsCodes": [
							"1A",
							"CH",
							"LS",
							"O",
							"OW",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 3,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "20C",
						"characteristicsCodes": [
							"1A",
							"A",
							"CH",
							"LS",
							"O",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 3,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "20D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"O",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 3,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "20E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS",
							"O",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 3,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "20F",
						"characteristicsCodes": [
							"9",
							"CH",
							"O",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 3,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "20G",
						"characteristicsCodes": [
							"A",
							"CH",
							"O",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 3,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "20H",
						"characteristicsCodes": [
							"1A",
							"A",
							"CH",
							"O",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 3,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "20K",
						"characteristicsCodes": [
							"1A",
							"CH",
							"O",
							"OW",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 3,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "21A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"O",
							"OW",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 4,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "21C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"O",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 4,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "21D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"O",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 4,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "21E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS",
							"O",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 4,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "21F",
						"characteristicsCodes": [
							"9",
							"CH",
							"O",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 4,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "21G",
						"characteristicsCodes": [
							"A",
							"CH",
							"O",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 4,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "21H",
						"characteristicsCodes": [
							"A",
							"CH",
							"O",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 4,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "21K",
						"characteristicsCodes": [
							"CH",
							"O",
							"OW",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 4,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "22A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"O",
							"OW",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 5,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "22C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"O",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 5,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "22D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"O",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 5,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "22E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS",
							"O",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 5,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "22F",
						"characteristicsCodes": [
							"9",
							"CH",
							"O",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 5,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "22G",
						"characteristicsCodes": [
							"A",
							"CH",
							"O",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 5,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "22H",
						"characteristicsCodes": [
							"A",
							"CH",
							"O",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 5,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "22K",
						"characteristicsCodes": [
							"CH",
							"O",
							"OW",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "63381",
									"base": "63381",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 5,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "23A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"OW",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 6,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "23C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 6,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "23D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 6,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "23E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 6,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "23F",
						"characteristicsCodes": [
							"9",
							"CH",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 6,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "23G",
						"characteristicsCodes": [
							"A",
							"CH",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 6,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "23H",
						"characteristicsCodes": [
							"A",
							"CH",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 6,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "23K",
						"characteristicsCodes": [
							"CH",
							"OW",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 6,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "24A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"OW",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 7,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "24C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 7,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "24D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 7,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "24E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 7,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "24F",
						"characteristicsCodes": [
							"9",
							"CH",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 7,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "24G",
						"characteristicsCodes": [
							"A",
							"CH",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 7,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "24H",
						"characteristicsCodes": [
							"A",
							"CH",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 7,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "24K",
						"characteristicsCodes": [
							"CH",
							"OW",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 7,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "25A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"OW",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 8,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "25C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 8,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "25D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "OCCUPIED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "OCCUPIED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 8,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "25E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "OCCUPIED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "OCCUPIED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 8,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "25F",
						"characteristicsCodes": [
							"9",
							"CH",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "OCCUPIED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "OCCUPIED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 8,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "25G",
						"characteristicsCodes": [
							"A",
							"CH",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "OCCUPIED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "OCCUPIED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 8,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "25H",
						"characteristicsCodes": [
							"A",
							"CH",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 8,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "25K",
						"characteristicsCodes": [
							"CH",
							"OW",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 8,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "26A",
						"characteristicsCodes": [
							"1A",
							"CH",
							"LS",
							"OW",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 9,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "26C",
						"characteristicsCodes": [
							"1A",
							"A",
							"CH",
							"LS",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 9,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "26D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 9,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "26E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS",
							"OW"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 9,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "26F",
						"characteristicsCodes": [
							"9",
							"CH",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 9,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "26G",
						"characteristicsCodes": [
							"A",
							"CH",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "OCCUPIED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "OCCUPIED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 9,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "26H",
						"characteristicsCodes": [
							"1A",
							"A",
							"CH",
							"OW",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 9,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "26K",
						"characteristicsCodes": [
							"1A",
							"CH",
							"OW",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 9,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "27A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"OW",
							"V",
							"W",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 10,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "27C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"OW",
							"V",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 10,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "27D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"OW",
							"V",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 10,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "27E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS",
							"OW",
							"V",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 10,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "27F",
						"characteristicsCodes": [
							"9",
							"CH",
							"OW",
							"RS",
							"V",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 10,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "27G",
						"characteristicsCodes": [
							"A",
							"CH",
							"OW",
							"RS",
							"V",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 10,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "27H",
						"characteristicsCodes": [
							"A",
							"CH",
							"OW",
							"RS",
							"V",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 10,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "27K",
						"characteristicsCodes": [
							"CH",
							"OW",
							"RS",
							"V",
							"W",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 10,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "29D",
						"characteristicsCodes": [
							"A",
							"B",
							"CH",
							"LS",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 15,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "29E",
						"characteristicsCodes": [
							"9",
							"CH",
							"I",
							"K",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 15,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "29F",
						"characteristicsCodes": [
							"9",
							"CH",
							"I",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 15,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "29G",
						"characteristicsCodes": [
							"A",
							"B",
							"CH",
							"RS",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 15,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "30A",
						"characteristicsCodes": [
							"1A",
							"CH",
							"E",
							"L",
							"LS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 16,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "30C",
						"characteristicsCodes": [
							"1A",
							"A",
							"CH",
							"E",
							"L",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 16,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "30D",
						"characteristicsCodes": [
							"1A",
							"A",
							"CH",
							"IE",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 16,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "30E",
						"characteristicsCodes": [
							"1A",
							"9",
							"CH",
							"IE",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 16,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "30F",
						"characteristicsCodes": [
							"1A",
							"9",
							"CH",
							"IE",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 16,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "30G",
						"characteristicsCodes": [
							"1A",
							"A",
							"CH",
							"IE",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 16,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "30H",
						"characteristicsCodes": [
							"1A",
							"A",
							"CH",
							"E",
							"L",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 16,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "30K",
						"characteristicsCodes": [
							"1A",
							"CH",
							"E",
							"L",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "90721",
									"base": "90721",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 16,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "31A",
						"characteristicsCodes": [
							"1A",
							"CH",
							"LS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 17,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "31C",
						"characteristicsCodes": [
							"1A",
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 17,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "31D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 17,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "31E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 17,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "31F",
						"characteristicsCodes": [
							"9",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 17,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "31G",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 17,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "31H",
						"characteristicsCodes": [
							"1A",
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 17,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "31K",
						"characteristicsCodes": [
							"1A",
							"CH",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 17,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "32A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 18,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "32C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 18,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "32D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"V",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 18,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "32E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS",
							"V",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 18,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "32F",
						"characteristicsCodes": [
							"9",
							"CH",
							"RS",
							"V",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 18,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "32G",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS",
							"V",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 18,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "32H",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 18,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "32K",
						"characteristicsCodes": [
							"CH",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 18,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "33A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 19,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "33C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 19,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "33D",
						"characteristicsCodes": [
							"A",
							"CH",
							"H",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 19,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "33E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 19,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "33F",
						"characteristicsCodes": [
							"9",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 19,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "33G",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 19,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "33H",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 19,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "33K",
						"characteristicsCodes": [
							"CH",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 19,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "34A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 20,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "34C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 20,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "34D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 20,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "34E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 20,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "34F",
						"characteristicsCodes": [
							"9",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 20,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "34G",
						"characteristicsCodes": [
							"A",
							"CH",
							"H",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 20,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "34H",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 20,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "34K",
						"characteristicsCodes": [
							"CH",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 20,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "35A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 21,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "35C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 21,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "35D",
						"characteristicsCodes": [
							"A",
							"CH",
							"H",
							"LS",
							"V",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 21,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "35E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS",
							"V",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 21,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "35F",
						"characteristicsCodes": [
							"9",
							"CH",
							"RS",
							"V",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 21,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "35G",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS",
							"V",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 21,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "35H",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 21,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "35K",
						"characteristicsCodes": [
							"CH",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 21,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "36A",
						"characteristicsCodes": [
							"1A",
							"CH",
							"LS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 22,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "36C",
						"characteristicsCodes": [
							"1A",
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 22,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "36D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 22,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "36E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 22,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "36F",
						"characteristicsCodes": [
							"9",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 22,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "36G",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 22,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "36H",
						"characteristicsCodes": [
							"1A",
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 22,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "36K",
						"characteristicsCodes": [
							"1A",
							"CH",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 22,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "37A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 23,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "37C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 23,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "37D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 23,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "37E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 23,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "37F",
						"characteristicsCodes": [
							"9",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 23,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "37G",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 23,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "37H",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 23,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "37K",
						"characteristicsCodes": [
							"CH",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 23,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "38A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 24,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "38C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 24,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "38D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"V",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 24,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "38E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS",
							"V",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 24,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "38F",
						"characteristicsCodes": [
							"9",
							"CH",
							"RS",
							"V",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 24,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "38G",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS",
							"V",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 24,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "38H",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 24,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "38K",
						"characteristicsCodes": [
							"CH",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 24,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "39A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 25,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "39C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 25,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "39D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 25,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "39E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 25,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "39F",
						"characteristicsCodes": [
							"9",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 25,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "39G",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 25,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "39H",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 25,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "39K",
						"characteristicsCodes": [
							"CH",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 25,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "40A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 26,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "40C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 26,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "40D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 26,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "40E",
						"characteristicsCodes": [
							"9",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 26,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "40F",
						"characteristicsCodes": [
							"9",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 26,
							"y": 5
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "40G",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 26,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "40H",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 26,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "40K",
						"characteristicsCodes": [
							"CH",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 26,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "41A",
						"characteristicsCodes": [
							"1A",
							"CH",
							"LS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 27,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "41C",
						"characteristicsCodes": [
							"1A",
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 27,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "41D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 27,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "41E",
						"characteristicsCodes": [
							"9",
							"CH"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 27,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "41G",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 27,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "41H",
						"characteristicsCodes": [
							"1A",
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 27,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "41K",
						"characteristicsCodes": [
							"1A",
							"CH",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 27,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "42A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 28,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "42C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 28,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "42D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 28,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "42E",
						"characteristicsCodes": [
							"9",
							"CH"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 28,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "42G",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 28,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "42H",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 28,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "42K",
						"characteristicsCodes": [
							"CH",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 28,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "43A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 29,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "43C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 29,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "43D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"U"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 29,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "43E",
						"characteristicsCodes": [
							"9",
							"CH",
							"U"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 29,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "43G",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS",
							"U"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 29,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "43H",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS",
							"U"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 29,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "43K",
						"characteristicsCodes": [
							"CH",
							"RS",
							"U",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 29,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "44A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 30,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "44C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 30,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "44D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"U"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 30,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "44E",
						"characteristicsCodes": [
							"9",
							"CH",
							"U"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 30,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "44G",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS",
							"U"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 30,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "44H",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS",
							"U"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 30,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "44K",
						"characteristicsCodes": [
							"CH",
							"RS",
							"U",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 30,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "45A",
						"characteristicsCodes": [
							"CH",
							"LS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 31,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "45C",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 31,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "45D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 31,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "45E",
						"characteristicsCodes": [
							"9",
							"CH"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 31,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "45G",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 31,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "45H",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 31,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "45K",
						"characteristicsCodes": [
							"CH",
							"RS",
							"W"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "AVAILABLE",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 31,
							"y": 9
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "46A",
						"characteristicsCodes": [
							"1A",
							"CH",
							"LS",
							"W",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 32,
							"y": 0
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "46C",
						"characteristicsCodes": [
							"1A",
							"A",
							"CH",
							"LS",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 32,
							"y": 1
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "46D",
						"characteristicsCodes": [
							"A",
							"CH",
							"LS",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 32,
							"y": 3
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "46E",
						"characteristicsCodes": [
							"9",
							"CH",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 32,
							"y": 4
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "46G",
						"characteristicsCodes": [
							"A",
							"CH",
							"RS",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 32,
							"y": 6
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "46H",
						"characteristicsCodes": [
							"1A",
							"A",
							"CH",
							"RS",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 32,
							"y": 8
						}
					},
					{
						"cabin": "ECONOMY",
						"number": "46K",
						"characteristicsCodes": [
							"1A",
							"CH",
							"RS",
							"W",
							"1"
						],
						"travelerPricing": [
							{
								"travelerId": "1",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							},
							{
								"travelerId": "2",
								"seatAvailabilityStatus": "BLOCKED",
								"price": {
									"currency": "NGN",
									"total": "43497",
									"base": "43497",
									"taxes": [
										{
											"amount": "0",
											"code": "SUPPLIER"
										}
									]
								}
							}
						],
						"coordinates": {
							"x": 32,
							"y": 9
						}
					}
				]
			}
		],
		"aircraftCabinAmenities": {
			"power": {
				"isChargeable": false,
				"powerType": "USB_PORT",
				"usbType": "USB_C"
			},
			"seat": {
				"legSpace": 29,
				"spaceUnit": "INCHES",
				"tilt": "NORMAL",
				"medias": [
					{
						"title": "Comfortable Seats",
						"href": "https://pdt.content.amadeus.com/AncillaryServicesMedia/14223418_395.jpg",
						"description": {
							"text": "Settle in with comfortable seats and an ecoTHREAD blanket made from 100% recycled plastic bottles.",
							"lang": "EN"
						},
						"mediaType": "image"
					},
					{
						"title": "Stay Connected",
						"href": "https://pdt.content.amadeus.com/AncillaryServicesMedia/71344149_DFL.jpg",
						"description": {
							"text": "Stay connected next time you fly. Choose from our great value Wi-Fi plans.",
							"lang": "EN"
						},
						"mediaType": "image"
					},
					{
						"title": "Be Curious",
						"href": "https://pdt.content.amadeus.com/AncillaryServicesMedia/42266150_401.jpg",
						"description": {
							"text": "With special seat,meals, toys, and dedicated children's ice channels, we encourage curious minds and inspire tomorrow's explorers.",
							"lang": "EN"
						},
						"mediaType": "image"
					}
				]
			},
			"wifi": {
				"isChargeable": true,
				"wifiCoverage": "FULL"
			},
			"entertainment": [
				{
					"isChargeable": false,
					"entertainmentType": "AUDIO_VIDEO_ON_DEMAND"
				},
				{
					"isChargeable": false,
					"entertainmentType": "IP_TV"
				}
			],
			"food": {
				"isChargeable": false,
				"foodType": "SNACK"
			},
			"beverage": {
				"isChargeable": false,
				"beverageType": "ALCOHOLIC_AND_NON_ALCOHOLIC"
			}
		},
		"availableSeatsCounters": [
			{
				"travelerId": "1",
				"value": 187
			},
			{
				"travelerId": "2",
				"value": 179
			}
		]
	}
]