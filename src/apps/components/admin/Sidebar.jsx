/* eslint-disable react/prop-types */
import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/images/device-white.png'

const SidebarAdmin = ({ username }) => {
  return (
    <div className='absolute rounded-xl left-0 top-0 z-9999 hidden lg:flex w-[17rem] flex-col overflow-y-hidden bg-slate-900 ring-1 ring-gray-300 shadow-lg duration-300 ease-linear lg:static translate-x-0 lg:translate-x-0 text-white text-center'>
      <div className='flex flex-col items-center p-4'>
        <div className="relative w-24 h-24 overflow-hidden bg-gradient-to-r from-green-400 to-blue-600 ring-slate-100 rounded-full my-4 flex justify-center items-center">
          <img
            src={logo}
            alt='Logo Website'
            className='w-16'
          />
        </div>
        <h1 className='font-semibold text-sm'>Monitoring Parkir LSKK</h1>
        {username
          ? (
              <div className='bg-gray-50 rounded-xl w-[90%] py-2 text-slate-900 mt-2 mb-12'>
                <h2 className='font-semibold text-sm'>{username}</h2>
              </div>
            )
          : (
              <div className='bg-gray-50 rounded-xl w-[90%] py-2 text-slate-900 mt-2 mb-12 flex justify-center items-center'>
                <div className="animate-pulse h-3 bg-gray-300 rounded w-[80%] my-1"></div>
              </div>
            )
        }
        <NavLink to='/admin' className='sidebar bg-slate-700 hover:bg-slate-500 duration-300 active:bg-gray-50 active:text-black text-white rounded-xl w-full py-2 my-2 flex items-center pl-7 gap-2'>
          <div className='bg-gradient-to-r from-green-400 to-blue-600 w-8 h-8 flex justify-center items-center rounded-full'>
            <i className="fa-solid fa-house text-[14px] text-white"></i>
          </div>
          <h3 className='font-semibold text-xl'>
            Dashboard
          </h3>
        </NavLink>

        <NavLink to='/users' className='sidebar bg-slate-700 hover:bg-slate-500 duration-300 active:bg-gray-50 active:text-black text-white rounded-xl w-full py-2 my-2 flex items-center pl-7 gap-2'>
          <div className='bg-gradient-to-r from-green-400 to-blue-600 w-8 h-8 flex justify-center items-center rounded-full'>
            <i className="fa-solid fa-users text-[14px] text-white"></i>
          </div>
          <h3 className='font-semibold text-xl'>
            Pengguna
          </h3>
        </NavLink>

        <NavLink to='/devices' className='sidebar bg-slate-700 hover:bg-slate-500 duration-300 active:bg-gray-50 active:text-black text-white rounded-xl w-full py-2 my-2 flex items-center pl-7 gap-2'>
          <div className='bg-gradient-to-r from-green-400 to-blue-600 w-8 h-8 flex justify-center items-center rounded-full'>
            <i className="fa-solid fa-gear text-[14px] text-white"></i>
          </div>
          <h3 className='font-semibold text-xl'>
            Device
          </h3>
        </NavLink>
      </div>
    </div>
  )
}

export default SidebarAdmin
