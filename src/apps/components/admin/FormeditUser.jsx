import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import UsersSourceAPI from '../../api/resource/sourceUsers'
import ToastNotification from '../assets/helpers/toast'
import SpinnerElement from '../assets/helpers/spinner'

const FormEditUsers = () => {
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [role, setRole] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const getUserById = async (id) => {
    setIsLoading(true)

    try {
      const response = await UsersSourceAPI.getUserById(id)
      setFullname(response.fullname)
      setUsername(response.username)
      setPassword(response.password)
      setEmail(response.email)
      setPhoneNumber(response.phoneNumber)
      setAddress(response.address)
      setRole(response.role)
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
        address,
        role
      }

      const response = await UsersSourceAPI.editUserById(id, data)
      navigate('/users')
      ToastNotification.toastSuccess(response)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getUserById(id)
  }, [id])

  return (
    <>
      { isLoading && <SpinnerElement/> }
      <div
      className='bg-white shadow-lg rounded-xl w-full px-6 py-4 relative z-50 flex flex-col mb-14 md:mb-0 pb-8'
      >
        <div className='flex w-full justify-start items-center mb-3'>
          <h1 className='font-semibold text-lg'>Edit Users</h1>
        </div>
        <form
          onSubmit={updateUserById}
          className="lg:space-y-0 grid grid-cols-1 md:grid-cols-2 gap-6"
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
            <label className="text-gray-600">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className='focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500'
            >
              <option readOnly>Pilih Role Users</option>
              <option value='admin'>Admin</option>
              <option value='user'>User</option>
            </select>
          </div>

          <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2'>
            <button
              type='submit'
              className='px-6 py-3 bg-green-400 rounded-md w-full hover:scale-105 active:scale-100 transition-all ease-in-out text-white'
            >
              Edit Users
            </button>

            <Link to='/users'>
              <button
                className='px-6 py-3 bg-red-400 rounded-md w-full hover:scale-105 active:scale-100 transition-all ease-in-out text-white'
              >
                Batal
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default FormEditUsers
