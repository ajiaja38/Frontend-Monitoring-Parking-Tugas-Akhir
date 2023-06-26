import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../components/assets/images/device-white.png'
import Drawer from './Drawer'

const NavbarGuest = () => {
  const [isActive, setIsActive] = useState(false)

  const hamburgerClick = () => {
    setIsActive(!isActive)
  }

  const handleCloseHamburger = () => {
    setIsActive(false)
  }

  return (
    <header className='fixed top-0 z-[9999] bg-white/95 backdrop-blur border-b px-3 md:px-6 lg:px-9 py-4 w-full flex justify-between items-center'>
      <div className='flex items-center gap-2'>
        <div className="w-9 h-9 bg-gradient-to-r from-green-400 to-blue-600 flex justify-center items-center rounded-xl">
          <img
            src={logo}
            alt='Logo'
            className='w-7'
          />
        </div>
        <h1 className='text-xl md:text-2xl font-bold'>Monitoring Parkir</h1>
      </div>
      <nav className='hidden md:flex gap-7 items-center text-sm'>
        <a href='#home' className='cursor-pointer transition-all ease-in-out duration-200 text-gray-500 hover:text-blue-600 active:text-blue-400'>Home</a>
        <a href='#about' className='cursor-aointer transition-all ease-in-out duration-200 text-gray-500 hover:text-blue-600 active:text-blue-400'>About</a>
        <a href="mailto:pt.lskk@gmail.com" target='_blank' rel="noopener noreferrer" className='cursor-pointer transition-all ease-in-out duration-200 text-gray-500 hover:text-blue-600 active:text-blue-400'>Contact Us</a>
        <div className='flex gap-1.5 ml-4'>
          <Link to='/login'>
            <button
              className='px-3 py-2 rounded text-white transition-all ease-in-out duration-200 bg-blue-600 hover:bg-blue-400 active:bg-blue-200'
            >
              Login
            </button>
          </Link>
          <Link to='/register'>
            <button
              className='px-3 py-2 rounded text-white transition-all ease-in-out duration-200 bg-teal-400 hover:bg-teal-200 active:bg-teal-100'
            >
              Register
            </button>
          </Link>
        </div>
      </nav>

      <div className='md:hidden flex items-center'>
        <button
          type='button'
          className={`block absolute right-4 pt-3 z-50 ${isActive ? 'hamburger-active' : ''}`}
          onClick={hamburgerClick}
        >
          <span className = "hamburger-lines duration-200 ease-in-out origin-top-left"></span>
          <span className = "hamburger-lines duration-200 ease-in-out"></span>
          <span className = "hamburger-lines duration-200 ease-in-out origin-bottom-left"></span>
        </button>
      </div>

      <Drawer isActive={isActive} handleClose={handleCloseHamburger} />
    </header>
  )
}

export default NavbarGuest
