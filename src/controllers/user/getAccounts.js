import fetchServer from "../fetchServer";

export default async function getAccounts(param) {
  let result = {return: 0,msg: 'Something went wrong updating profile!'}

  // searchBy=email&keyword=natnael
  await fetchServer({method: 'GET',url: `/main/v1/account/getAll${param?'?'+param:''}`})
  .then((res) => {
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: 'Successfull',data: res.data?.data}
    } else result['msg'] = res?.data?.error || result['msg']
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}