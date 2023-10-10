import fetchServer from "../../fetchServer"

export default async function getWallet() {
  let result = {return: 0,msg: 'Something went wrong removing member!'}

  await fetchServer({method: 'GET',url: '/payment/v1/wallet'})
  .then((res) => {
    // console.log(" => ",res)
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: 'Successfull',data: res?.data?.data}
    } else if(res?.data?.error) result['msg'] = res.data.error
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}