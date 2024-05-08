import { Breadcrumbs } from '@mui/material'
import React from 'react'
import Icon from '../../HOC/Icon'

export default function BreadCrumb({children,className,...props}) {
  const childrens = React.Children.toArray(children)
  return (
    <Breadcrumbs {...props} separator={<Icon icon='ic:round-greater-than' className='p-1 -mx-2' />} className={`flex ${props.className}`}>
      {childrens.map((child,i) => {
        if(i <= childrens.length-1) {
          return <span className='cursor-default text-primary'>{child}</span>
          } else return (
          <span className='text-primary/50'>{child}</span>
        )
      })}
    </Breadcrumbs>
  )
}
