import { profileSteps } from "../../components/ProfileSurvey/New/ProfileSurvey";

export default function checkProfileComplete(user) {
  let steps = (profileSteps.map(obj => ({label: obj.label,complete: false})));

  steps = steps.map(obj => {
    const temp = obj;
    const detail = user?.detail;
    const contact = user?.detail?.contact

    switch(temp.label) {
      case 'Business Detail':
        if(detail?.agencyType)
          temp.complete = true;
        break;
      
      case 'Legal Entity':
        if(detail?.registeredBusinessName && detail?.typeOfBusiness && detail?.legalInfo?.taxIdentification && detail?.legalInfo?.companyNumber)
          temp.complete = true;
        break;

      case 'Key Contact':
        if(contact?.firstName && contact?.lastName && contact?.email && contact?.phoneNumber && contact?.position)
          temp.complete = true;
        break;
      
      case 'Training':
        if(detail.haveScheduledTraining)
          temp.complete = true;
        break;

      default: break;
    }

    return temp;
  })

  return steps;
}