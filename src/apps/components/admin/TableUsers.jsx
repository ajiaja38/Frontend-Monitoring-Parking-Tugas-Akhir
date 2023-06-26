import React, { useEffect, useState } from 'react'
import UsersSourceAPI from '../../api/resource/sourceUsers'
import ToastNotification from '../assets/helpers/toast'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import SpinnerElement from '../assets/helpers/spinner'

const TableUsers = () => {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsloading] = useState(false)

  const limit = 5

  const getAllDataPagination = async (page, limit) => {
    try {
      const response = await UsersSourceAPI.getAllUsersPagination(page, limit)
      setUsers(response.users)
      setCurrentPage(response.page)
      setTotalUsers(response.totalUsers)
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

  const alertDeleteUsers = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Anda Ingin Hapus user ini?',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      confirmButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser(id)
      }
    })
  }

  const handleDeleteUser = async (id) => {
    setIsloading(true)

    try {
      const response = await UsersSourceAPI.deleteUserById(id)
      const currentDevices = users.filter(user => user.id !== id)
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
        <div className='flex w-full justify-start items-center mb-3'>
          <h1 className='font-semibold'>Table Users</h1>
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
                  className="whitespace-nowrap px-4 py-2 text-center font-semibold text-gray-900"
                >
                  Avatar
                </th>
                <th
                  className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900"
                >
                  Fullname
                </th>
                <th
                  className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900"
                >
                  Username
                </th>
                <th
                  className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900"
                >
                  Email
                </th>
                <th
                  className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900"
                >
                  WhatsApp
                </th>
                <th
                  className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900"
                >
                  Alamat
                </th>
                <th
                  className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900"
                >
                  Role
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
              {users.length === 0
                ? (
                      <tr>
                        <td colSpan="11" className='p-3 space-y-3'>
                          <h1 className='font-semibold text-lg'>Belum ada Users yang terdaftar</h1>
                        </td>
                      </tr>
                  )
                : (
                    users.map((user, index) => (
                      <tr
                        key={index}
                        className='hover:bg-gray-100 transition-all ease-in-out'
                      >
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 font-semibold text-center">{index + 1 + (currentPage - 1) * limit}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          <div className="w-10 h-10 overflow-hidden bg-gray-400 ring-2 ring-gray-300 rounded-full flex justify-center items-start">
                            {
                              user.avatarUrl !== null
                                ? <img
                                    src={user.avatarUrl}
                                    alt='Avatar User'
                                    className='object-cover w-full h-full'
                                  />
                                : <svg
                                    className="w-12 h-12 animate-pulse text-gray-300 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd">
                                    </path>
                                  </svg>
                            }
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.fullname}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.username}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.email}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.phoneNumber}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.address}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.role}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {
                            user.isActive
                              ? <span className='inline-block bg-green-400 rounded text-sm text-white px-2'>Aktif</span>
                              : <span className='inline-block bg-red-400 rounded text-sm text-white px-2'>Non Aktif</span>
                          }
                        </td>

                        <td className="whitespace-nowrap px-4 py-2 flex gap-2 justify-center">
                          <Link to={`/users/editUser/${user.id}`}>
                            <button
                              className="inline-block rounded transition-all ease-in-out bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-200 px-4 py-2 text-xs font-medium text-white"
                            >
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={() => alertDeleteUsers(user.id)}
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
          Total Users : { totalUsers }, Page: { totalUsers ? currentPage : 0 } of { totalPages }
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

export default TableUsers
