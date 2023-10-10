import fetchServer from "../fetchServer";

export default async function createContactMail(data) {
  let result = {return: 0,msg: 'Something went wrong removing Mail!'}

  await fetchServer({method: 'POST',url: '/main/v1/contact/',data})
  .then((res) => {
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: 'Successfull',data: res?.data}
    } else result['msg'] = res?.data?.error || result['msg']
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}