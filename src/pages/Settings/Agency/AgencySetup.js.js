import { MenuItem } from "@mui/material";
import Button1 from "../../../components/form/Button1";
import TextInput from "../../../components/form/TextInput";
import PhoneNumberInput from "../../../components/form/PhoneNumberInput";
import EmailInput from "../../../components/form/EmailInput";
import { useState } from "react";
import { profileSurveyData } from "../../../data/user/profileSurvey";
import updateProfile from "../../../controllers/user/updateProfile";
import { useSnackbar } from "notistack";
import CountriesInput from "../../../components/form/CountriesInput";
import { useSelector } from "react-redux";
import Map from "../../../components/form/Map";
import mergeRecursive from "../../../features/utils/mergeRecursive";

export default function AgencySetupSetting() {
  const {user} = useSelector(state => state.user.userData);
  const [data,setData] = useState({
    detail: mergeRecursive(profileSurveyData,user.detail,{createNew: false}),
  })
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  async function handleSubmit(ev) {
    ev.preventDefault();
    const {interestedIn,goalsWithMiles,agencyLogo,agencyURL,phone,...restData} = data.detail;    
    // const {interestedIn,goalsWithMiles,agencyLogo,agencyURL,phone,...restData} = data.detail;    
    // try {
    //   let phone = restData.legalInfo.phone;
    //   if(phone.length < 6)
    //     restData.legalInfo.phone = (phone+'00000000000')?.substring(0,14)
    // } catch(ex) {console.log(ex)}    
    setLoading(true);
    const res = await updateProfile(restData)
    setLoading(false);
    if(res.return) {
      enqueueSnackbar('Profile Updated.',{variant: 'success'})
    } else enqueueSnackbar(res.msg,{variant: 'error'})
  }

  function handleLocation(place) {
    setData({
      ...data,
      detail: {
        ...data.detail,
        address: {
          ...data.detail.address,
          location: [place.lat,place.lng],
          businessLocation: place.formattedAddress,
          lga: place.city,
          addressOne: place.subcity,
          addressTwo: place.route,
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className='content-max-w flex flex-col gap-4'>
      {/* <div className="inline-block self-start">
        <Button1 className='btn-theme-light !font-extrabold'>Request to change data</Button1>
      </div> */}
      <div className='flex flex-col gap-3 py-3'>
        <h5>Business Details</h5>
        <p className="pb-3">We would be delighted to enable you to sell genuine flights. Before we proceed, we kindly request some information about your business. This data is necessary to meet the requirements set by regulatory bodies and financial partners, as well as the provisions outlined in our Service Agreement.</p>
        <TextInput select label='Business Type'
          value={data.detail.agencyType}
          onChange={(ev) => setData({...data,detail: {...data.detail,agencyType: ev.target.value}})}
        >
          <MenuItem value='starterBusiness'>Starter Business</MenuItem>
          <MenuItem value='registeredBusinessWithIATALicense'>Registered business with IATA license</MenuItem>
          <MenuItem value='registeredBusinessWithOutIATALicense'>Registered business without IATA license</MenuItem>
        </TextInput>
        <TextInput label='Trading name' placeholder={'abcdefxyz@gmail.com'}
          tooltip='If different from your registered name'
          value={data.detail.tradingName}
          onChange={(ev) => setData({...data,detail: {...data.detail,tradingName: ev.target.value}})}
        />
        <PhoneNumberInput label={'Business Phone'} 
          value={data?.detail?.businessPhone}
          onChange={(val) => setData({...data,detail: {...data.detail,businessPhone: val}})}
        />
        <EmailInput 
            value={data?.detail?.businessEmail}
            onChange={(ev) => setData({...data,detail: {...data.detail,businessEmail: ev.target.value}})}
        />

      </div>
      <div className='flex flex-col gap-3 py-3'>
        <h5>Address</h5>
        <div className="flex flex-wrap sm:flex-nowrap gap-4">
          <Map label='Registered business address' className={'w-full'} handleReturn={(obj) => handleLocation(obj)} />
          {/* <TextInput label={'Registered business address'} 
            value={data?.detail?.address?.businessLocation}
            onChange={(ev) => setData({...data,detail: {...data.detail,address: {...data?.detail?.address,businessLocation: ev.target.value}}})}
          />
          <TextInput label='LGA' placeholder={'Local Government Area'} 
            value={data?.detail?.address.lga}
            onChange={(ev) => setData({...data,detail: {...data.detail,address: {...data?.detail?.address,lga: ev.target.value}}})}
          /> */}
        </div>
        {/* <TextInput label={'Address one'} placeholder='Bus-stop/Street/Estate name' 
          value={data?.detail?.address.addressOne}
          onChange={(ev) => setData({...data,detail: {...data.detail,address: {...data?.detail?.address,addressOne: ev.target.value}}})}
        />
        <TextInput label={'Address two'} placeholder='Building/Block number/Office floor' 
          value={data?.detail?.address.addressTwo}
          onChange={(ev) => setData({...data,detail: {...data.detail,address: {...data?.detail?.address,addressTwo: ev.target.value}}})}
        /> */}
        <TextInput label='Additional Info' placeholder={'Anything to best describe your address'}
          tooltip='This address will be saved as your billing address. If you need to change this later, please contact our support team.'
          value={data?.detail?.address.additionalInfo}
          onChange={(ev) => setData({...data,detail: {...data.detail,address: {...data?.detail?.address,additionalInfo: ev.target.value}}})}
        />
      </div>
      <div className='flex flex-col gap-3 py-3'>
        <h5>Legal Entity</h5>
        <TextInput label='Registered business name' placeholder={'abcdefxyz@gmail.com'}
          tooltip='The name your provided must exactly match the name associated with your tax ID'
          value={data.detail.registeredBusinessName}
          onChange={(ev) => setData({...data,detail: {...data.detail,registeredBusinessName: ev.target.value}})}

        />
        <TextInput select label='Type of registered business'
          value={data.detail.typeOfBusiness}
          onChange={(ev) => setData({...data,detail: {...data.detail,typeOfBusiness: ev.target.value}})}
        >
          <MenuItem value='Private Limited'>Private limited</MenuItem>
          <MenuItem value='Sole proprietor'>Sole proprietor</MenuItem>
          <MenuItem value='Non-registered'>Non-registered</MenuItem>
        </TextInput>
        <CountriesInput select label='country'
          value={data?.detail?.legalInfo?.country}
          onChange={(val) => setData({...data,detail: {...data.detail,legalInfo: {...data?.detail?.legalInfo,country: val?.name || val}}})}
        />
          {/* <MenuItem>Nigeria</MenuItem>
        </TextInput> */}
        <TextInput label={'Company number'} 
          value={data?.detail?.legalInfo?.companyNumber}
          onChange={(val) => setData({...data,detail: {...data.detail,legalInfo: {...data?.detail?.legalInfo,companyNumber: val}}})}
        />
        <TextInput label='Tax identification number' tooltip='It can be called different names: VAT number or TVA number '
          value={data?.detail?.legalInfo?.taxIdentification}
          onChange={(ev) => setData({...data,detail: {...data.detail,legalInfo: {...data?.detail?.legalInfo,taxIdentification: ev.target.value}}})}
        />
      </div>
      <div className="flex flex-col gap-3 py-3">
        <h5>Key contact</h5>
        <TextInput label={'First name'} placeholder={'e.g Chiemena'} 
            value={data?.detail?.contact.firstName}
            onChange={(ev) => setData({...data,detail: {...data.detail,contact: {...data?.detail?.contact,firstName: ev.target.value}}})}
          />
        <TextInput label={'Last name'} placeholder={'e.g Okafor'} 
            value={data?.detail?.contact.lastName}
            onChange={(ev) => setData({...data,detail: {...data.detail,contact: {...data?.detail?.contact,lastName: ev.target.value}}})}
        />
        <TextInput label={'Job title'} placeholder={'position at company'} 
            value={data?.detail?.contact.position}
            onChange={(ev) => setData({...data,detail: {...data.detail,contact: {...data?.detail?.contact,position: ev.target.value}}})}
        />
        <EmailInput 
            value={data?.detail?.contact.email}
            onChange={(ev) => setData({...data,detail: {...data.detail,contact: {...data?.detail?.contact,email: ev.target.value}}})}
        />
      </div>
      <div className="flex justify-end py-5">
        <Button1 type='submit' loading={loading} className='md:!w-auto'>Save Data</Button1>
      </div>
    </form>
  )
}
