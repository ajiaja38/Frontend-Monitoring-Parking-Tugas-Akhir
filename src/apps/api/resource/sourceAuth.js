import axios from 'axios'
import API_ENDPOINT from '../global/api-endpoint'
import api from '../packages/interceptors'

const { AUTHENTICATIONS } = API_ENDPOINT

class AuthSourceAPI {
  static async login (data) {
    const response = await axios.post(AUTHENTICATIONS, data)
    return response.data.data
  }

  static async logout () {
    const response = await api.delete(AUTHENTICATIONS, {
      data: {
        refreshToken: localStorage.getItem('refreshToken')
      }
    })
    return response.data.message
  }
}

export default AuthSourceAPI
