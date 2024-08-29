import React, { useState } from "react";
import { FiUserPlus, FiMoreVertical, FiEye, FiEyeOff } from "react-icons/fi";
import { FaUserLock, FaUserMinus, FaUser } from "react-icons/fa";
import { Pencil2Icon, DotFilledIcon, PersonIcon } from '@radix-ui/react-icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Sidebar from "@/components/Sidebar";
import { SlKey } from "react-icons/sl";
import { PiTrash } from "react-icons/pi";
import { useNavigate, Link } from "react-router-dom";

const users = [
  {
    id: 1,
    name: "John Doe",
    branch: "Tarlac",
    access: "Admin",
    lastActive: "Now",
    dateAdded: "Aug 13, 2023",
  },
  {
    id: 2,
    name: "Ericka Jones",
    branch: "Tarlac",
    access: ["Employee", "Cashier"],
    lastActive: "Yesterday, 6:00pm",
    dateAdded: "Aug 13, 2023",
  },
];

export const UserManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAddUser = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Placeholder function to validate unique password
    validateUniquePassword(e.target.value);
  };

  const validateUniquePassword = (password) => {
    // Implement password uniqueness check here
    // Example: Check against a list of existing passwords
    console.log("Validating password:", password);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-screen bg-gray-100 p-8 text-black flex-grow m-0 mt-14 w-full lg:ml-64">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">User management</h1>
            <button 
              onClick={handleAddUser}
              className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <span className="flex justify-center items-center">
                <FiUserPlus />&nbsp;Add
              </span>
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg">
              All users <span className="font-bold text-green-500">44</span>
            </span>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-lg px-2 py-1">
                <option>Filters</option>
              </select>
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-lg px-2 py-1"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-400">
              <tr>
                <th scope="col" className="text-slate-500 border-gray-200 w-4 h-4">
                  <input type="checkbox" className="w-4 h-4" />
                </th>
                <th scope="col" className="text-zinc-900 w-7 h-7">User name</th>
                <th scope="col" className="text-zinc-900 w-7 h-7">Branch</th>
                <th scope="col" className="text-zinc-900 w-7 h-7">Access</th>
                <th scope="col" className="text-zinc-900 w-7 h-7">Last active</th>
                <th scope="col" className="text-zinc-900 w-7 h-7">Date added</th> 
                <th scope="col" className="text-zinc-900 w-7 h-7"></th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-100 dark:text-gray-100">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="text-zinc-900 w-4 h-4">
                    <input type="checkbox" className="w-4 h-4" />
                  </td>
                  <td className="text-zinc-900 w-4 h-4">{user.name}</td>
                  <td className="text-zinc-900 w-4 h-4">{user.branch}</td>
                  <td className="text-zinc-900 w-4 h-4">
                    {Array.isArray(user.access) ? (
                      user.access.map((role, index) => (
                        <span
                          key={index}
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            role === "Admin"
                              ? "bg-green-200 text-green-700"
                              : "bg-blue-200 text-blue-700"
                          } mr-2`}
                        >
                          {role}
                        </span>
                      ))
                    ) : (
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                          user.access === "Admin"
                            ? "bg-green-200 text-green-700"
                            : "bg-blue-200 text-blue-700"
                        }`}
                      >
                        {user.access}
                      </span>
                    )}
                  </td>
                  <td className="text-zinc-900 w-4 h-4">{user.lastActive}</td>
                  <td className="text-zinc-900 w-4 h-4">{user.dateAdded}</td>
                  <td className="flex">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                          <FiMoreVertical />
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <DropdownMenu.Item className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                          <PersonIcon className="mr-2" /> View profile
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                          <Pencil2Icon className="mr-2" /> Edit profile
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                          <SlKey className="mr-2" /> Change permission
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="flex items-center w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                          <PiTrash className="mr-2" /> Delete user
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add User</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Employee Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                  type="button"
                  onClick={handlePasswordVisibilityToggle}
                  className="absolute inset-y-0 right-1 top-6 pr-3"
                >
                  {passwordVisible ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <div className="mb-4 flex justify-between space-x-4">
                <div className="w-1/2">
                  <label htmlFor="access" className="block text-sm font-medium text-gray-700">Access</label>
                  <select
                    id="access"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    <option>Staff</option>
                    <option>Admin</option>
                    <option>Productions</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
                  <select
                    id="branch"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    <option>Main</option>
                    <option>South</option>
                    <option>West</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
