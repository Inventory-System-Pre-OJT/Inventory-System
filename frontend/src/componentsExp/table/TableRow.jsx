//frontend/src/components/table/TableRow.jsx

import PropTypes from 'prop-types';
import { FiEdit, FiTrash2, FiDownload } from 'react-icons/fi';  // Importing icons from react-icons

export const TableRow = ({ tableRowData, onEditClick, onDeleteClick, onDownloadPDF }) => {
  const { _id, createdAt, updatedAt, __v, ...filteredData } = tableRowData;
  const tableRowValues = Object.values(filteredData);

  return (
    <tr className="flex flex-col md:flex-row justify-between text-start text-sm">
      {tableRowValues.map((data, index) => (
        <td key={index} className="w-40 p-2 border-r border-b border-gray-300 text-left">
          {data}
        </td>
      ))}
       <td className="flex items-center space-x-3 border-r border-b border-gray-300 "> {/* Added space-x-3 for gap between buttons */}
        <button onClick={onEditClick} className="text-blue-500 hover:underline">
          <FiEdit className="inline-block" />  {/* Edit Icon */}
        </button>
        <button onClick={onDeleteClick} className="text-red-500 hover:underline">
          <FiTrash2 className="inline-block" />  {/* Delete Icon */}
        </button>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  tableRowData: PropTypes.object.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onDownloadPDF: PropTypes.func.isRequired,  // Add prop type for onDownloadPDF
};
