export const commissionData = {
    "airline": "", // BA,
    "startDate": "", // 2023-11-10,
    "endDate": "", // 2025-08-10, //optional
    "includedAgents": [], //optional
    "excludedAgents": [], //optional
    "minimumTicketSalesAmount": null, // 100
    "notes": "", // some description about the commission, //optional
    "tiers": [
        {
            "name": "", // Start,
            "fromTicketSalesAmount": null, // 400
            "toTicketSalesAmount": null, // 4000
            "tierAmount": null
        }
    ],
    "commissionCalculationMethod": "", // Percentage //Percentage, Fixed
}