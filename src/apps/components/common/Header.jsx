import React from 'react'
import lskk from '../assets/images/LSKK.png'
import pptik from '../assets/images/pptik-itb.png'
import ubl from '../assets/images/UBL.png'
import itb from '../assets/images/itb.png'

const HeaderCommon = () => {
  return (
    <section
      id='home'
      className='h-screen w-full flex flex-col justify-center items-center relative overflow-hidden mt-7'
    >
      <svg
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        className='absolute bottom-28 -left-16 w-40 lg:w-72 -z-10 blur-3xl animate__animated animate__fadeInUp'
      >
        <defs>
          <linearGradient
            id="b"
            gradientTransform="rotate(-45 .5 .5)">
            <stop offset="0%" stopColor="#08AEEA"/>
            <stop offset="100%" stopColor="#2AF598"/>
          </linearGradient>
            <clipPath
              id="a"
            >
              <path
                fill="currentColor"
                d="M894 645.5q7 145.5-138 171T485 887q-126 45-255.5-25.5t-109-216Q141 500 130.5 362t124-171Q389 158 513 117.5t235.5 40Q860 238 873.5 369T894 645.5Z"
              />
            </clipPath>
        </defs>
        <g clipPath="url(#a)">
          <path
            fill="url(#b)"
            d="M894 645.5q7 145.5-138 171T485 887q-126 45-255.5-25.5t-109-216Q141 500 130.5 362t124-171Q389 158 513 117.5t235.5 40Q860 238 873.5 369T894 645.5Z"
          />
        </g>
      </svg>
      <svg
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        className='absolute top-10 -right-10 md:right-0 w-40 lg:w-64 -z-10 blur-3xl animate__animated animate__fadeInUp'
      >
        <defs>
          <linearGradient
            id="b"
            gradientTransform="rotate(-45 .5 .5)">
            <stop offset="0%" stopColor="#08AEEA"/>
            <stop offset="100%" stopColor="#2AF598"/>
          </linearGradient>
            <clipPath
              id="a"
            >
              <path
                fill="currentColor"
                d="M894 645.5q7 145.5-138 171T485 887q-126 45-255.5-25.5t-109-216Q141 500 130.5 362t124-171Q389 158 513 117.5t235.5 40Q860 238 873.5 369T894 645.5Z"
              />
            </clipPath>
        </defs>
        <g clipPath="url(#a)">
          <path
            fill="url(#b)"
            d="M894 645.5q7 145.5-138 171T485 887q-126 45-255.5-25.5t-109-216Q141 500 130.5 362t124-171Q389 158 513 117.5t235.5 40Q860 238 873.5 369T894 645.5Z"
          />
        </g>
      </svg>
      <div className='flex flex-col justify-center items-center gap-3 px-2 h-full animate__animated animate__fadeInDownBig'>
        <h1 className='text-5xl text-center lg:text-6xl font-bold'>Monitoring Parkir</h1>
        <h2 className='text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500'>PT.LSKK</h2>
        <p className='text-xl text-center'>PT. Langgeng Sejahtera Kreasi Komputasi</p>
        <a href='#about'>
          <button
            className='px-4 py-3 bg-gradient-to-r from-blue-600 to-teal-400 text-white rounded hover:px-6 hover:hue-rotate-90 transition-all ease-in-out duration-200 shadow-lg'
          >
            Tentang Kami
          </button>
        </a>
        <div className='flex justify-center items-center w-full gap-2 mt-8'>
          <img
            src={lskk}
            className='w-12 lg:w-20'
          />
          <img
            src={pptik}
            className='w-14 lg:w-20'
          />
          <img
            src={ubl}
            className='w-14 lg:w-28'
          />
          <img
            src={itb}
            className='w-10 lg:w-16'
          />
        </div>
      </div>
    </section>
  )
}

export default HeaderCommon
