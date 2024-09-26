import React, { useEffect, useState } from "react";
import { FiUserPlus, FiMoreVertical, FiEye, FiEyeOff } from "react-icons/fi";
import { FaUserLock, FaUserMinus, FaUser } from "react-icons/fa";
import { PersonIcon, Pencil2Icon } from "@radix-ui/react-icons"; // Use TrashIcon instead of PiTrash
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Sidebar from "@/components/Sidebar";
import { useNavigate, Link } from "react-router-dom";
import { ResponsiveActionsMenu } from "@/components/ui/responsive-actions-menu";
import { HiDotsVertical } from "react-icons/hi"
import { SlKey } from "react-icons/sl"
import { PiTrash } from "react-icons/pi"


const actions = [
  {
    value: "view",
    label: "View profile",
    icon: PersonIcon,
  },
  {
    value: "edit",
    label: "Edit",
    icon: Pencil2Icon,
  },
  {
    value: "changePermission",
    label: "Change permission",
    icon: SlKey,
  },
  {
    value: "delete",
    label: "Delete",
    icon: PiTrash,
  },
];


export const UserManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [accounts, setAccount] = useState([]);


  useEffect(() => {
    const fetchAccount = async () => {
      const getAccount = await axios.get("/api/v1/auth/getAccount");
      setAccount(getAccount.data);
    }
      fetchAccount();
  })

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

  const handleActionSelected = (action) => {
    switch (action) {
      case 'view':
        // Handle view profile action
        console.log("View profile action selected");
        break;
      case 'edit':
        // Handle edit profile action
        console.log("Edit action selected");
        break;
      case 'changePermission':
        // Handle change permission action
        console.log("Change permission action selected");
        break;
      case 'delete':
        // Handle delete user action
        console.log("Delete action selected");
        break;
      default:
        break;
    }
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
          <div className="flex-grow overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-200 border-collapse">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="text-slate-500 border border-gray-200 w-4 h-4">
                  <input type="checkbox" className="w-4 h-4" />
                </th>
                <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">User name</th>
                <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Name</th>
                <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Branch</th>
                <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Account Type</th>
                <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Date added</th> 
                <th scope="col" className="text-zinc-900 w-7 h-7">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-100 dark:text-gray-100">
            {accounts.map((account) => (
                <tr key={account.id}>
                  <td className="text-zinc-900 w-4 h-4">
                    <input type="checkbox" className="w-4 h-4" />
                  </td>
                  <td className="text-zinc-900 w-4 h-4">{account.username}</td>
                  <td className="text-zinc-900 w-4 h-4">{account.first_name}</td> 
                  <td className="text-zinc-900 w-4 h-4">{account.branch}</td>
                  <td className="text-zinc-900 w-4 h-4">{account.account_type}</td>
                  <td className="flex">
                    <ResponsiveActionsMenu actions={actions} onActionSelected={handleActionSelected} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
         
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
