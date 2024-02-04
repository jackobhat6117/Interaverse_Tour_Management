import { Breadcrumbs } from '@mui/material'
import React from 'react'
import Icon from '../../HOC/Icon'

export default function BreadCrumb(props) {
  const childrens = React.Children.toArray(props.children)
  return (
    <div>
      <Breadcrumbs separator={<Icon icon='ic:round-greater-than' className='p-1 -mx-2' />} className='flex'>
        {childrens.map((child,i) => {
          if(i <= childrens.length-1) {
            return <span className='cursor-default text-primary'>{child}</span>
           } else return (
            <span className='text-primary/50'>{child}</span>
          )
        })}
      </Breadcrumbs>
    </div>
  )
}
