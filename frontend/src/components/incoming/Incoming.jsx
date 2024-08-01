import React from 'react'
import Button from '../Button.jsx'

const Incoming = ({ selectAll, handleSelectAllChange, selectedRows, handleCheckboxChange }) => {
  return (
    <div className='flex flex-col min-w-screen'>
        <div className="flex flex-col sm:flex-row gap-3 mb-3 w-full">
              <div className="flex flex-col gap-y-3 w-full sm:w-1/2 lg:w-1/4">
                <select className="w-full h-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="" id="">
                  <option value="" disabled selected>Filter type</option>
                  <option value="incoming">Incoming</option>
                  <option value="outcoming">Outcoming</option>
                  <option value="balance">Balance</option>
                </select>
              </div>
              <div className="flex flex-col gap-y-3 w-full sm:w-1/2 lg:w-1/4">
              <select className="w-full h-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="" id="">
                  <option value="" disabled selected>Filter categories</option>
                  <option value="incoming">Incoming</option>
                  <option value="outcoming">Outcoming</option>
                  <option value="balance">Balance</option>
                </select>
            </div>
        </div>
        <div className="flex-grow overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-200 border-collapse">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-4 py-3 border text-slate-500 border-gray-200">
                            <input type="checkbox" className="w-4 h-4" checked={selectAll} onChange={handleSelectAllChange} />
                        </th>
                        <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Product</th>
                        <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Description</th>
                        <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Date</th>
                        <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Quantity</th>
                        <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Expiration</th>
                        <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Invoice No.</th>
                        <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Price</th>
                        <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Lot No.</th>
                        <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Received By</th>
                        <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Scan Copy</th>
                        <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Processed By</th>
                        <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                        <tr key={index} className="odd:bg-gray-50 even:bg-white">
                            <td className="px-4 py-4 border border-gray-200">
                                <input type="checkbox" className="w-4 h-4" checked={selectedRows.includes(index)} onChange={() => handleCheckboxChange(index)} />
                            </td>
                            <td className="px-2 py-4 border border-gray-200">1</td>
                            <td className="px-2 py-4 border border-gray-200">2</td>
                            <td className="px-2 py-4 border border-gray-200">3</td>
                            <td className="px-2 py-4 border border-gray-200">4</td>
                            <td className="px-2 py-4 border border-gray-200">5</td>
                            <td className="px-2 py-4 border border-gray-200">6</td>
                            <td className="px-2 py-4 border border-gray-200"><Button text="View" onClick={() => {}} /></td>
                            <td className="px-2 py-4 border border-gray-200">8</td>
                            <td className="px-2 py-4 border border-gray-200">9</td>
                            <td className="px-2 py-4 border border-gray-200"><Button text="View" onClick={() => {}} /></td>
                            <td className="px-2 py-4 border border-gray-200">11</td>
                            <td className="px-2 py-4 border border-gray-200">12</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Incoming