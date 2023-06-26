import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ToastNotification from '../assets/helpers/toast'
import DeviceSourceAPI from '../../api/resource/sourceDevice'
import SpinnerElement from '../assets/helpers/spinner'

const FormAddPartnerDevice = () => {
  const [guidPartner, setGuidpartner] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const addPartnerDevice = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const data = {
        guidPayload: guidPartner
      }
      const response = await DeviceSourceAPI.addPartnerDeviceById(id, data)
      setIsLoading(false)
      navigate('/devices')
      ToastNotification.toastSuccess(response)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
      setIsLoading(false)
    }
  }

  return (
    <>
      { isLoading && <SpinnerElement/> }
      <div className='bg-white shadow-lg rounded-xl w-full px-6 py-4 relative z-50 flex flex-col mb-14 md:mb-0'>
        <div className='flex w-full justify-start items-center mb-5'>
          <h1 className='font-semibold text-lg'>Tambah Partner Device</h1>
        </div>
        <form
          onSubmit={addPartnerDevice}
          className='lg:space-y-0 grid grid-cols-1 md:grid-cols-2 gap-6'
        >
          <div className='w-full'>
            <label className="text-gray-600">GUID Device</label>
            <input
              type="text"
              name="guid"
              value={id}
              placeholder='Masukkan GUID Device Anda'
              className="focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
              required
              readOnly
            />
          </div>

          <div className='w-full'>
            <label className="text-gray-600">GUID Partner Device</label>
            <input
              type="text"
              value={guidPartner}
              onChange={(e) => setGuidpartner(e.target.value)}
              name="guidPartner"
              placeholder='Masukkan GUID Partner Device Anda'
              className="focus:outline-none block w-full mt-2 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2'>
            <button
              type='submit'
              className='px-6 py-3 bg-green-400 rounded-md w-full hover:scale-105 active:scale-100 transition-all ease-in-out text-white'
            >
              Tambah Partner Device
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
    </>
  )
}

export default FormAddPartnerDevice
