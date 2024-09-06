import React from 'react'
import spinLoader from '../../../src/assets/spinner.gif'
export default function Spinner() {
    console.log('spinner');
    
  return (
    <div>

      <img src={spinLoader} alt="loading..." />
    </div>
  )
}
