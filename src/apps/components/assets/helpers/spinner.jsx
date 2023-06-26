import React from 'react'
import { HashLoader } from 'react-spinners'

const override = {
  width: '5rem',
  height: '5rem'
}

const SpinnerElement = () => {
  return (
    <div className='inset-0 bg-slate-900/[0.6] flex justify-center items-center fixed z-[99999]'>
      <HashLoader
        color="#36d7b7"
        cssOverride={override}
      />
    </div>
  )
}

export default SpinnerElement
