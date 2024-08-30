import PropTypes from 'prop-types';
import { FaEdit, FaTrash, FaDownload } from 'react-icons/fa';

export const TableRow = ({ tableRowData, onEditClick, onDeleteClick, onDownloadPDF }) => {
  const { _id, createdAt, updatedAt, __v, ...filteredData } = tableRowData;
  const tableRowValues = Object.values(filteredData);

  return (
    <tr className="border-b border-gray-300 hover:bg-gray-50">
      {tableRowValues.map((data, index) => (
        <td
          key={index}
          className="p-2 text-left text-gray-700 border-r border-gray-300 break-words"
        >
          {data}
        </td>
      ))}
      <td className="p-2 text-left flex gap-2">
        <button
          onClick={onEditClick}
          className="text-blue-500 hover:text-blue-700"
          aria-label="Edit"
        >
          <FaEdit />
        </button>
        <button
          onClick={onDeleteClick}
          className="text-red-500 hover:text-red-700"
          aria-label="Delete"
        >
          <FaTrash />
        </button>
        <button
          onClick={onDownloadPDF}
          className="text-teal-500 hover:text-teal-700"
          aria-label="Download PDF"
        >
          <FaDownload />
        </button>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  tableRowData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    __v: PropTypes.number,
    // Add other properties as needed
  }).isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onDownloadPDF: PropTypes.func.isRequired,
};
