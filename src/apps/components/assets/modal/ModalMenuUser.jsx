/* eslint-disable react/prop-types */
import React from 'react'
import AlertDecission from '../helpers/alert'
import { Link } from 'react-router-dom'

const ModalMenuUser = ({ linkProfile }) => {
  const alertDecission = new AlertDecission()

  return (
    <div className="absolute top-[4.2rem] right-0 w-36 ring-1 ring-gray-200 origin-top-right rounded-xl shadow-lg bg-white focus:outline-none">
      <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <Link to={ linkProfile }>
          <div
            className="cursor-pointer block px-5 py-3 text-sm text-gray-700 rounded-t-xl hover:bg-gray-100 hover:text-gray-900" role="menuitem"><i className="fa-regular fa-id-badge"></i> Profile
          </div>
        </Link>
        <div
          onClick={alertDecission.alertLogout}
          className="cursor-pointer block px-5 py-3 text-sm text-gray-700 hover:rounded-b-xl hover:bg-gray-100 hover:text-gray-900" role="menuitem"><i className="fa-solid fa-right-from-bracket"></i> Log out
        </div>
      </div>
    </div>
  )
}

export default ModalMenuUser
