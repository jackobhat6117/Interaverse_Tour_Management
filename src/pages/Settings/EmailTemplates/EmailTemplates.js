import React from 'react'
import TextInput from '../../../components/form/TextInput'
import { MenuItem } from '@mui/material'
import Icon from '../../../components/HOC/Icon'
import Button1 from '../../../components/form/Button1'
import SuccessStandard from '../../../components/DIsplay/SuccessStandard'
import ErrorStandard from '../../../components/DIsplay/ErrorStandard'


export default function EmailTemplateSettings() {
  return (
    <div className='content-max-w flex flex-col gap-4'>
        <div className='flex gap-2 flex-col'>
            <h5>Email Templates</h5>
            <p>Update the content of all email notification sent to your customers here or leave as it is and we will use the default notifications.</p>
        </div>
        <TextInput select label='Email Category' placeholder={'select'}>
            <MenuItem></MenuItem>
        </TextInput>
        <TextInput select label='Select Email' placeholder={'select'}>
            <MenuItem></MenuItem>
        </TextInput>
        <TextInput label='Email Title' placeholder={'Enter email title here'} />
        <div className='flex justify-between gap-4 flex-wrap py-4'>
            <SomeComp className={'w-full sm:w-[40%]'} />
            <SomeComp className={'w-full sm:w-[40%]'} />
            <SomeComp className={'w-full sm:w-[40%]'} />
            <SomeComp className={'w-full sm:w-[40%]'} />
        </div>
        <div className='flex flex-col gap-2'>
            <div className='flex justify-between items-center gap-4'>
                <b>Body</b>
                <button className='btn-theme !py-1 rounded-md'>Edit</button>
            </div>
            <TextInput multiline rows={6} label='' placeholder='Email body goes here' />
        </div>
        <div className='flex justify-between gap-4 py-4'>
            <button className='btn-theme-light'>Cancel</button>
            <Button1>Confirm</Button1>
        </div>
        <div className='py-4'>
            <SuccessStandard title={'Well done!'} message={'You have successfully updated the content of your email.'} allowClose />
            <ErrorStandard title={'Warning!'} message={'An error occured while trying to update the content of your email.'} allowClose />
        </div>
    </div>
  )
}


function SomeComp({className}) {
    return (
        <div className={className+' flex gap-4'}>
            <p className='flex-1'>Daniel</p>
            <p className=''>{'{first_name}'}</p>
            <p className=''><Icon icon='ci:copy' /></p>
        </div>
    )
}