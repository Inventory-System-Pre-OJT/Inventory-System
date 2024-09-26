import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ComboboxComponent } from '../components/ui/combobox';

export const Settings = () => {
  const [currency, setCurrency] = useState('');

  // Sample data
  const [currencies, setCurrencies] = useState([
    { value: 'PHP', label: 'PHP' },
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
  ]);

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleAddCurrency = () => {
    if (currency && !currencies.find(c => c.value === currency)) {
      setCurrencies([...currencies, { value: currency, label: currency }]);
      setCurrency('');
    }
  };

  const handleSaveSettings = () => {
    // Save settings logic here
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex flex-col text-black flex-grow m-0 mt-14 w-full lg:ml-64">
        <section className="p-5">
          <div className="flex flex-col gap-y-3">
            <div className="flex justify-between gap-x-3 items-center w-full">
              <h1 className="text-2xl font-bold">Settings</h1>
            </div>
            <div className="flex flex-col gap-y-3 mt-5">
              <h2 className="text-xl font-semibold">Configuration</h2>
              <div className="flex flex-col gap-y-3">
                <label className="font-medium">Add Currency</label>
                <div className="flex gap-x-3">
                  <Input
                    type="text"
                    value={currency}
                    onChange={handleCurrencyChange}
                    placeholder="Enter currency code (e.g., PHP)"
                    className="flex-grow"
                  />
                  <Button onClick={handleAddCurrency}>Add</Button>
                </div>
                <div className="mt-3">
                  <h3 className="font-medium">Available Currencies</h3>
                  <ul className="list-disc list-inside">
                    {currencies.map((c, index) => (
                      <li key={index}>{c.label}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <Button onClick={handleSaveSettings} className="mt-5">Save Settings</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};