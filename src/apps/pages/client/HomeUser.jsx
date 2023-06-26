import React, { useEffect, useState } from 'react'
import MapsLeafletUser from '../../components/client/MapsLeafletUser'
import NavbarUser from '../../components/client/Navbar'
import jwtDecode from 'jwt-decode'
import UsersSourceAPI from '../../api/resource/sourceUsers'
import DeviceSourceAPI from '../../api/resource/sourceDevice'
import ToastNotification from '../../components/assets/helpers/toast'
import SpinnerElement from '../../components/assets/helpers/spinner'

const HomeUser = () => {
  const [id, setId] = useState('')
  const [fullname, setFullname] = useState('')
  const [avatar, setAvatar] = useState('')
  const [devices, setDevices] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const accessToken = localStorage.getItem('accessToken')
  const { id: userCurrentId } = jwtDecode(accessToken)

  const getUserById = async () => {
    try {
      const response = await UsersSourceAPI.getUserById(userCurrentId)
      setId(response.id)
      setFullname(response.fullname)
      setAvatar(response.avatarUrl)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
  }

  const getAllDevices = async () => {
    try {
      const response = await DeviceSourceAPI.getAllDevices()
      setDevices(response)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
  }

  useEffect(() => {
    setIsLoading(true)

    const fetcData = async () => {
      await getUserById()
      await getAllDevices()
    }

    fetcData()

    setIsLoading(false)
  }, [])

  return (
    <>
      {isLoading && <SpinnerElement/>}
      <NavbarUser
        id={id}
        fullname={fullname}
        avatar={avatar}
      />
      <MapsLeafletUser
        devices={devices}
      />
    </>
  )
}

export default HomeUser
