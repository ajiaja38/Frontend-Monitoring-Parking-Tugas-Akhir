/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import ModalMenuUser from '../assets/modal/ModalMenuUser'

const NavbarAdmin = ({ avatar, id }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className='sticky top-0 z-999 flex bg-white/75 backdrop-blur-sm shadow-md rounded-xl m-3 mt-0 lg:mr-0 z-[999]'>
      <div className='flex w-full items-center justify-between py-2 px-4 shadow-2 md:px-6 2xl:px-11'>
        <h1 className='font-semibold text-xs md:text-sm'>
          Monitoring Parkir LSKK
        </h1>
        <div>
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
            isMenuOpen && <ModalMenuUser linkProfile={`/admin/profile/${id}`}/>
          }
        </div>
      </div>
    </header>
  )
}

export default NavbarAdmin
