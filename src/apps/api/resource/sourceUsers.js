import axios from 'axios'
import API_ENDPOINT from '../global/api-endpoint'
import api from '../packages/interceptors'

const { USERS, USER_BY_ID, OTP_VERIFICATION, UPLOAD_AVATAR, USER_PAGINATION } = API_ENDPOINT

class UsersSourceAPI {
  static async register (data) {
    const response = await axios.post(USERS, data)
    return response.data.message
  }

  static async verifyUserOtp (otpPayload) {
    const response = await axios.post(OTP_VERIFICATION, otpPayload)
    return response.data.message
  }

  static async getAllUsers () {
    const response = await api.get(USERS)
    return response.data.data
  }

  static async getUserById (id) {
    const response = await api.get(USER_BY_ID(id))
    return response.data.data
  }

  static async getAllUsersPagination (page, limit) {
    const response = await api.get(USER_PAGINATION(page, limit))
    return response.data.data
  }

  static async editUserById (id, data) {
    const response = await api.put(USER_BY_ID(id), data)
    return response.data.message
  }

  static async deleteUserById (id) {
    const response = await api.delete(USER_BY_ID(id))
    return response.data.message
  }

  static async uploadAvatar (id, avatar) {
    const response = await api.post(UPLOAD_AVATAR(id), avatar, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data.message
  }
}

export default UsersSourceAPI
