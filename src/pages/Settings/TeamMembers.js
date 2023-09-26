import { Button } from '@mui/material'
import React from 'react'
import Table from '../../components/Table/Table';


export default function TeamMembers() {
  let data = [
    {id: 1,name: 'John Doe',email: 'johndoe@gmail.com',role: 'Owner'}
  ]
  let columns = [
    {field: 'name',headerName: 'Member'},
    {field: 'email',headerName: 'Email'},
    {field: 'role',headerName: 'Role'},
  ]
  return (
    <div className='flex flex-col gap-4'>
      <div className='max-w-[500px] flex flex-col gap-4'>
        <div className='flex justify-between gap-4'>
          <h5 className='text-primary/50'>Active</h5>
          <Button variant='contained'>Invite</Button>
        </div>
        <Table rows={data} columns={columns} />
        {/* <table className='w-full my-2'>
          <thead className='!bg-theme1/20 p-2'>
            <TD>Member</TD>
            <TD>Email</TD>
            <TD>Role</TD>
          </thead>
          <tbody>
            <tr>
              <TD>John Doe</TD>
              <TD>johndoe@gmail.com</TD>
              <TD>Owner</TD>
            </tr>
            <tr>
              <TD>John Doe</TD>
              <TD>johndoe@gmail.com</TD>
              <TD>Owner</TD>
            </tr>
          </tbody>
        </table> */}
      </div>
    </div>
  )
}

function TD(props) {
  const {children,...restProps} = props;
  return (
    <td {...restProps} className='p-2' >{children}</td>
  )
}