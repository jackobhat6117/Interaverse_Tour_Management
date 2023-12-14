import React from 'react'
import FlightSupplier from './FlightSupplier'
import StaysSupplier from './StaysSupplier'
import ToursSupplier from './ToursSupplier'

export default function SupplierSettings() {
  return (
    <div className='content-max-w flex gap-6 flex-col self-start'>
        <p>Lorem ipsum dolor sit amet consectetur. Hendrerit enim tellus donec ac est sed sed habitant mauris. Id placerat sed mattis magna penatibus in lobortis. Bibendum nulla euismod velit sagittis id id porttitor vivamus. Consequat magnis pellentesque condimentum pellentesque non tellus semper consequat. Faucibus dolor at porttitor nibh nulla. Tempus lobortis vulputate eu elementum non at lorem.</p>
        <FlightSupplier />
        <StaysSupplier />
        <ToursSupplier />
    </div>
  )
}

