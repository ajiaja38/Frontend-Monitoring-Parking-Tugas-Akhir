import React from 'react'
import { NavLink } from 'react-router-dom'

const BottomNavigationAdmin = () => {
  return (
    <div className='md:hidden w-full bg-white ring-1 text-slate-900 ring-gray-300 fixed inset-x-0 bottom-0 h-16 flex items-center justify-around px-4 rounded-t-[2.5rem] text-2xl z-[999]'>
      <NavLink to='/users' className='BottomNavActive w-12 h-12 flex justify-center items-center'>
        <i className="fa-solid fa-user"></i>
      </NavLink>
      <NavLink to='/admin' className='BottomNavActive w-12 h-12 flex justify-center items-center'>
        <i className="fa-solid fa-house"></i>
      </NavLink>
      <NavLink to='/devices' className='BottomNavActive w-12 h-12 flex justify-center items-center'>
        <i className="fa-solid fa-screwdriver-wrench"></i>
      </NavLink>
    </div>
  )
}
export default BottomNavigationAdmin
