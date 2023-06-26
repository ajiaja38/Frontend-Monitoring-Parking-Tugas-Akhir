/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import ModalMenuUser from '../assets/modal/ModalMenuUser'

const NavbarUser = ({ id, fullname, avatar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className='fixed h-14 top-2 right-2 left-2 rounded-xl flex justify-between items-center border backdrop-blur-sm bg-white/95 px-5 shadow-md z-[999]'>
      <h1 className='font-bold text-sm md:text-lg'>Monitoring Parkir Lskk</h1>
      <div className='flex justify-center items-center gap-2'>
        <h2 className='hidden lg:inline font-medium'>{ fullname } | </h2>
        <button
          onClick={handleMenu}
          className='flex justify-center'
        >
          <div className="relative w-10 h-10 overflow-hidden bg-gray-400 ring-2 ring-gray-300 rounded-full">
          {
            avatar
              ? (
                  <img
                    src={avatar}
                    alt='Avatar User'
                    className='object-cover w-full h-full'
                  />
                )
              : (
                  <svg
                    className="absolute w-12 h-12 animate-pulse text-gray-300 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd">
                    </path>
                  </svg>
                )
          }
          </div>
        </button>
        {
          isMenuOpen && <ModalMenuUser linkProfile = {`/user/profile/${id}`} />
        }
      </div>
    </div>
  )
}

export default NavbarUser
