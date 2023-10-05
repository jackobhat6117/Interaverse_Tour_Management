import { MenuItem } from "@mui/material";
import Button1 from "../../../components/forms/Button1";
import TextInput from "../../../components/forms/TextInput";
import PhoneNumberInput from "../../../components/forms/PhoneNumberInput";
import EmailInput from "../../../components/forms/EmailInput";
import { useState } from "react";
import { profileSurveyData } from "../../../data/user/profileSurvey";
import updateProfile from "../../../controllers/user/updateProfile";
import { useSnackbar } from "notistack";

export default function AgencySetupSetting() {
  const [data,setData] = useState({
    detail: profileSurveyData,
    firstName: '',
    lastName: '',
  })
  const [address,setAddress] = useState(['','',''])
  const {enqueueSnackbar} = useSnackbar();

  async function handleSubmit(ev) {
    ev.preventDefault();

    const res = await updateProfile({data})
    if(res.return) {
      enqueueSnackbar('Profile Updated.',{variant: 'success'})
    } else enqueueSnackbar(res.msg,{variant: 'error'})
  }
  return (
    <form onSubmit={handleSubmit} className='content-max-w flex flex-col gap-4'>
      <p>We would be delighted to enable you to sell genuine flights. Before we proceed, we kindly request some information about your business. This data is necessary to meet the requirements set by regulatory bodies and financial partners, as well as the provisions outlined in our Service Agreement.</p>
      <div className="inline-block self-start">
        <Button1 className='btn-theme-light !font-extrabold'>Request to change data</Button1>
      </div>
      <div className='flex flex-col gap-3 py-3'>
        <h4>Business Details</h4>
        <TextInput select label='Type of registered business'
          value={data.detail.typeOfBusiness}
          onChange={(ev) => setData({...data,detail: {...data.detail,typeOfBusiness: ev.target.value}})}
        >
          <MenuItem>Corporation</MenuItem>
        </TextInput>
        <TextInput label='Registered business name' placeholder={'abcdefxyz@gmail.com'}
          tooltip='The name your provided must exactly match the name associated with your tax ID'
          value={data.detail.registeredBusinessName}
          onChange={(ev) => setData({...data,detail: {...data.detail,registeredBusinessName: ev.target.value}})}

        />
        <TextInput label='Trading name' placeholder={'abcdefxyz@gmail.com'}
          tooltip='If different from your registered name'
          value={data.detail.tradingName}
          onChange={(ev) => setData({...data,detail: {...data.detail,tradingName: ev.target.value}})}
        />
      </div>
      <div className='flex flex-col gap-3 py-3'>
        <h4>Address</h4>
        <div className="flex flex-wrap sm:flex-nowrap gap-4">
          <TextInput label={'Registered business address'} 
            value={address[0]}
          />
            {/* <MenuItem>Lagos</MenuItem>
          </TextInput> */}
          <TextInput label='LGA' placeholder={'Local Government Area'} />
        </div>
        <TextInput label={'Address one'} placeholder='Bus-stop/Street/Estate name' />
        <TextInput label={'Address two'} placeholder='Building/Block number/Office floor' />
        <TextInput label='Additional Info' placeholder={'Anything to best describe your address'}
          tooltip='This address will be saved as your billing address. If you need to change this later, please contact our support team.'
        />
      </div>
      <div className='flex flex-col gap-3 py-3'>
        <h4>Legal Entity</h4>
        <TextInput select label='country'>
          <MenuItem>Nigeria</MenuItem>
        </TextInput>
        <PhoneNumberInput label={'Company number'} />
        <TextInput label='Tax identification number' tooltip='It can be called different names: VAT number or TVA number ' />
      </div>
      <div className="flex flex-col gap-3 py-3">
        <h4>Key contact</h4>
        <TextInput label={'First name'} placeholder={'e.g Chiemena'} />
        <TextInput label={'Last name'} placeholder={'e.g Okafor'} />
        <TextInput label={'Job title'} placeholder={'position at company'} />
        <EmailInput />
      </div>
      <div className="flex justify-end py-5">
        <Button1 type='submit' className='!w-auto'>Save Data</Button1>
      </div>
    </form>
  )
}
