import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './utils/privateRoute'
import RequireAuth from './utils/RequireAuth'
import {
  /* guest */
  HomePage,
  RegisterPage,
  LoginPage,

  /* admin */
  DashboardAdmin,
  ListUser,
  ListDevice,
  AddDevices,
  EditDevice,
  AddPartnerDevice,
  EditUser,
  ProfilAdmin,

  /* users */
  HomeUser,
  ProfileUser,

  /* error */
  UnauthorizedPage
} from '../pages'

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<HomePage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/unauthorized' element={<UnauthorizedPage/>} />

        {/* Parent Routes Auth Requerement */}
        <Route element={<RequireAuth redirectPath='/login'/>}>

          {/* Private Routes Admin */}
          <Route
            path='/admin'
            element={
              <PrivateRoute
                redirectPath='/unauthorized'
                role = 'admin'
              >
                <DashboardAdmin/>
              </PrivateRoute>
            }
          />

          <Route
            path='/devices'
            element={
              <PrivateRoute
                redirectPath='/unauthorized'
                role = 'admin'
              >
                <ListDevice/>
              </PrivateRoute>
            }
          />

          <Route
            path='/devices/addDevice'
            element={
              <PrivateRoute
                redirectPath='/unauthorized'
                role = 'admin'
              >
                <AddDevices/>
              </PrivateRoute>
            }
          />

          <Route
            path='/devices/editDevice/:id'
            element={
              <PrivateRoute
                redirectPath='/unauthorized'
                role = 'admin'
              >
                <EditDevice/>
              </PrivateRoute>
            }
          />

          <Route
            path='/devices/addPartner/:id'
            element={
              <PrivateRoute
                redirectPath='/unauthorized'
                role = 'admin'
              >
                <AddPartnerDevice/>
              </PrivateRoute>
            }
          />

          <Route
            path='/users'
            element={
              <PrivateRoute
                redirectPath='/unauthorized'
                role = 'admin'
              >
                <ListUser/>
              </PrivateRoute>
            }
          />

          <Route
            path='/users/editUser/:id'
            element={
              <PrivateRoute
                redirectPath='/unauthorized'
                role = 'admin'
              >
                <EditUser/>
              </PrivateRoute>
            }
          />

          <Route
            path='/admin/profile/:id'
            element={
              <PrivateRoute
                redirectPath='/unauthorized'
                role = 'admin'
              >
                <ProfilAdmin/>
              </PrivateRoute>
            }
          />

          {/* Private Routes User */}
          <Route
            path='/home'
            element={
              <PrivateRoute
                redirectPath='/unauthorized'
                role='user'>
                <HomeUser/>
              </PrivateRoute>
            }
          />

          <Route
            path='/user/profile/:id'
            element={
              <PrivateRoute
                redirectPath='/unauthorized'
                role='user'>
                <ProfileUser/>
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Routers
