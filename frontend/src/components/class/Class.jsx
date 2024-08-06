import React from 'react'
import Button from '../Button.jsx'

const Class = ({ selectAll, handleSelectAllChange, selectedRows, handleCheckboxChange }) => {
  return (
    <div className=''>
        <div className="flex flex-row gap-x-3 mb-3 w-full">
              <div className="flex flex-col gap-y-3 w-40">
                <select className="w-full h-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="" id="">
                  <option value="" disabled selected>Filter type</option>
                  <option value="incoming">Voucher Record</option>
                  <option value="outcoming">Class</option>
                </select>
              </div>
              <div className="flex flex-col gap-y-3 w-40">
              <select className="w-full h-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="" id="">
                  <option value="" disabled selected>Filter categories</option>
                  <option value="incoming">Voucher Record</option>
                  <option value="outcoming">Class</option>
                </select>
              </div>
            </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-200 border-collapse">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-4 py-3 border text-slate-500 border-gray-200">
                            <input type="checkbox" className="w-4 h-4" checked={selectAll} onChange={handleSelectAllChange} />
                        </th>
                    
                        <th scope="col" className="px-6 py-3 border text-slate-500 border-gray-200">Class</th>
                        <th scope="col" className="px-6 py-3 border text-slate-500 border-gray-200">SubClass</th>
                        <th scope="col" className="px-6 py-3 border text-slate-500 border-gray-200">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                        <tr key={index} className="odd:bg-gray-50 even:bg-white">
                            <td className="px-4 py-4 border border-gray-200">
                                <input type="checkbox" className="w-4 h-4" checked={selectedRows.includes(index)} onChange={() => handleCheckboxChange(index)} />
                            </td>
                            <td className="px-6 py-4 border border-gray-200">1</td>
                            <td className="px-6 py-4 border border-gray-200">2</td>
                            <td className="px-6 py-4 border border-gray-200"><Button text="Edit" onClick={() => {}} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Class