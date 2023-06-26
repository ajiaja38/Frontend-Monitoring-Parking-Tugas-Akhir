import React from 'react'
import { useInView } from 'react-intersection-observer'
import ilustration from '../assets/images/ilustration2.png'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 1
  })

  return (
    <div className="pb-16 lg:py-16" id='about'>
      <div
        ref={ref}
        className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16"
      >
        <div className={`lg:p-16 rounded-[4rem] space-y-6 md:flex md:gap-6 justify-center md:space-y-0 lg:items-center ${inView ? 'lg:bg-slate-50 lg:shadow-lg animate__animated animate__fadeIn' : 'hidden'}`}>
          <div className={`md:5/12 lg:w-1/2 ${inView ? 'animate__animated animate__fadeInLeft' : 'hidden'}`}>
            <img
              src={ilustration}
              alt="image"
              loading="lazy"
            />
          </div>
          <div className={`md:7/12 lg:w-1/2 ${inView ? 'animate__animated animate__fadeInUp' : 'hidden'}`}>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Untuk apa sih adanya website Monitoring Parkir ini?
            </h2>
            <p className="my-8 text-gray-600">
              Melalui website ini, pengguna dapat memantau dan mengawasi aktivitas parkir dengan lebih efektif. Pengguna dapat melihat informasi terkini mengenai ketersediaan tempat parkir, status parkir (terisi atau kosong), dan lokasi parkir yang tersedia.
            </p>
            <Link to='/register'>
              <button
                className="relative text-base font-semibold text-white bg-teal-400 hover:bg-blue-600 p-3 px-4 rounded-md shadow-lg transition-all ease-in-out duration-200"
              >
                Daftar Sekarang
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
