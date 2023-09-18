import fetchServer from "../fetchServer";

export default async function resetPassword(data) {
  let result = {return: 0,msg: 'Something went wrong logging user!'}

  await fetchServer({method: 'POST',url: '/main/v1/account/resendVerification',data})
  .then((res) => {
    if(res?.data) {
      result = {return: 1,msg: 'Successfull',data: res.data}
    } else result['msg'] = res.error.message
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}