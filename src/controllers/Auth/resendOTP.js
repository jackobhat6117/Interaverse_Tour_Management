import fetchServer from "../fetchServer";

export default async function resendOTP(data) {
  let result = {return: 0,msg: 'Something went wrong reseting password!'}

  await fetchServer({method: 'POST',url: '/main/v1/account/resendRecover',data})
  .then((res) => {
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: 'Successfull',data: res?.data?.data}
    } else result['msg'] = res?.data?.error
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}