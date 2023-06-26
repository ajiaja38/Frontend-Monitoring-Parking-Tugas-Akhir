import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import SpinnerElement from '../assets/helpers/spinner'
import ToastNotification from '../assets/helpers/toast'
import DeviceSourceAPI from '../../api/resource/sourceDevice'

const FormEditDevice = () => {
  const navigate = useNavigate()

  const [guid, setGuid] = useState('')
  const [name, setName] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longtitude, setLongtitude] = useState('')
  const [mac, setMac] = useState('')
  const [type, setType] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { id } = useParams()

  const getDeviceById = async (id) => {
    try {
      setIsLoading(true)
      const response = await DeviceSourceAPI.getDeviceById(id)
      setGuid(response.guid)
      setName(response.name)
      setLatitude(response.latitude)
      setLongtitude(response.longtitude)
      setMac(response.mac)
      setType(response.type)
      setIsLoading(false)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
  }

  const updateDeviceById = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const data = {
        guidPayload: guid,
        name,
        latitude,
        longtitude,
        mac,
        type
      }
      const response = await DeviceSourceAPI.putDeviceById(id, data)
      setIsLoading(false)
      navigate('/devices')
      ToastNotification.toastSuccess(response)
    } catch (error) {
      setIsLoading(false)
      ToastNotification.toastError(error.response.data.message)
    }
  }

  useEffect(() => {
    getDeviceById(id)
  }, [id])

  return (
    <>
      { isLoading && <SpinnerElement/> }
      <div className='bg-white shadow-lg rounded-xl w-full px-6 py-4 relative z-50 flex flex-col mb-14 md:mb-0'>
        <div className='flex w-full justify-start items-center mb-3'>
          <h1 className='font-semibold text-lg'>Edit Device</h1>
        </div>
        <div>
          <form
            onSubmit={updateDeviceById}
            className="lg:space-y-0 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className='w-full'>
              <label className="text-gray-600">GUID Device</label>
              <input
                value={guid}
                onChange={(e) => setGuid(e.target.value)}
                type="text"
                name="guid"
                placeholder='Masukkan GUID Device Anda'
                className="focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className='w-full'>
              <label className="text-gray-600">Nama Device</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                placeholder='Masukkan Nama Device Anda'
                className="focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className='w-full'>
              <label className="text-gray-600">Latitude</label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                name="latitude"
                placeholder='Masukkan Latitude Device'
                className="focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className='w-full'>
              <label className="text-gray-600">Longitude</label>
              <input
                type="text"
                value={longtitude}
                onChange={(e) => setLongtitude(e.target.value)}
                name="longitude"
                placeholder='Masukkan Longitude Device'
                className="focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className='w-full'>
              <label className="text-gray-600">MAC</label>
              <input
                type="text"
                value={mac}
                onChange={(e) => setMac(e.target.value)}
                name="mac"
                placeholder='Masukkan kode MAC Device'
                className="focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className='w-full'>
              <label className="text-gray-600">Tipe</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className='focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500'
              >
                <option readOnly>Pilih Tipe Device</option>
                <option value='aktuator'>Aktuator</option>
                <option value='sensor'>Sensor</option>
              </select>
            </div>

            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2'>
              <button
                type='submit'
                className='px-6 py-3 bg-green-400 rounded-md w-full hover:scale-105 active:scale-100 transition-all ease-in-out text-white'
              >
                Edit Device
              </button>

              <Link to='/devices'>
                <button
                  className='px-6 py-3 bg-red-400 rounded-md w-full hover:scale-105 active:scale-100 transition-all ease-in-out text-white'
                >
                  Batal
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default FormEditDevice
