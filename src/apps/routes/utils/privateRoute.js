/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import UsersSourceAPI from '../../api/resource/sourceUsers'
import JwtDecode from 'jwt-decode'

const PrivateRoute = ({ redirectPath, role, children }) => {
  const [roleLogged, setRoleLogged] = useState(null)
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    const getRole = async () => {
      if (accessToken) {
        const decodedToken = JwtDecode(accessToken)
        const userId = decodedToken.id
        try {
          const response = await UsersSourceAPI.getUserById(userId, accessToken)
          setRoleLogged(response.role)
        } catch (error) {
          console.log(error.response.data.message)
        }
      }
    }
    getRole()
  }, [accessToken])

  if (roleLogged && roleLogged !== role) {
    return <Navigate to={redirectPath}/>
  }

  return children
}

export default PrivateRoute
