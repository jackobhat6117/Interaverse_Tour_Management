import fetchServer from "../fetchServer";

export default async function getContactMails(query) {
  let result = {return: 0,msg: 'Something went wrong fetching Emails!'}

  console.log(query)
  await fetchServer({method: 'GET',url: `/main/v1/contact${query?'?'+query:''}`})
  .then((res) => {
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: 'Successfull',data: res?.data?.data}
    } else result['msg'] = res?.data?.error || result['msg']
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}