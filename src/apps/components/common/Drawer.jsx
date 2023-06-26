/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'

const Drawer = ({ isActive, handleClose }) => {
  return (
    <div
      className={`md:hidden fixed inset-0 h-screen transition-all duration-200 ease-in-out bg-gray-900/95 shadow-sm flex justify-center items-center text-center rounded-tr-[9rem] ${isActive ? 'w-[21rem]' : 'w-0'}`}
    >
      <ul className={`text-gray-50 ${isActive ? 'relative' : 'hidden'}`}>
        <li
          onClick={handleClose}
          className='mb-9 cursor-pointer transition-all ease-in-out duration-200 hover:text-blue-600 active:text-blue-400'
        >
          <a href='#home'>Home</a>
        </li>
        <li
          onClick={handleClose}
          className='mb-9 cursor-pointer transition-all ease-in-out duration-200 hover:text-blue-600 active:text-blue-400'
        >
          <a href='#about'>About</a>
        </li>
        <li
          onClick={handleClose}
          className='mb-6 cursor-pointer transition-all ease-in-out duration-200 hover:text-blue-600 active:text-blue-400'
        >
          <a href="mailto:pt.lskk@gmail.com" target='_blank' rel="noopener noreferrer">Contact Us</a>
        </li>
        <li className='mb-6'>
          <Link to='/login'>
            <button
              className='px-3 py-2 rounded text-white transition-all ease-in-out duration-200 bg-blue-600 hover:bg-blue-400 active:bg-blue-200'
            >
              <i className="fa-solid fa-right-to-bracket mr-2"></i>
              Login
            </button>
          </Link>
        </li>
        <li>
         <Link to='/register'>
            <button
              className='px-3 py-2 rounded text-white transition-all ease-in-out duration-200 bg-gray-400 hover:bg-gray-300 active:bg-gray-400'
            >
              <i className="fa-solid fa-user-plus mr-2"></i>
              Register
            </button>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Drawer
