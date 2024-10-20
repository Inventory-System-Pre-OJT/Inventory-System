//frontend/src/components/table/TableHead.jsx

import PropTypes from "prop-types";

export const TableHead = () => {
  // Define the table head data with the "Address" field included
  const tableHeadData = [
    { name: "No" },
    { name: "Payment To" },
    { name: "VN" },
    { name: "Amount" },
    { name: "Date" },
    { name: "Address" },
    { name: "Status" },
  ];

  return (
    <thead>
      <tr className="flex flex-col md:flex-row justify-between">
        {tableHeadData.map((head) => (
          <th key={head.name} className="w-40 p-2 border-t border-b border-gray-300 text-center break-words">
            {head.name}
          </th>
        ))}
        <th className="w-40 p-2 border-t border-b border-gray-300 text-center break-words">Action</th>
      </tr>
    </thead>
  );
};

TableHead.propTypes = {
  tableData: PropTypes.array,
};
