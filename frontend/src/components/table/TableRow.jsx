import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiEdit, FiTrash2, FiDownload, FiEye } from 'react-icons/fi';

export const TableRow = ({ 
  tableRowData, 
  onEditClick, 
  onDeleteClick, 
  onViewClick, 
  onStatusChange 
}) => {
  // Destructure relevant fields from the voucher data
  const { _id, createdAt, updatedAt, __v, ...filteredData } = tableRowData;
  const { no, payment_to, vn, amount, date, address, status } = filteredData;

  // Set the initial selected status to the current status of the voucher
  const [selectedStatus, setSelectedStatus] = useState(status || 'Pending');

  // Handle status change
  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus); // Update local state

    // Call the parent function to handle the status change logic
    onStatusChange(_id, newStatus);
  };

  return (
    <tr className="flex flex-col md:flex-row justify-between text-start text-sm">
      <td className="w-40 p-2 border-r border-b border-gray-300 text-left break-words">{no}</td>
      <td className="w-40 p-2 border-r border-b border-gray-300 text-left break-words">{payment_to}</td>
      <td className="w-40 p-2 border-r border-b border-gray-300 text-left break-words">{vn}</td>
      <td className="w-40 p-2 border-r border-b border-gray-300 text-left break-words">{amount}</td>
      <td className="w-40 p-2 border-r border-b border-gray-300 text-left break-words">{date}</td>
      <td className="w-40 p-2 border-r border-b border-gray-300 text-left break-words">{address}</td>
      <td className="w-40 p-2 border-r border-b border-gray-300 text-left break-words">
  <select 
    value={selectedStatus} 
    onChange={handleStatusChange} 
    className={`border border-gray-300 p-1 ${
      selectedStatus === 'Approve' ? 'bg-green-500' :
      selectedStatus === 'Pending' ? 'bg-yellow-500' :
      selectedStatus === 'Cancel' ? 'bg-red-500' :
      'bg-gray-200' // Default color
    }`}
  >
    <option value="Pending">Pending</option>
    <option value="Approve">Approve</option>
    <option value="Cancel">Cancel</option>
  </select>
</td>

      <td className="flex items-center space-x-3 border-r border-b border-gray-300">
        <button onClick={onViewClick} className="text-yellow-500 hover:underline">
          <FiEye className="inline-block" />
        </button>
        <button onClick={onEditClick} className="text-blue-500 hover:underline">
          <FiEdit className="inline-block" />
        </button>
        <button onClick={onDeleteClick} className="text-red-500 hover:underline">
          <FiTrash2 className="inline-block" />
        </button>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  tableRowData: PropTypes.object.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onViewClick: PropTypes.func.isRequired,  // Prop type for View button
  onStatusChange: PropTypes.func.isRequired, // Prop type for handling status changes
};
