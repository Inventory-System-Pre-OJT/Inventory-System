import React from 'react'
import Button from '../Button.jsx'

const VoucherRecord = ({ selectAll, handleSelectAllChange, selectedRows, handleCheckboxChange }) => {
  return (
    <div className=''>
        
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-200 border-collapse">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        
                        
                        <th scope="col" className="px-6 py-3 border text-slate-500 border-gray-200">No.</th>
                        <th scope="col" className="px-6 py-3 border text-slate-500 border-gray-200">Payment To</th>
                        <th scope="col" className="px-6 py-3 border text-slate-500 border-gray-200">Amount</th>
                        <th scope="col" className="px-6 py-3 border text-slate-500 border-gray-200">Address</th>
                        <th scope="col" className="px-6 py-3 border text-slate-500 border-gray-200">Description</th>
                        <th scope="col" className="px-6 py-3 border text-slate-500 border-gray-200">Bank</th>
                        <th scope="col" className="px-6 py-3 border text-slate-500 border-gray-200">Class</th>
                        <th scope="col" className="px-6 py-3 border text-slate-500 border-gray-200">SubClass</th>
                        <th scope="col" className="px-6 py-3 border text-slate-500 border-gray-200">Prepared By</th>
                        <th scope="col" className="px-6 py-3 border text-slate-500 border-gray-200">Accounting</th>
                        <th scope="col" className="px-6 py-3 border text-slate-500 border-gray-200">Approved By</th>
                        <th scope="col" className="px-6 py-3 border text-slate-500 border-gray-200">VN</th>
                        <th scope="col" className="px-6 py-3 border text-slate-500 border-gray-200">Date</th>
                        <th scope="col" className="px-6 py-3 border text-slate-500 border-gray-200">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                        <tr key={index} className="odd:bg-gray-50 even:bg-white">
                            
                            <td className="px-6 py-4 border border-gray-200">1</td>
                            <td className="px-6 py-4 border border-gray-200">2</td>
                            <td className="px-6 py-4 border border-gray-200">3</td>
                            <td className="px-6 py-4 border border-gray-200">4</td>
                            <td className="px-6 py-4 border border-gray-200">5</td>
                            <td className="px-6 py-4 border border-gray-200">6</td>
                            <td className="px-6 py-4 border border-gray-200">7</td>
                            <td className="px-6 py-4 border border-gray-200">8</td>
                            <td className="px-6 py-4 border border-gray-200">9</td>
                            <td className="px-6 py-4 border border-gray-200">10</td>
                            <td className="px-6 py-4 border border-gray-200">11</td>
                            <td className="px-6 py-4 border border-gray-200">12</td>
                            <td className="px-6 py-4 border border-gray-200">13</td>
                            <td className="px-6 py-4 border border-gray-200"><Button text="Edit" onClick={() => {}} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default VoucherRecord