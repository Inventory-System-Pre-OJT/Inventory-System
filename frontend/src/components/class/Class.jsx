import React from 'react'
import Button from '../Button.jsx'

const Class = ({ selectAll, handleSelectAllChange, selectedRows, handleCheckboxChange }) => {
  return (
    <div className=''>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-200 border-collapse">
                <tbody>
                    {[0, 1, 2, 3].map((index) => (
                        <tr key={index} className="odd:bg-gray-50 even:bg-white">
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