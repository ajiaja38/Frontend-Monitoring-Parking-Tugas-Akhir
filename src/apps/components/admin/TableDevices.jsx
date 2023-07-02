import React, { useEffect, useState } from 'react'
import DeviceSourceAPI from '../../api/resource/sourceDevice'
import ToastNotification from '../assets/helpers/toast'
import ReactPaginate from 'react-paginate'
import Swal from 'sweetalert2'
import SpinnerElement from '../assets/helpers/spinner'
import { NavLink, Link } from 'react-router-dom'

const TableDevices = () => {
  const [devices, setDevices] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalDevices, setTotalDevices] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsloading] = useState(false)

  const limit = 5

  const getAllDataPagination = async (page, limit) => {
    try {
      const response = await DeviceSourceAPI.getDevicePagination(page, limit)
      setDevices(response.devices)
      setCurrentPage(response.page)
      setTotalDevices(response.totalDevices)
      setTotalPages(response.totalPages)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
  }

  useEffect(() => {
    getAllDataPagination(currentPage, limit)
  }, [currentPage])

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1)
  }

  const alertDeleteDevice = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Anda Ingin Hapus Device?',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      confirmButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteDevice(id)
      }
    })
  }

  const handleDeleteDevice = async (id) => {
    setIsloading(true)

    try {
      const response = await DeviceSourceAPI.deleteDeviceById(id)
      const currentDevices = devices.filter(device => device.guid !== id)
      if (currentDevices.length > 0) {
        getAllDataPagination(currentPage, limit)
      } else {
        const prevPage = currentPage > 1 ? currentPage - 1 : 1
        getAllDataPagination(prevPage, limit)
      }
      ToastNotification.toastSuccess(response)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
    setIsloading(false)
  }

  return (
    <>
      { isLoading && <SpinnerElement/> }
      <div className='bg-white shadow-lg rounded-xl w-full px-6 py-4 relative z-50 flex flex-col'>
        <div className='flex w-full justify-between items-center mb-3'>
          <h1 className='font-semibold'>Table Devices</h1>
          <NavLink to='/devices/addDevice'>
            <button
              className='px-2 min-h-[44px] min-w-[44px] bg-blue-500 hover:bg-blue-300 active:bg-blue-100 transition-all ease-in-out text-white text-sm font-semibold rounded'
            >
              Tambah Devices
            </button>
          </NavLink>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th
                  className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900"
                >
                  No
                </th>
                <th
                  className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900"
                >
                  Guid
                </th>
                <th
                  className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900"
                >
                  Nama
                </th>
                <th
                  className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900"
                >
                  Latitude
                </th>
                <th
                  className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900"
                >
                  Longitude
                </th>
                <th
                  className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900"
                >
                  Status
                </th>
                <th
                  className="whitespace-nowrap px-4 py-2 text-center font-semibold text-gray-900"
                >
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {devices.length === 0
                ? (
                      <tr>
                        <td colSpan="11" className='p-3 space-y-3'>
                          <h1 className='font-semibold text-lg'>Belum ada device yang di input</h1>
                        </td>
                      </tr>
                  )
                : (
                    devices.map((device, index) => (
                      <tr
                        key={device.guid}
                        className='hover:bg-gray-100 transition-all ease-in-out'
                      >
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 font-semibold text-center">{index + 1 + (currentPage - 1) * limit}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{device.guid}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{device.name}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{device.latitude}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{device.longtitude}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{device.isActive
                          ? <span className='inline-block bg-green-400 rounded text-sm text-white px-2'>Aktif</span>
                          : <span className='inline-block bg-red-400 rounded text-sm text-white px-2'>Non Aktif</span>}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 flex gap-2 justify-center">
                          <Link to={`/devices/editDevice/${device.guid}`}>
                            <button
                              className="inline-block rounded transition-all ease-in-out bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-200 px-4 py-2 text-xs font-medium text-white"
                            >
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={() => alertDeleteDevice(device.guid)}
                            className="inline-block rounded transition-all ease-in-out bg-red-500 hover:bg-red-300 active:bg-red-200 px-4 py-2 text-xs font-medium text-white"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  )
              }
            </tbody>
          </table>
        </div>
        <p
          className='inline-block my-3 text-sm'
        >
          Total Device : { totalDevices }, Page: { totalDevices ? currentPage : 0 } of { totalPages }
        </p>
        <div className='my-2'>
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            onPageChange={handlePageChange}
            forcePage={currentPage - 1}
            containerClassName={'pagination flex justify-start border border-gray-300 w-fit rounded-md p-2'}
            activeClassName={'bg-blue-500 text-white'}
            previousLabel={<span className="px-2">previous</span>}
            nextLabel={<span className="px-2">next</span>}
            breakClassName={'border-r border-gray-300'}
            breakLinkClassName={'px-2'}
            pageClassName={'border-r border-gray-300'}
            pageLinkClassName={'px-2'}
          />
        </div>

      </div>
    </>
  )
}

export default TableDevices
