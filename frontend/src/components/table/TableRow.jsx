import PropTypes from 'prop-types';

export const TableRow = ({
	tableRowData
}) => {
  const { _id, createdAt, updatedAt, __v, ...filteredData } = tableRowData
  const tableRowValues = Object.values(filteredData);
  return (
    <tr
      className={`flex  flex-col  md:flex-row justify-between text-start text-sm    `}
    >
     {tableRowValues?.map((data, index) => (
        <td key={index} className=' border-r-[0.002rem] border-light-gray-2 border-b-[0.002rem]' >
          {data}
        </td>
      ))}
    </tr>
  );
};
TableRow.propTypes = {
  tableRowData: PropTypes.arrayOf(PropTypes.string).isRequired,
};