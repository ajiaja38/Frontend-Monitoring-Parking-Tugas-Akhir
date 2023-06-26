import CONFIG from './config'

const { BASE_URL, BASE_URL_V2 } = CONFIG

const API_ENDPOINT = {
  AUTHENTICATIONS: `${BASE_URL}/authentications`,
  DEVICES: `${BASE_URL}/device`,
  DEVICE_BY_ID: (id) => `${BASE_URL}/device/${id}`,
  DEVICE_PARTNER_BY_ID: (id) => `${BASE_URL}/device/partner/${id}`,
  DEVICE_PAGINATION: (page, limit) => `${BASE_URL}/devicepagination?page=${page}&limit=${limit}`,
  USERS: `${BASE_URL}/user`,
  USER_BY_ID: (id) => `${BASE_URL}/user/${id}`,
  USER_PAGINATION: (page, limit) => `${BASE_URL}/userpagination?page=${page}&limit=${limit}`,
  OTP_VERIFICATION: `${BASE_URL}/user/otp`,
  UPLOAD_AVATAR: (id) => `${BASE_URL}/user/${id}/images`,
  GET_DATA_CAMERA_BY_ID: (id) => `${BASE_URL_V2}/camera/${id}`,
  GET_DATA_SENSOR_BY_ID: (id) => `${BASE_URL_V2}/sensor/${id}`
}

export default API_ENDPOINT
