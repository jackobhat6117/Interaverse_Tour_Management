import fetchServer from "../fetchServer";

export default async function signup(data) {
  let result = {return: 0,msg: 'Something went wrong creating user!'}

  await fetchServer({method: 'POST',url: '/main/v1/account',data})
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