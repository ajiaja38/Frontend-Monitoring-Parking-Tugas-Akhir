import React, { useEffect, useState } from 'react'
import LayoutAdmin from './Layout'
import { useParams } from 'react-router-dom'
import ToastNotification from '../../components/assets/helpers/toast'
import UsersSourceAPI from '../../api/resource/sourceUsers'
import SpinnerElement from '../../components/assets/helpers/spinner'

const ProfilAdmin = () => {
  const { id } = useParams()

  const [avatar, setAvatar] = useState('')
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showUpload, setShowUpload] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getUserById = async () => {
    try {
      const response = await UsersSourceAPI.getUserById(id)
      setAvatar(response.avatarUrl)
      setFullname(response.fullname)
      setUsername(response.username)
      setAddress(response.address)
      setEmail(response.email)
      setPhoneNumber(response.phoneNumber)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
  }

  useEffect(() => {
    getUserById()
  }, [id])

  const handleHover = () => {
    setShowUpload(true)
  }

  const handleLeave = () => {
    setShowUpload(false)
  }

  const editavatar = async (e) => {
    setIsLoading(true)
    const image = e.target.files[0]

    const formData = new FormData()
    formData.append('avatar', image)

    try {
      const response = await UsersSourceAPI.uploadAvatar(id, formData)
      const newAvatar = await UsersSourceAPI.getUserById(id)
      setAvatar(newAvatar.avatarUrl)
      ToastNotification.toastSuccess(response)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
    setIsLoading(false)
  }

  return (
    <LayoutAdmin>
      { isLoading && <SpinnerElement/> }
      <div
        className='bg-white shadow-lg rounded-xl w-full px-6 py-4 relative z-50 flex flex-col mb-14 md:mb-0 pb-8 text-gray-900'
      >
        <div className='flex w-full justify-start items-center mb-3'>
          <h1 className='font-semibold text-lg'>Profil Admin</h1>
        </div>
        <div>
          <div
            className='rounded h-32 bg-gradient-to-r from-blue-600 to-green-400 flex flex-col gap-2 justify-center items-center relative'
          >
            <div
              className='rounded-full w-32 h-32 overflow-hidden ring-2 ring-gray-200 bg-gray-400 absolute top-12 shadow-lg transition duration-300 ease-in-out transform hover:scale-110'
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
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
                  className="absolute w-36 h-36 animate-pulse text-gray-100 -left-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd">
                  </path>
                </svg>
                  )
                }
                {showUpload && (
                  <div className='absolute inset-0 flex items-center justify-center bg-gray-700/80 animate__animated animate__fadeIn'>
                    <label htmlFor='avatar-upload'>
                      <input
                        type='file'
                        id='avatar-upload'
                        accept='image/*'
                        className='hidden'
                        onChange={editavatar}
                      />
                      <div className='text-white text-center'>
                        <i className="fa-solid fa-image text-3xl"></i>
                      </div>
                    </label>
                  </div>
                )}
            </div>
          </div>
          <div className='flex flex-col items-center pt-16'>
            <h1
              className='text-3xl font-semibold'
            >
              {username}
            </h1>
          </div>
          <div className='mt-3 p-5 md:w-[30rem] md:mx-auto rounded-lg bg-gray-100 flex flex-col gap-5'>
            <div>
              <label className='text-gray-600'>Nama Lengkap</label>
              <h1
                className='text-lg md:text-2xl font-semibold'
              >
                {fullname}
              </h1>
            </div>
            <div>
              <label className='text-gray-600'>Alamat</label>
              <h1
                className='text-lg md:text-2xl font-semibold'
              >
                {address}
              </h1>
            </div>
            <div>
              <label className='text-gray-600'>Email</label>
              <h1
                className='text-lg md:text-2xl font-semibold'
              >
                {email}
              </h1>
            </div>
            <div>
              <label className='text-gray-600'>Nomor Handphone</label>
              <h1
                className='text-lg md:text-2xl font-semibold'
              >
                {phoneNumber}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default ProfilAdmin
