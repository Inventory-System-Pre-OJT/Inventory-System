import React from 'react';
import { Button } from '../ui/button.jsx';
import { ComboboxComponent } from '../ui/combobox.jsx';
import { Modal } from '../ui/modal.jsx';
import { ArrowTopRightIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { FetchStockData } from '@/functions/index.js';
import { useStockStore } from '@/store/stockUser.js';
import moment from 'moment';

const Incoming = ({ selectAll, handleSelectAllChange, selectedRows, handleCheckboxChange }) => {

  const { stockData } = FetchStockData()
  const { isGetting, getStock } = useStockStore();


  const frameworks = [
    { value: "Amox", label: "Amox" },
    { value: "ProteCee", label: "Protec Cee" },
    { value: "Highermin", label: "Highermin" },
    { value: "Raniclub", label: "Raniclub" },
    { value: "Anin", label: "Anin" },
  ];

  const fruits = [
    { value: "100mg", label: "100mg" },
    { value: "200mg", label: "200mg" },
    { value: "300mg", label: "300mg" },
    { value: "400mg", label: "400mg" },
    { value: "500mg", label: "500mg" },
  ];

  const handleEdit = (index) => {
    console.log(`Edit item at index ${index}`);
    // Add your edit logic here
  };
  const handleFunctionalities = [
    { icon: Pencil2Icon, label: "Edit", action: handleEdit },
    { icon: ArrowTopRightIcon, label: "Confirm", contentType: "description", title: "Confirmation" },
  ];


  const stockElement = stockData?.data?.map((data , index) => {
    return (
      <tr key={index} className="odd:bg-gray-50 even:bg-white">
  <td className="px-4 py-4 border border-gray-200">
    <input type="checkbox" className="w-4 h-4" checked={selectedRows.includes(index)} onChange={() => handleCheckboxChange(index)} />
  </td>
  <td className="px-2 py-4 border border-gray-200 text-black">{data.product_name}</td>
  <td className="px-2 py-4 border border-gray-200">{data.desc}</td>
  <td className="px-2 py-4 border border-gray-200">{moment(data.date).format('MMM D,YYYY')}</td>
  <td className="px-2 py-4 border border-gray-200">{data.qty}</td>
  <td className="px-2 py-4 border border-gray-200">{moment(data.expiration_date).fromNow()}</td>
  <td className="px-2 py-4 border border-gray-200">{data.invoice_no}</td>
  <td className="px-2 py-4 border border-gray-200">
    <Modal title="View" description="Authentication here" label="Password" placeholder="Enter admin password" contentType="form_password">
      <Button variant="outline">View Price</Button>
    </Modal>
  </td>
  <td className="px-2 py-4 border border-gray-200">{data.lot_no}</td>
  <td className="px-2 py-4 border border-gray-200">{data.receiver}</td>
  <td className="px-2 py-4 border border-gray-200">
    <Modal title="View Scan copy" description="Image here" contentType="image">
      <Button variant="outline">View Scan</Button>
    </Modal>
  </td>
  <td className="px-2 py-4 border border-gray-200">{data.done_by}</td>
  <td className="px-2 py-4 border border-gray-200">
    <div className="flex flex-row gap-x-2">
      {handleFunctionalities.map((functionality, idx) => (
        functionality.label === "Edit" ? (
          <Button key={idx} variant="outline" size="icon" onClick={() => functionality.action(index)}>
            <functionality.icon />
          </Button>
        ) : (
          <Modal
            key={idx}
            title={`${functionality.title}`}
            titleModal={`${functionality.title}`}
            contentType={functionality.contentType}
            description="Are you sure to move this item to outgoing?"
            label={functionality.label}
            placeholder={`Enter ${functionality.label.toLowerCase()} details`}
          >
            <Button variant="outline" size="icon">
              <functionality.icon />
            </Button>
          </Modal>
        )
      ))}
    </div>
  </td>
</tr>

    )
  })

  
  

  

  return (
    <div className='flex flex-col min-w-screen'>
      <div className="flex flex-col sm:flex-row gap-3 lg:gap-1 mb-3 w-full">
        <div className="flex flex-col gap-y-3 w-full sm:w-1/2 lg:w-1/4">
          <ComboboxComponent options={frameworks} placeholder="Select Product..." />
        </div>
        <div className="flex flex-col gap-y-3 w-full sm:w-1/2 lg:w-1/4">
          <ComboboxComponent options={fruits} placeholder="Select Miligrams..." />
        </div>
      </div>
      <div className="flex-grow overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-200 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 border text-slate-500 border-gray-200">
                <input type="checkbox" className="w-4 h-4" checked={selectAll} onChange={handleSelectAllChange} />
              </th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Product</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Description</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Date</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Quantity</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Expiration</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Invoice No.</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Price</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Lot No.</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Received By</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Scan Copy</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Processed By</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stockElement}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Incoming;