import React, { useState } from 'react'
import logo from '../../components/assets/images/device-white.png'
import { NavLink } from 'react-router-dom'
import UsersSourceAPI from '../../api/resource/sourceUsers'
import ToastNotification from '../../components/assets/helpers/toast'
import ModalCOnfirmOtp from '../../components/assets/modal/ModalConfirmOTP'

const RegisterPage = () => {
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const onOpenModal = () => {
    setModalOpen(true)
  }
  const onCloseModal = () => setModalOpen(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const data = {
        fullname,
        username,
        password,
        confirmPassword,
        email,
        phoneNumber,
        address
      }
      const response = await UsersSourceAPI.register(data)
      ToastNotification.toastSuccess(response)
      onOpenModal()
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
  }

  return (
    <>
      <div className='w-full md:bg-gray-50 h-full md:h-screen flex justify-center items-center'>
        <div className='md:fixed md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 bg-white lg:border md:border-gray-100 md:shadow-xl rounded-xl p-8 md:px-12 flex flex-col w-96 md:w-[45rem] lg:w-[50rem]'>
          <div className="w-10 h-10 mb-2 md:mb-3 bg-gradient-to-r from-green-400 to-blue-600 flex justify-center items-center rounded-xl">
            <img
              src={logo}
              alt='Logo'
              className='w-8'
            />
          </div>
          <h1 className="mb-8 text-lg md:text-xl font-bold text-gray-800 dark:text-white">Register ke LSKK Parkir</h1>
          <form
            onSubmit={handleRegister}
            className="lg:space-y-0 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className='w-full'>
              <label className="text-gray-600">Nama Lengkap</label>
              <input
                type="text"
                name="fullname"
                onChange={(e) => setFullname(e.target.value)}
                placeholder='Masukkan nama lengkap anda'
                className="focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className='w-full'>
              <label className="text-gray-600">Username</label>
              <input
                type="text"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Masukkan username anda'
                className="focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className='w-full'>
              <label className="text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Masukkan password anda'
                className="focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className='w-full'>
              <label className="text-gray-600">Konfirmasi Password</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Masukkan ulang password anda anda'
                className="focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className='w-full'>
              <label className="text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Masukkan Email aktif anda'
                className="focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className='w-full'>
              <label className="text-gray-600">Nomor WhatsApp</label>
              <input
                type="text"
                name="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder='Masukkan nomor WhatsApp aktif anda'
                className="focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className='w-full'>
              <label className="text-gray-600">Alamat</label>
              <input
                type="text"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
                placeholder='Masukkan alamat anda'
                className="focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className='w-full'>
              <button
                type="submit"
                className="px-6 py-3 mt-2 md:mt-8 bg-gradient-to-r from-green-400 to-blue-600 rounded-md w-full hover:scale-105 active:scale-100 transition-all ease-in-out"
              >
                <span className="relative text-base font-semibold text-white dark:text-dark">Register</span>
              </button>
            </div>
            <div className='w-full col-start-1 md:col-end-3 text-center'>
              <p className="border-t border-gray-100 pt-6 text-sm text-gray-500 dark:text-gray-400">
                Sudah punya akun ?
                <NavLink to='/login' className="text-primary hover:text-blue-500"> Login</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ModalCOnfirmOtp open={modalOpen} onCloseModal={onCloseModal}/>
    </>
  )
}

export default RegisterPage
