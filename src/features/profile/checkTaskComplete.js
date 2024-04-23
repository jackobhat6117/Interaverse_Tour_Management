import { def } from "../../config";
import getFlightPriceAdjustments from "../../controllers/flightPriceAdjustment/getFlightPriceAdjustments";
import getBankAccounts from "../../controllers/settings/finance/getBankAccounts";
import getCustomKeys from "../../controllers/settings/paystack/getCustomKey";
import getSentInvitations from "../../controllers/settings/team/getSentInvitations";
import getTeamMembers from "../../controllers/settings/team/getTeamMembers";
import { profileTasks } from "../../pages/Dashboard/PendingTasks";
import { getTestLevel } from "../../utils/testLevel";

export default async function checkTaskComplete(user) {
  let blocked = [];
  const stage = getTestLevel(def.devStatus);
  if(stage > getTestLevel('dev')) {
    blocked.push(...['Invite team members','Setup your payment gateway'])
  }
  let steps = (profileTasks?.filter(obj => !blocked?.includes(obj.title)).map(obj => ({...obj,complete: false})));

  let banks = [];
  let paymentGateways = [];
  let markups = [];
  let teamsInvited = [];
    try {
      let res = await getBankAccounts();
      if(res.return) {
        // banks = [2,3];
        // console.log(res?.data,'---------')
        banks = res?.data?.data;
      }
      res = await getCustomKeys();
      if(res?.return) {
        // paymentGateways = [1,2];
        paymentGateways = res?.data?.data;
      }
      res = await getTeamMembers();
      if(res.return) {
        let data = res?.data?.data || [];
  
        const res2 = await getSentInvitations();
        if(res2.return) {
          data = [...data,...(res2?.data?.data?.map((obj,i) => ({...obj,id: i+"Inv",status: 'Invited'})) || [])];
        }
        // teamsInvited = [1,2,3]
        teamsInvited = data;
      }
      res = await getFlightPriceAdjustments();
      if(res?.return) {
        // markups = [1,2,3]
        markups = res?.data?.data?.data;
      }
    } catch(error) {
      console.log(error)
    }
  
  steps = steps.map(obj => {
    const temp = obj;
    const detail = user?.detail;

    switch(temp.title) {
      case 'Add Company Logo':
        if(detail?.agencyLogo)
          temp.complete = true;
        break;
      
      case 'Add your bank account':
        if(banks?.length)
          temp.complete = true;
        break;

      case 'Setup your payment gateway':
        // if(contact?.firstName && contact?.lastName && contact?.email && contact?.phoneNumber && contact?.position)
        if(paymentGateways?.length)
          temp.complete = true;
        break;
      
      case 'Setup markups':
        if(markups?.length)
          temp.complete = true;
        break;

      case 'Invite team members':
        if(teamsInvited?.length)
          temp.complete = true;
        break;
  
      default: break;
    }

    return temp;
  })

  return steps;
}