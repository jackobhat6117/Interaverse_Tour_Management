import fetchServer from "../../fetchServer";

export default async function staffResendVerifyEmail(data) {
  let result = {return: 0,msg: 'Something went wrong!'}

  await fetchServer({method: 'POST',url: '/main/v1/staff/resendVerification',data})
  .then((res) => {
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: res.message || 'Successfull',data: res.data}
    } else result['msg'] = res?.data?.error || result['msg']
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}