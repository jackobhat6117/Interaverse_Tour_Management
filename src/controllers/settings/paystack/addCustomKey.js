import fetchServer from "../../fetchServer"

export default async function addCustomKey(data) {
  let result = {return: 0,msg: 'Something went wrong adding payment gateway!'}

  await fetchServer({method: 'POST',url: '/payment/v1/paystack',data})
  .then((res) => {
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: 'Successfull',data: res?.data?.data}
    } else if(res?.data?.error) result['msg'] = res.data.error
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}