/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import redCar from '../../assets/images/modal/redCar.png'
import greenCar from '../../assets/images/modal/greenCar.png'
import axios from 'axios'
import API_ENDPOINT from '../../../api/global/api-endpoint'
import ToastNotification from '../helpers/toast'

const ModalSensor = ({ open, onCloseModal, guid }) => {
  const { GET_DATA_SENSOR_BY_ID } = API_ENDPOINT

  const [data, setData] = useState([])
  const [sensorIsFilled, setSensorIsFilled] = useState(0)
  const [dateTime, setDateTime] = useState(null)
  const [displayChange, setDisplayChange] = useState(false)
  const [sensorValue, setSensorValue] = useState(0)

  const getDataDeviceByID = async (guidDevice) => {
    try {
      const response = await axios.get(GET_DATA_SENSOR_BY_ID(guidDevice), {
        headers: {
          'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMzIyMTExMSIsIm5hbWUiOiJBc2VwIFRyaXNuYSBTZXRpYXdhbiIsImlhdCI6MTUxNjIzOTAyMn0.kzskxWt0MbHYfPJLw-2eCq4uJZeozxj5gWmH2GHju4M'
        }
      })
      setData(response.data.result)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
  }

  const changeDisplay = () => {
    setDisplayChange(!displayChange)
  }

  useEffect(() => {
    getDataDeviceByID(guid)
  }, [])

  useEffect(() => {
    if (data.length) {
      data.map(item => {
        setSensorIsFilled(item.result)
        setDateTime(item.datetime)
        setSensorValue(item.value)
      })
    }
  }, [data])

  return (
    <Modal
      classNames={{
        modal: 'rounded-lg p-0'
      }}
      open={open}
      onClose={onCloseModal}
      center
    >
      <div className='w-[17rem] h-80 lg:w-[47rem] lg:h-[35rem] rounded-xl flex flex-col justify-start items-center'>
        <h1 className='inline-block my-2 text-md md:text-lg font-semibold'>Info Sensor Parkir</h1>
        <div className='w-full h-[80%] border rounded-xl p-2'>
          {
            displayChange
              ? (
                  <div className='w-full h-full flex gap-2 justify-center items-center flex-col font-bold'>
                    <h1 className='text-xl md:text-3xl'>Nilai Sensor:</h1>
                    <h2 className='text-4xl md:text-6xl'>{sensorValue} CM</h2>
                  </div>
                )
              : (
                  <>
                    <div className='flex flex-col justify-center items-center'>
                      <table className='w-full'>
                        <tbody>
                          <tr>
                            <td className='p-3'>
                              <img
                                src={sensorIsFilled === 0 ? greenCar : redCar}
                                className='w-[20%] mx-auto'
                              />
                            </td>
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
              ? (<>Lihat Model Sensor Parkir</>)
              : (<>Lihat Nilai Value</>)
          }
        </button>
        <h2 className='text-sm'>Terakhir Update: {dateTime}</h2>
      </div>
    </Modal>
  )
}

export default ModalSensor
