import moment from "moment";

export function templateFlightOrderData(obj) {
    // let data = mergeRecursive({...obj},ordersDataTemplate)
    let data = {
        id: obj?.bookingId,
        date: moment(obj?.createdAt)?.format('DD, MMM'),
        name: '',
        provider: '',
        type: 'Flight',
        amount: obj?.flightBooking?.at(0)?.grandTotal,
        commission: '',
        updatedDate: moment(obj?.updatedAt)?.format('DD/MM/YYYY'),
        bookRef: obj?.flightBooking?.at(0)?.pnr,
        status: obj?.flightBooking?.at(0)?.status
    }
    
    return data;
}