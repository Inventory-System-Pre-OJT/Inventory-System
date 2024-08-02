import PropTypes from "prop-types";

export const TableHead = ({
	tableData
}) => {

  return (
    <tr className={` flex flex-col md:flex-row justify-between `}>
      {tableData?.map((head) => (
        <th key={head.name} className="table__head w-full text-[0.75rem] font-medium  uppercase text-light-gray-3  border-r-[0.002rem] border-light-gray-2 border-b-[0.002rem] ">
          {head.name}
        </th>
      ))}
    </tr>
  );
};

TableHead.propTypes = {
  tableData: PropTypes.array,
};
