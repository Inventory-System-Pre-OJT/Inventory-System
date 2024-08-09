import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { FaUserLock, FaUserMinus, FaUser } from "react-icons/fa";
import { Pencil2Icon, DotFilledIcon, PersonIcon } from '@radix-ui/react-icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Sidebar from "@/components/Sidebar";
import { SlKey } from "react-icons/sl";
import { PiTrash } from "react-icons/pi";
import { FiUserPlus } from "react-icons/fi";


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
  return (
    <div className="flex"><Sidebar />
     <div className="min-h-screen bg-gray-100 p-8 text-black flex-grow m-0 mt-14 w-full lg:ml-64">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">User management</h1>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
            <span className=" flex justify-center items-center"><FiUserPlus />&nbsp;Add</span>
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
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-400">
            <tr>
               <th scope="col" className=" text-slate-500 border-gray-200">
               <input type="checkbox" className="w-4 h-4" />
              </th>
              <th scope="col" className="text-zinc-900 w-4 h-4">User name</th>
              <th scope="col" className="text-zinc-900 w-4 h-4">Branch</th>
              <th scope="col" className="text-zinc-900 w-4 h-4">Access</th>
              <th scope="col" className="text-zinc-900 w-4 h-4">Last active</th>
              <th scope="col" className="text-zinc-900 w-4 h-4">Date added</th> 
              <th scope="col" className="text-zinc-900 w-4 h-4">Actions</th>
            </tr>
          </thead>
          <tbody class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-100 dark:text-gray-100"> 
            {users.map((user) => (
              <tr key={user.id}>
                <td className="text-zinc-900 " >
                <input type="checkbox" className="w-4 h-4" />
                </td>
                <td className="text-zinc-900">{user.name}</td>
                <td className="text-zinc-900">{user.branch}</td>
                <td className="text-zinc-900">
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
                <td className="text-zinc-900">{user.lastActive}</td>
                <td className="text-zinc-900">{user.dateAdded}</td>
                <td className="relative">
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
    </div>
   
  );
};
