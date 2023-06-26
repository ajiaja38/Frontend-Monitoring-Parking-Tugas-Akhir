/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import Countdown from 'react-countdown'
import ToastNotification from '../helpers/toast'
import UsersSourceAPI from '../../../api/resource/sourceUsers'
import { useNavigate } from 'react-router-dom'

const ModalConfirmOtp = ({ open, onCloseModal }) => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  const handleOtp = async () => {
    try {
      const data = {
        otpPayload: otp
      }
      const response = await UsersSourceAPI.verifyUserOtp(data)
      navigate('/login')
      ToastNotification.toastSuccess(response)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
  }

  return (
    <Modal
      classNames={{
        modal: 'rounded-lg p-0'
      }}
      open={open}
      onClose={onCloseModal}
      closeOnOverlayClick={ false }
      showCloseIcon={ false }
      center
    >
      <div className='w-[17rem] lg:w-[24rem] rounded-xl flex flex-col items-start px-5 text-gray-600'>
        <h1 className='text-lg font-semibold'>Konfirmasi Kode OTP pada Email!</h1>
        <p className='text-sm'>Mohon cek dan Masukkan kode OTP yang telah dikirimkan ke email anda.</p>
        <div className='w-full mt-3'>
          <input
            type="text"
            name="address"
            placeholder='Masukkan Kode OTP anda'
            onChange={(e) => setOtp(e.target.value)}
            className="focus:outline-none block w-full mt-3 rounded-md border border-gray-200 bg-transparent px-4 py-3 text-gray-600 transition duration-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleOtp}
            type="button"
            className="py-2 my-3 bg-gradient-to-r from-green-400 to-blue-600 rounded-md w-[30%] hover:scale-105 active:scale-100 transition-all ease-in-out"
          >
            <span className="relative text-sm font-semibold text-white dark:text-dark">Konfirmasi</span>
          </button>
          <p className='text-sm'>kode akan expired dalam waktu : <Countdown
            date={Date.now() + 180 * 1000}
            intervalDelay={0}
            precision={3}
            renderer={({ minutes, seconds }) => (
              <span className='font-semibold'>{`${minutes}:${seconds}`}</span>
            )}
            onComplete={onCloseModal}
          /> menit
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default ModalConfirmOtp
