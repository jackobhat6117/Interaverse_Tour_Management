import { Breadcrumbs } from '@mui/material'
import React from 'react'

export default function BreadCrumb(props) {
  const childrens = React.Children.toArray(props.children)
  return (
    <div>
      <Breadcrumbs separator='>'>
        {childrens.map((child,i) => {
          if(i === childrens.length-1) {
            return <span className='cursor-default'>{child}</span>
           } else return (
            <span className='text-primary/50'>{child}</span>
          )
        })}
      </Breadcrumbs>
    </div>
  )
}
