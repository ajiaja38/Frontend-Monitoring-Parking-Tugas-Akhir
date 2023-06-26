import React from 'react'
import lskk from '../assets/images/LSKK.png'
import { Link } from 'react-router-dom'

const FooterCommon = () => {
  return (
    <footer className="w-full bg-gray-900 py-16">
      <div className="md:px-12 lg:px-28">
        <div className="container m-auto space-y-6 text-gray-300">
          <div className='flex justify-center items-center gap-2'>
            <img
              src={lskk}
              alt="logo tailus"
              className="w-14"
            />
            <h1 className='text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-blue-600'>
              PT.LSKK
            </h1>
          </div>
          <ul
            role="list"
            className="flex flex-col items-center justify-center gap-4 py-4 sm:flex-row sm:gap-8"
          >
            <li>
              <a
                href="#home"
                className="hover:text-lime-400 transition-all duration-200 ease-in-out"
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="#about"
                className="hover:text-lime-400 transition-all duration-200 ease-in-out"
              >
                About
              </a>
            </li>

            <li>
              <Link
                to={'/register'}
                className="hover:text-lime-400 transition-all duration-200 ease-in-out"
              >
                Get started
              </Link>
            </li>

            <li>
              <a
                href="http://lskk.co.id/"
                target='_blank'
                rel="noopener noreferrer"
                className="hover:text-lime-400 transition-all duration-200 ease-in-out"
              >
                About us
              </a>
            </li>
          </ul>

          <div className="m-auto flex w-max items-center justify-between space-x-4 text-2xl">
            <a href="tel:02273516650" aria-label="call">
              <i className="fa-solid fa-square-phone hover:text-lime-400 transition-all duration-200 ease-linear"></i>
            </a>
            <a href="mailto:pt.lskk@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="send mail">
              <i className="fa-solid fa-square-envelope hover:text-lime-400 transition-all duration-200 ease-linear"></i>
            </a>
            <a href="https://github.com/PTLSKK" title="facebook" target="_blank" rel="noopener noreferrer" aria-label="Github">
              <i className="fa-brands fa-square-github hover:text-lime-400 transition-all duration-200 ease-linear"></i>
            </a>
            <a href="https://www.linkedin.com/company/ptlskk/mycompany/" title="linkedin" target="_blank" rel="noopener noreferrer" aria-label="linkedin">
              <i className="fa-brands fa-linkedin hover:text-lime-400 transition-all duration-200 ease-linear"></i>
            </a>
          </div>

          <div className="text-center">
            <span
              className="text-sm tracking-wide">Copyright © PT.LSKK <span id="year"></span> | All right reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterCommon
