/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import AuthSourceAPI from '../../api/resource/sourceAuth'
import jwtDecode from 'jwt-decode'
import UsersSourceAPI from '../../api/resource/sourceUsers'
import { useNavigate, NavLink } from 'react-router-dom'
import logo from '../../components/assets/images/device-white.png'
import ToastNotification from '../../components/assets/helpers/toast'
import SpinnerElement from '../../components/assets/helpers/spinner'

const LoginPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [role, setRole] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const auth = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const data = { username, password }
      const response = await AuthSourceAPI.login(data)
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)

      setAccessToken(response.accessToken)
      ToastNotification.toastSuccess('Berhasil Login')
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
    setIsLoading(false)
  }

  const getData = async () => {
    if (accessToken) {
      const userId = jwtDecode(accessToken)
      try {
        const response = await UsersSourceAPI.getUserById(userId.id, accessToken)
        setRole(response.role)
      } catch (error) {
        ToastNotification.toastError(error.response.data.message)
      }
    }
  }

  useEffect(() => {
    getData()
  }, [accessToken])

  useEffect(() => {
    if (role === 'admin') {
      navigate('/admin')
    }

    if (role === 'user') {
      navigate('/home')
    }
  }, [role, navigate])

  return (
    <>
      { isLoading && <SpinnerElement/> }
      <div className='w-full lg:bg-gray-50 h-screen lg:h-full flex justify-center items-center'>
        <div className="container relative lg:py-10 text-gray-500 md:px-12 xl:px-40 flex justify-center">
          <div className="space-y-8 px-7 md:p-0 w-full md:w-[90%] lg:w-6/12 xl:w-6/12">
            <div className="rounded-3xl bg-white lg:border lg:border-gray-100 lg:shadow-2xl lg:shadow-gray-600/10 lg:backdrop-blur-2xl">
              <div className="py-12 sm:p-16">
                <div className="w-10 h-10 mb-2 md:mb-3 bg-gradient-to-r from-green-400 to-blue-600 flex justify-center items-center rounded-xl">
                  <img
                    src={logo}
                    alt='Logo'
                    className='w-8'
                  />
                </div>
                <h1 className="mb-8 text-lg md:text-xl font-bold text-gray-800">Login ke Monitoring Parkir LSKK</h1>
                <form onSubmit={auth} className="space-y-7">
                  <div className="space-y-2">
                    <label className="text-gray-600">Username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={username}
                      placeholder='Masukkan username anda'
                      onChange={(e) => setUsername(e.target.value)}
                      className="focus:outline-none block w-full rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className="text-gray-600">Password</label>
                    <input
                      type="password"
                      name="pwd"
                      id="pwd"
                      value={password}
                      placeholder='Masukkan password anda'
                      onChange={(e) => setPassword(e.target.value)}
                      className="focus:outline-none block w-full rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 bg-gradient-to-r from-green-400 to-blue-600 rounded-md w-full py-3 hover:scale-105 active:scale-100 transition-all ease-in-out"
                  >
                    <span className="relative text-base font-semibold text-white">Login</span>
                  </button>

                  <p className="border-t border-gray-100 pt-6 text-sm text-gray-500">
                    Belum punya akun ?
                    <NavLink to='/register' className="text-primary hover:text-blue-500"> Daftar</NavLink>
                  </p>
                </form>
              </div>
            </div>
            <div className="space-x-4 text-center text-gray-500">
              <span>&copy; Devices Monitoring LSKK 2023</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
