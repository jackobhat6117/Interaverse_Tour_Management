import fetchServer from "../../fetchServer"

export default async function createFlightCommission(data) {
  let result = {return: 0,msg: 'Something went wrong fetching flight commissions!'}

  await fetchServer({method: 'POST',url: '/payment/v1/flightCommission',data})
  .then((res) => {
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: 'Successfull',data: res.data}
    } else result['msg'] = res?.data?.error || result['msg']
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}