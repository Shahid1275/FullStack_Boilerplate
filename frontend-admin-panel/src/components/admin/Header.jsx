import { FaBars, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { useState } from 'react'

export default function Header({ onMenuClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative text-gray-600 hover:text-gray-900">
          <FaBell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
          >
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
              A
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <a
                href="#profile"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FaUser className="mr-3" />
                Profile
              </a>
              <a
                href="#logout"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-3" />
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
