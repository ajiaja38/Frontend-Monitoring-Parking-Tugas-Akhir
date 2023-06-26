import React, { useState, useEffect } from 'react'
import LayoutAdmin from './Layout'
import MapsLeafletAdmin from '../../components/admin/MapsLeaflet'
import InformationPanelAdmin from '../../components/admin/InformationPanel'
import DeviceSourceAPI from '../../api/resource/sourceDevice'
import UsersSourceAPI from '../../api/resource/sourceUsers'
import jwtDecode from 'jwt-decode'
import ToastNotification from '../../components/assets/helpers/toast'

const DashboardAdmin = () => {
  const accessToken = localStorage.getItem('accessToken')
  const currentUser = jwtDecode(accessToken)

  const [device, setDevice] = useState([])
  const [currentUsername, setCurrentUsername] = useState('')
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAllDevices = async () => {
    try {
      const response = await DeviceSourceAPI.getAllDevices()
      setDevice(response)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
  }

  const getAllUsers = async () => {
    try {
      const response = await UsersSourceAPI.getAllUsers()
      setUsers(response)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
  }

  const getUserById = async () => {
    try {
      const response = await UsersSourceAPI.getUserById(currentUser.id)
      setCurrentUsername(response.fullname)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
  }

  useEffect(() => {
    const fetcData = async () => {
      await getAllDevices()
      await getAllUsers()
      await getUserById()
      setIsLoading(false)
    }
    fetcData()
  }, [])

  return (
    <LayoutAdmin>
      <MapsLeafletAdmin devices = { device }/>
      <InformationPanelAdmin countDevice = { device } countUsers = { users } currentUsername = {currentUsername} isLoading={isLoading}/>
    </LayoutAdmin>
  )
}

export default DashboardAdmin
