//frontend/src/components/table/TableHead.jsx
import PropTypes from "prop-types";

export const TableHead = ({
	tableData
}) => {

  return (
    <tr className={` flex flex-col md:flex-row justify-between `}>
      {tableData?.map((head) => (
        <th key={head.name} className="w-40 p-2 border-t border-b border-gray-300 text-center break-words">
          {head.name}
        </th>
      ))}
    </tr>
  );
};

TableHead.propTypes = {
  tableData: PropTypes.array,
};
