import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ComboboxComponent } from '../ui/combobox';
import { Modal } from '../ui/modal';
import { ResponsiveActionsMenu } from '../ui/responsive-actions-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { GoFilter } from 'react-icons/go';

const Incoming = ({ selectAll, handleSelectAllChange, selectedRows, handleCheckboxChange }) => {
  const [position, setPosition] = useState('bottom');
  const frameworks = [
    { value: 'Amox', label: 'Amox' },
    { value: 'ProteCee', label: 'Protec Cee' },
    { value: 'Highermin', label: 'Highermin' },
    { value: 'Raniclub', label: 'Raniclub' },
    { value: 'Anin', label: 'Anin' },
  ];

  const fruits = [
    { value: '100mg', label: '100mg' },
    { value: '200mg', label: '200mg' },
    { value: '300mg', label: '300mg' },
    { value: '400mg', label: '400mg' },
    { value: '500mg', label: '500mg' },
  ];

  const handleActionSelected = (action) => {
    console.log(`Selected action: ${action.label}`);
    // Add your action handling logic here
  };

  return (
    <div className="flex flex-col min-w-screen">
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
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
              <tr key={index} className="odd:bg-gray-50 even:bg-white">
                <td className="px-4 py-4 border border-gray-200">
                  <input type="checkbox" className="w-4 h-4" checked={selectedRows.includes(index)} onChange={() => handleCheckboxChange(index)} />
                </td>
                <td className="px-2 py-4 border border-gray-200">1</td>
                <td className="px-2 py-4 border border-gray-200">2</td>
                <td className="px-2 py-4 border border-gray-200">3</td>
                <td className="px-2 py-4 border border-gray-200">4</td>
                <td className="px-2 py-4 border border-gray-200">5</td>
                <td className="px-2 py-4 border border-gray-200">6</td>
                <td className="px-2 py-4 border border-gray-200">
                  <Modal title="View" description="Authentication here" label="Password" placeholder="Enter admin password" contentType="form_password">
                    <Button variant="outline">View Price</Button>
                  </Modal>
                </td>
                <td className="px-2 py-4 border border-gray-200">8</td>
                <td className="px-2 py-4 border border-gray-200">9</td>
                <td className="px-2 py-4 border border-gray-200">
                  <Modal title="View Scan copy" description="Image here" contentType="image">
                    <Button variant="outline">View Scan</Button>
                  </Modal>
                </td>
                <td className="px-2 py-4 border border-gray-200">11</td>
                <td className="px-2 py-4 border border-gray-200 text-center">
                  <ResponsiveActionsMenu onActionSelected={handleActionSelected} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Incoming;