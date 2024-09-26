import React from 'react';
import { Button } from '../ui/button.jsx';
import { ComboboxComponent } from '../ui/combobox.jsx';
import { Modal } from '../ui/modal.jsx';
import { ArrowTopRightIcon, Pencil2Icon, CheckIcon } from '@radix-ui/react-icons';
import { FetchStockData } from '@/functions/index.js';
import moment from 'moment';

const Outgoing = ({ selectAll, handleSelectAllChange, selectedRows, handleCheckboxChange }) => {
  const frameworks = [
    { value: "All", label: "All" },
    { value: "Amox", label: "Amox" },
    { value: "ProteCee", label: "Protec Cee" },
    { value: "Highermin", label: "Highermin" },
    { value: "Raniclub", label: "Raniclub" },
    { value: "Anin", label: "Anin" },
  ];
  
  const miligrams = [
    { value: "All", label: "All" },
    { value: "100mg", label: "100mg" },
    { value: "200mg", label: "200mg" },
    { value: "300mg", label: "300mg" },
    { value: "400mg", label: "400mg" },
    { value: "500mg", label: "500mg" },
  ];

  const handleEdit = (index) => {
    console.log(`Edit item at index ${index}`);
  };

  const handleView = (index) => {
    console.log(`View item at index ${index}`);
  };

  const ProfileForm = ({ className }) => (
    <form className={`grid items-start gap-4 ${className}`}>
      <div className="grid gap-2">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" defaultValue="example@example.com" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="username">Username</label>
        <input id="username" defaultValue="@username" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );

  const handleFunctionalities = [
    { 
      icon: Pencil2Icon, 
      label: "Edit", 
      action: handleEdit,
      title: "Edit",
      btnPlaceholder: "Save",
      contentType: "form_password",
      description: "Do you wish to edit this item?",
      content: <ProfileForm />
    },
    { 
      icon: CheckIcon, 
      label: "Confirm", 
      title: "Confirm", 
      contentType: "description",
      description: "Do you wish to mark this as complete?",
      btnPlaceholder: "Save", 
      content: <ProfileForm />
    },
  ];

  const { stockData } = FetchStockData();

  const stockElement = stockData?.data?.map((data, index) => {
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
        <td className="px-2 py-4 border border-gray-200 w-auto">{data.desc}</td>
        <td className="px-2 py-4 border border-gray-200 w-auto">{moment(data.date).format('MMM D, YYYY')}</td>
        <td className="px-2 py-4 border border-gray-200 text-nowrap w-auto">{data.qty} {data.metrics}</td>
        <td className="px-2 py-4 border border-gray-200 w-auto">{moment(data.expiration_date).fromNow()}</td>
        <td className="px-2 py-4 border border-gray-200 w-auto">{data.invoice_no}</td>
        <td className="px-2 py-4 border border-gray-200 w-auto">
          <Modal title="View" description="Authentication here" label="Password" placeholder="Enter admin password" contentType="form_password">
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
        <td className="px-2 py-4 border border-gray-200">
          <div className="flex flex-row gap-x-2">
            {handleFunctionalities.map((functionality, idx) => (
              <Modal
                key={idx}
                title={functionality.title}
                titleModal={functionality.title}
                btnPlaceholder={functionality.btnPlaceholder}
                contentType={functionality.contentType}
                description={functionality.description}
                content={functionality.content}
              >
                <Button key={idx} variant="outline" size="icon" onClick={() => functionality.action(index)}>
                  <functionality.icon />
                </Button>
              </Modal>
            ))}
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className='flex flex-col min-w-screen'>
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
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Status</th>
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

export default Outgoing;