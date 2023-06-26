import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import UsersSourceAPI from '../../api/resource/sourceUsers'
import ToastNotification from '../../components/assets/helpers/toast'
import SpinnerElement from '../../components/assets/helpers/spinner'

const ProfileUser = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [avatar, setAvatar] = useState('')
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [showUpload, setShowUpload] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getUserById = async () => {
    setIsLoading(true)
    try {
      const response = await UsersSourceAPI.getUserById(id)
      setAvatar(response.avatarUrl)
      setFullname(response.fullname)
      setUsername(response.username)
      setPassword(response.password)
      setEmail(response.email)
      setPhoneNumber(response.phoneNumber)
      setAddress(response.address)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
    setIsLoading(false)
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

  const updateUserById = async (e) => {
    e.preventDefault()
    setIsLoading(true)

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

      const response = await UsersSourceAPI.editUserById(id, data)
      navigate('/home')
      ToastNotification.toastSuccess(response)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
    setIsLoading(false)
  }

  return (
    <>
      { isLoading && <SpinnerElement/> }
      <div className='bg-gray-50 pb-10 lg:pb-0 w-full h-full md:h-screen relative flex justify-center items-start lg:items-center'>
        <div className='fixed top-0 inset-x-0 h-[30%] bg-gradient-to-r from-blue-600 to-green-400'></div>
        <div className='fixed inset-0 bg-black/10'></div>
        <div className='bg-white rounded-lg shadow-lg w-[90%] lg:w-3/5 lg:h-[75%] z-50 flex flex-col md:items-center pb-5 px-7 mt-24 lg:mt-10 pt-20 relative'>
          <h2 className='inline-block absolute -top-8 md:-top-11 left-40 md:left-1 text-white text-base md:text-3xl font-bold'>
            Profile {username}
          </h2>
          <div
            className='rounded-xl md:rounded-full w-28 h-28 md:w-36 md:h-36 lg:w-32 lg:h-32 overflow-hidden ring-2 ring-gray-200 bg-gray-400 absolute -top-14 md:-top-16 shadow-lg transition duration-300 ease-in-out transform hover:scale-110 lg:m-0'
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
                className="absolute w-32 h-32 md:w-40 md:h-40 lg:w-36 lg:h-36 text-gray-100 -left-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
          <div className='w-full h-full'>
            <form
              onSubmit={updateUserById}
              className="lg:space-y-0 grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <div className='w-full'>
                <label className="text-gray-600">Nama Lengkap</label>
                <input
                  type="text"
                  name="fullname"
                  value={fullname}
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Masukkan nama lengkap anda'
                  className="focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className='w-full'>
                <label className="text-gray-600">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Masukkan Password anda'
                  className="focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className='w-full'>
                <label className="text-gray-600">Konfirmasi Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
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
                  value={email}
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
                  value={phoneNumber}
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder='Masukkan alamat anda'
                  className="focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className='w-full'>
                <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-2 lg:mt-8'>
                  <button
                    type='submit'
                    className='px-6 py-3 bg-green-400 rounded-md hover:scale-105 active:scale-100 transition-all ease-in-out text-white w-full'
                  >
                    Edit Profile
                  </button>

                  <Link to='/home'>
                    <button
                      className='px-6 py-3 bg-red-400 rounded-md hover:scale-105 active:scale-100 transition-all ease-in-out text-white w-full'
                    >
                      Kembali
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileUser
