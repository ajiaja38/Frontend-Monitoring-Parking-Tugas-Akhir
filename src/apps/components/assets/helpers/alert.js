import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import AuthSourceAPI from '../../../api/resource/sourceAuth'
import ToastNotification from './toast'
import autoBind from 'auto-bind'

class AlertDecission {
  constructor () {
    this._auth = AuthSourceAPI
    this._navigate = useNavigate()
    this._toast = ToastNotification

    autoBind(this)
  }

  alertLogout () {
    Swal.fire({
      icon: 'warning',
      title: 'Anda Ingin Logout?',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      confirmButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.handleLogout()
      }
    })
  }

  async handleLogout () {
    try {
      await this._auth.logout()
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      this._toast.toastSuccess('Berhasil Logout')
      this._navigate('/login')
    } catch (error) {
      this._toast.toastError(error.response.data.message)
    }
  }
}

export default AlertDecission
