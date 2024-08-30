import PropTypes from 'prop-types';

export const TableHead = ({ tableData }) => {
  return (
    <thead className="bg-gray-100">
      <tr className="border-b border-gray-300">
        {tableData?.map((head) => (
          <th
            key={head.name}
            className="p-2 text-left font-semibold text-gray-700 border-r border-gray-300"
          >
            {head.name}
          </th>
        ))}
        <th className="p-2 text-left font-semibold text-gray-700">Actions</th>
      </tr>
    </thead>
  );
};

TableHead.propTypes = {
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
