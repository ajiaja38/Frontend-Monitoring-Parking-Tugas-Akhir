import React from 'react'
import ErrorLogo from '../../components/assets/images/403.png'

const UnauthorizedPage = () => {
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center flex flex-col justify-center items-center">
        <img
          src={ErrorLogo}
          alt='Error 401 Logo'
          className='w-40 md:w-64'
        />
        <h1
          className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Akses Terlarang!
        </h1>

        <p className="mt-4 text-gray-500">Anda Tidak Memiliki akses pada Url Ini!</p>
      </div>
    </div>
  )
}

export default UnauthorizedPage
