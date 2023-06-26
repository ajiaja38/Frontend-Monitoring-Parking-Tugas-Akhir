/* eslint-disable react/prop-types */
import React from 'react'

const InformationPanelAdmin = ({ countDevice, countUsers, currentUsername, isLoading }) => {
  return (
    <div className='w-full h-64 lg:h-[9rem] mt-5 rounded-3xl flex flex-col lg:flex-row gap-3 lg:gap-2 mb-14 lg:mb-0'>
      <div
        className='relative w-full h-full rounded-xl bg-white shadow-lg ring-1 ring-gray-200 flex flex-col justify-center items-center text-lg lg:text-2xl font-semibold hover:bg-slate-200 hover:text-slate-500 transition-all duration-150'
      >
      <div className='absolute inset-y-0 left-0 w-3 bg-red-500 rounded-tl-xl rounded-bl-xl'></div>
        {
          isLoading
            ? (
              <>
                <div className='h-3 bg-gray-200 rounded-full w-[70%] animate-pulse'></div>
                <div className='h-3 bg-gray-200 rounded-full w-[50%] animate-pulse mt-2'></div>
              </>
              )
            : (
              <>
                <h1>
                  Halo, selamat datang
                </h1>
                <p>
                  {currentUsername}
                </p>
              </>
              )
        }
      </div>

      <div
        className='w-full h-full rounded-xl bg-slate-900 text-white shadow-lg ring-1 ring-gray-200 flex flex-col justify-center items-center text-lg lg:text-2xl font-semibold relative hover:bg-slate-500 transition-all duration-150'
      >
      <div className='absolute inset-y-0 left-0 w-3 bg-gradient-to-t from-green-400 to-blue-600 rounded-tl-xl rounded-bl-xl'></div>
        {
          isLoading
            ? (
              <>
                <div className='h-3 bg-slate-600 rounded-full w-[70%] animate-pulse'></div>
                <div className='h-3 bg-slate-600 rounded-full w-[50%] animate-pulse mt-2'></div>
              </>
              )
            : (
              <>
                <h1>
                  Jumlah Pengguna:
                </h1>
                <p>
                  {countUsers.length || 0} Pengguna
                </p>
              </>
              )
        }
      </div>

      <div
        className='w-full h-full rounded-xl bg-slate-900 text-white shadow-lg ring-1 ring-gray-200 flex flex-col justify-center items-center text-lg lg:text-2xl font-semibold relative hover:bg-slate-500 transition-all duration-150'
      >
      <div className='absolute inset-y-0 left-0 w-3 bg-gradient-to-t from-green-400 to-blue-600 rounded-tl-xl rounded-bl-xl'></div>
        {
          isLoading
            ? (
              <>
                <div className='h-3 bg-slate-600 rounded-full w-[70%] animate-pulse'></div>
                <div className='h-3 bg-slate-600 rounded-full w-[50%] animate-pulse mt-2'></div>
              </>
              )
            : (
              <>
                <h1>
                  Jumlah Devices:
                </h1>
                <p>
                  {countDevice.length || 0} Devices
                </p>
              </>
              )
        }
      </div>
    </div>
  )
}

export default InformationPanelAdmin
