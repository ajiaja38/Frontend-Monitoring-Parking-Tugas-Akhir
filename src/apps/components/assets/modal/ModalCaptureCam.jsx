/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import redCar from '../../assets/images/modal/redCar.png'
import greenCar from '../../assets/images/modal/greenCar.png'
import ToastNotification from '../helpers/toast'
import DeviceSourceAPI from '../../../api/resource/sourceDevice'

const ModalCaptureCameraDetail = ({ open, onCloseModal, guid, name }) => {
  const [updateTime, setUpdateTime] = useState(null)
  const [firstLineParking, setFirstLineParking] = useState([])
  const [secondLineParking, setSecondLineParking] = useState([])
  const [displayChange, setDisplayChange] = useState(false)
  const [capture, setCapture] = useState('')

  const getDataCapture = async (id) => {
    try {
      const response = await DeviceSourceAPI.getDataCaptureById(id)
      setCapture(response.namafile)
      setFirstLineParking(response.hasil.baris_1)
      setSecondLineParking(response.hasil.baris_2)
      setUpdateTime(response.dateTime)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
  }

  useEffect(() => {
    getDataCapture(guid)
    const interval = setInterval(() => {
      getDataCapture(guid)
    }, 15000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const changeDisplay = () => {
    setDisplayChange(!displayChange)
  }

  return (
    <Modal
      classNames={{
        modal: 'rounded-lg p-0'
      }}
      open={open}
      onClose={onCloseModal}
      center
    >
      <div className='w-[17rem] h-90 lg:w-[47rem] lg:h-[35rem] rounded-xl flex flex-col justify-start items-center'>
        <h1 className='inline-block my-2 text-[11px] md:text-lg font-semibold'>Capture {name}</h1>
        <div className='w-full h-[80%] border rounded-xl p-2'>
          {
            displayChange
              ? (
                  <img
                    src={`https://smartparking.pptik.id/data/data_web/${capture}`}
                    className='w-full h-full object-cover object-center rounded-md'
                  />
                )
              : (
                <>
                  <div className='flex flex-col justify-center items-center'>
                    <table className='w-full'>
                      <tbody>
                        <tr className='border-b-4 border-black'>
                          {firstLineParking.map((val, index) => {
                            return (
                              <td key={index} className={index === firstLineParking.length - 1 ? 'p-2 md:p-3' : 'p-2 md:p-3 border-r-4 border-black'}>
                                <img
                                  src={val === 0 ? greenCar : redCar}
                                  className='w-[100%] md:w-[70%] mx-auto transform -scale-y-100'
                                />
                              </td>
                            )
                          })}
                        </tr>
                        <tr>
                          <td colSpan='4' className='text-center py-4'>
                            <h1>Jalan Utama</h1>
                          </td>
                          <td colSpan='4' className='text-center py-4'>
                            <h1>Jalan Utama</h1>
                          </td>
                        </tr>
                        <tr className='border-t-4 border-black'>
                          {secondLineParking.map((val, index) => {
                            return (
                              <td key={index} className={index === secondLineParking.length - 1 ? 'p-2 md:p-3' : 'p-2 md:p-3 border-r-4 border-black'}>
                                <img
                                  src={val === 0 ? greenCar : redCar}
                                  className='w-[100%] md:w-[70%] mx-auto'
                                />
                              </td>
                            )
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className='mt-[2%] w-full'>
                    <div>
                      <div className='my-1 flex justify-center items-center w-full'>
                        <h2 className='font-semibold mr-2 text-[10px] md:text-base'>
                          Keterangan
                        </h2>
                        <div className='w-full bg-black h-[3px]'></div>
                      </div>
                    </div>
                    <div className='flex'>
                      <div className='w-10 md:w-20 flex flex-col items-center'>
                        <img
                          src={redCar}
                          className='w-[50%]'
                        />
                        <div className='w-5 md:w-14 mt-2 mb-1 h-[3px] bg-black'></div>
                        <h3 className='text-[10px] md:text-sm'>Terisi</h3>
                      </div>
                      <div className='w-10 md:w-20 flex flex-col items-center'>
                        <img
                          src={greenCar}
                          className='w-[50%]'
                        />
                        <div className='w-5 md:w-14 mt-2 mb-1 h-[3px] bg-black'></div>
                        <h3 className='text-[10px] md:text-sm'>Kosong</h3>
                      </div>
                    </div>
                  </div>
                </>
                )
          }
        </div>
        <button
          onClick={() => changeDisplay()}
          className='bg-red-500 hover:bg-red-300 active:bg-red-700 transition-all p-2 rounded-lg text-white text-sm top-2 right-2 my-2'
        >
          {
            displayChange
              ? (<>Lihat Model Parkir</>)
              : (<>Lihat Gambar Asli</>)
          }
        </button>
        <h2 className='text-xs lg:text-sm'>Terakhir Update: { updateTime }</h2>
      </div>
    </Modal>
  )
}

export default ModalCaptureCameraDetail
