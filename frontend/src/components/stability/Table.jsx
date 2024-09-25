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

const Table = ({ selectAll, handleSelectAllChange, selectedRows, handleCheckboxChange }) => {
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
  };

  return (
    <div className="flex flex-col min-w-screen">
      <div className="flex-grow overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-200 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Parameter</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">Specification</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">1st Testing</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">2nd Testing</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">3rd Testing</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">4th Testing</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">5th Testing</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">6th Testing</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">7th Testing</th>
              <th scope="col" className="px-2 py-3 border text-slate-500 border-gray-200 w-auto">8th Testing</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-4 border border-gray-200 text-black w-auto">initial</td>
            </tr>
            <tr>
              <td className="px-2 py-4 border border-gray-200 text-black w-auto">test</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;