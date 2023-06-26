// Guest Page
import HomePage from './common/HomePage'
import RegisterPage from './common/RegisterPage'
import LoginPage from './common/LoginPage'

// AdminPage
import DashboardAdmin from './admin/DashboardAdmin'
import ListUser from './admin/ListUser'
import ListDevice from './admin/ListDevices'
import AddDevices from './admin/AddDevices'
import EditDevice from './admin/EditDevice'
import AddPartnerDevice from './admin/AddPartnerDevice'
import EditUser from './admin/EditUser'
import ProfilAdmin from './admin/ProfilAdmin'

// UserPage
import HomeUser from './client/HomeUser'
import ProfileUser from './client/ProfilUser'

// Error Page
import UnauthorizedPage from './error/UnauthorizedPage'

export {
  /* Guest */
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
}
