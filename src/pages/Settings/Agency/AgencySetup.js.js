import { MenuItem } from "@mui/material";
import Button1 from "../../../components/forms/Button1";
import TextInput from "../../../components/forms/TextInput";
import PhoneNumberInput from "../../../components/forms/PhoneNumberInput";
import EmailInput from "../../../components/forms/EmailInput";

export default function AgencySetupSetting() {
  return (
    <div className='content-max-w flex flex-col gap-4'>
      <p>We would be delighted to enable you to sell genuine flights. Before we proceed, we kindly request some information about your business. This data is necessary to meet the requirements set by regulatory bodies and financial partners, as well as the provisions outlined in our Service Agreement.</p>
      <div className="inline-block self-start">
        <Button1 className='btn-theme-light !font-extrabold'>Request to change data</Button1>
      </div>
      <div className='flex flex-col gap-3 py-3'>
        <h4>Business Details</h4>
        <TextInput select label='Type of registered business'>
          <MenuItem>Corporation</MenuItem>
        </TextInput>
        <TextInput label='Registered business name' placeholder={'abcdefxyz@gmail.com'}
          tooltip='The name your provided must exactly match the name associated with your tax ID'
        />
        <TextInput label='Trading name' placeholder={'abcdefxyz@gmail.com'}
          tooltip='If different from your registered name'
        />
      </div>
      <div className='flex flex-col gap-3 py-3'>
        <h4>Address</h4>
        <div className="flex flex-wrap sm:flex-nowrap gap-4">
          <TextInput select label={'Registered business address'}>
            <MenuItem>Lagos</MenuItem>
          </TextInput>
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
        <Button1 className='!w-auto'>Save Data</Button1>
      </div>
    </div>
  )
}
