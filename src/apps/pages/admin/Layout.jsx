/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import UsersSourceAPI from '../../api/resource/sourceUsers'
import jwtDecode from 'jwt-decode'
import SidebarAdmin from '../../components/admin/Sidebar'
import NavbarAdmin from '../../components/admin/Navbar'
import BottomNavigationAdmin from '../../components/admin/BottomNavigation'
import ToastNotification from '../../components/assets/helpers/toast'

const LayoutAdmin = ({ children }) => {
  const [id, setId] = useState('')
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')

  const accessToken = localStorage.getItem('accessToken')
  const userCurrentId = jwtDecode(accessToken)

  const getUserById = async () => {
    try {
      const response = await UsersSourceAPI.getUserById(userCurrentId.id)
      setId(response.id)
      setUsername(response.fullname)
      setAvatar(response.avatarUrl)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
  }

  useEffect(() => {
    getUserById()
  }, [])

  return (
    <div className='flex h-screen overflow-hidden bg-gray-50 py-2 lg:p-3'>
      <SidebarAdmin username={username} />
      <div className='relative flex w-full lg:w-[84%] flex-col overflow-y-auto overflow-x-hidden'>
        <NavbarAdmin avatar={avatar} id={id}/>
        <main>
          <div className='p-3 pt-0 lg:pr-0 mx-auto max-w-screen-2xl'>
            {children}
          </div>
        </main>
      </div>
      <BottomNavigationAdmin/>
    </div>
  )
}

export default LayoutAdmin
