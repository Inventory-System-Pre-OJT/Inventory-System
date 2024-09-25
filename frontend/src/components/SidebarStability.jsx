import React, { useState } from 'react';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { FaBuilding } from 'react-icons/fa6';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authUser.js';
import { BsBoxFill } from "react-icons/bs";
import { PiFlaskFill } from "react-icons/pi";
const SidebarStability = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { logout, isLoggingout } = useAuthStore();
  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate("/");
    }
  }

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <a href="javascript:void(0)" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Stability Quality Control</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="flex flex-col content-between h-full space-y-2 font-medium">
            <div className="flex flex-col justify-between h-full space-y-2">
                <div className="font-medium">
                    <li>
                      <Link to="/stability" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <PiFlaskFill className='className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-100 dark:group-hover:text-white"' />
                          <span className="flex-1 ms-3 text-start whitespace-nowrap">Stability</span>
                      </Link>
                    </li>
                </div>
                <div className="border-gray-200">
                    <li>
                        <a onClick={handleLogout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
                            <RiLogoutBoxLine className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ms-3 text-start whitespace-nowrap">Logout</span>
                        </a>
                    </li>
                </div>
            </div>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SidebarStability;
