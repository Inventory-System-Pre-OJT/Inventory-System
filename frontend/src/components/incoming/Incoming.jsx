import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ComboboxComponent } from '../ui/combobox';
import { Modal } from '../ui/modal';
import { ResponsiveActionsMenu } from '../ui/responsive-actions-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { GoFilter } from 'react-icons/go';
import { FetchStockData } from '@/functions/index.js';
import { useStockStore } from '@/store/stockUser.js';
import moment from 'moment';
import { Pencil2Icon } from "@radix-ui/react-icons";

const Incoming = ({ selectAll, handleSelectAllChange, selectedRows, handleCheckboxChange }) => {
  const [position, setPosition] = useState('bottom');
  const frameworks = [
    { value: 'All', label: 'All' },
    { value: 'Amox', label: 'Amox' },
    { value: 'ProteCee', label: 'Protec Cee' },
    { value: 'Highermin', label: 'Highermin' },
    { value: 'Raniclub', label: 'Raniclub' },
    { value: 'Anin', label: 'Anin' },
  ];

  const miligrams = [
    { value: 'All', label: 'All' },
    { value: '100mg', label: '100mg' },
    { value: '200mg', label: '200mg' },
    { value: '300mg', label: '300mg' },
    { value: '400mg', label: '400mg' },
    { value: '500mg', label: '500mg' },
  ];

  const handleActionSelected = (action) => {
    console.log(`Selected action: ${action.label}`);
  };

  const { stockData } = FetchStockData();

  const stockElement = stockData?.data?.map((data) => {
    return (
      <tr key={data.id} className="odd:bg-gray-50 even:bg-white">
        <td className="px-4 py-4 border border-gray-200 w-auto">
          <input
            type="checkbox"
            className="w-4 h-4"
            checked={selectedRows.includes(data.id)}
            onChange={() => handleCheckboxChange(data.id)}
          />
        </td>
        <td className="px-2 py-4 border border-gray-200 text-black w-auto ">{data.product_name.charAt(0).toUpperCase() + data.product_name.slice(1).toLowerCase()}</td>
        <td className="px-2 py-4 border border-gray-200 w-auto">{data.desc.charAt(0).toUpperCase() + data.desc.slice(1).toLowerCase()}</td>
        <td className="px-2 py-4 border border-gray-200 w-auto">{moment(data.date).format('MMM D,YYYY')}</td>
        <td className="px-2 py-4 border border-gray-200 text-nowrap w-auto">{data.qty} {data.metrics}</td>
        <td className="px-2 py-4 border border-gray-200 w-auto">{moment(data.expiration_date).fromNow()}</td>
        <td className="px-2 py-4 border border-gray-200 w-auto">{data.invoice_no}</td>
        <td className="px-2 py-4 border border-gray-200 w-auto">
          <Modal 
            title="View Price" 
            description="Please enter the admin password to view the price."
            label="Password" 
            placeholder="Enter admin password" 
            contentType="form_password"
            onSubmit={(password) => {
              if (password === 'validAdminPassword') { // Replace with actual validation logic
                return (
                  <div>
                    <p>Price: ${data.price}</p>
                  </div>
                );
              } else {
                return <p>Invalid password. Price cannot be shown.</p>;
              }
            }}
          >
            <Button variant="outline">View Price</Button>
          </Modal>
        </td>
        <td className="px-2 py-4 border border-gray-200 w-auto">{data.lot_no}</td>
        <td className="px-2 py-4 border border-gray-200 w-auto">{data.receiver}</td>
        <td className="px-2 py-4 border border-gray-200 w-auto">
          <Modal title="View Scan copy" description="Image here" contentType="image">
            <Button variant="outline">View Scan</Button>
          </Modal>
        </td>
        <td className="px-2 py-4 border border-gray-200 w-auto">{data.done_by}</td>
        <td className="px-2 py-4 border border-gray-200 w-auto">{moment(data.created_at).format('MMM D, YYYY, h:mm:a')}</td>
        <td className="px-2 py-4 border border-gray-200 text-center w-auto">
          <ResponsiveActionsMenu onActionSelected={handleActionSelected} />
        </td>
      </tr>
    )
  })

  return (
    <div className="flex flex-col min-w-screen">
      <div className="flex flex-col sm:flex-row gap-3 lg:gap-1 mb-3 w-full">
        <div className="flex flex-col gap-y-3 w-full sm:w-1/2 lg:w-1/4">
          <ComboboxComponent options={frameworks} placeholder="Select Product..." />
        </div>
        <div className="flex flex-col gap-y-3 w-full sm:w-1/2 lg:w-1/4">
          <ComboboxComponent options={miligrams} placeholder="Select Miligrams..." />
        </div>
      </div>
      <div className="flex-grow overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-200 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 border text-slate-500 border-gray-200 w-12">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Product</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Description</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Date</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Quantity</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Expiration</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Invoice No.</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Price</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Lot No.</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Received By</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Scan Copy</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Processed By</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Process Date</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Actions</th>
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