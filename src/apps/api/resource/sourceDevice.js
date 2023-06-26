import API_ENDPOINT from '../global/api-endpoint'
import api from '../packages/interceptors'

const { DEVICES, DEVICE_BY_ID, DEVICE_PARTNER_BY_ID, DEVICE_PAGINATION } = API_ENDPOINT

class DeviceSourceAPI {
  static async addDevice (data) {
    const response = await api.post(DEVICES, data)
    return response.data.message
  }

  static async getAllDevices () {
    const response = await api.get(DEVICES)
    return response.data.data
  }

  static async getDeviceById (id) {
    const response = await api.get(DEVICE_BY_ID(id))
    return response.data.data
  }

  static async getDevicePagination (page, limit) {
    const response = await api.get(DEVICE_PAGINATION(page, limit))
    return response.data.data
  }

  static async putDeviceById (id, data) {
    const response = await api.put(DEVICE_BY_ID(id), data)
    return response.data.message
  }

  static async deleteDeviceById (id) {
    const response = await api.delete(DEVICE_BY_ID(id))
    return response.data.message
  }

  static async addPartnerDeviceById (id, data) {
    const response = await api.put(DEVICE_PARTNER_BY_ID(id), data)
    return response.data.message
  }
}

export default DeviceSourceAPI
