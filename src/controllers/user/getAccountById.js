import fetchServer from "../fetchServer";

export default async function getAccountById(id) {
  let result = {return: 0,msg: 'Something went wrong getting account!'}

  // searchBy=email&keyword=natnael
  await fetchServer({method: 'GET',url: `/main/v1/account/${id}`})
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