import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "./input"
import { Formik, Form } from 'formik';
import { TextField } from '../form/TextField';

export function Modal({ title, titleModal, description, label, contentType, placeholder, children, action, btnPlaceholder }) {
  const [activeTab, setActiveTab] = useState('stocks');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stocks':
        return (
          <ul>
            <li>Stock 1</li>
            <li>Stock 2</li>
            <li>Stock 3</li>
          </ul>
        );
      case 'revenue':
        return <p>Total Revenue: $10,000</p>;
      case 'quantity':
        return (
          <ul>
            <li>Stock 1: 100 units</li>
            <li>Stock 2: 200 units</li>
            <li>Stock 3: 150 units</li>
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{titleModal || title}</AlertDialogTitle>
          <AlertDialogDescription>
            {contentType === 'form' && (
              <Formik
              initialValues={{
                branchName: '',
                branchAddress: '',
              }}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);
                setSubmitting(false);
                handleModalClose();
              }}
            >
              <Form className="flex flex-col gap-y-3">
                <TextField
                  name="branchName"
                  type="text"
                  placeholder="Enter branch name"
                />
                <TextField
                  label="Branch Address"
                  name="branchAddress"
                  type="text"
                  placeholder="Enter branch address"
                />
                <button type="submit" className="btn btn-primary">Submit</button>
              </Form>
            </Formik>
            )}
            {contentType === 'form_password' && (
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordField">
                    {label}
                  </label>
                  <input
                    id="passwordField"
                    type="password"
                    className="bg-light_mode-primary p-2 px-1 border-b-[1px] focus:border-b-2 focus:border-green-500 focus:outline-none focus:ring-0 focus:ring-blue-500"
                    placeholder={placeholder}
                  />
                </div>
              </form>
            )}
            {contentType === 'image' && (
              <div>
                <img src="path_to_your_image" alt="Scan Copy" className="w-full h-auto" />
              </div>
            )}
            {contentType === 'description' && 
              <p className="text-sm text-gray-500">{description}</p>
            }
            {contentType === 'tab-content' && (
              <div>
                <div className="tabs gap-x-3">
                  <button className={`p-1 pr-3 border-b-2 tab ${activeTab === 'stocks' ? 'active border-b-blue-500 transition-all' : ''}`} onClick={() => setActiveTab('stocks')}>List of Stocks</button>
                  <button className={`p-1 pr-3 border-b-2 tab ${activeTab === 'revenue' ? 'active border-b-blue-500 transition-all' : ''}`} onClick={() => setActiveTab('revenue')}>Revenue</button>
                  <button className={`p-1 pr-3 border-b-2 tab ${activeTab === 'quantity' ? 'active border-b-blue-500 transition-all' : ''}`} onClick={() => setActiveTab('quantity')}>Stock Quantity</button>
                </div>
                <div className="tab-content">
                  {renderTabContent()}
                </div>
              </div>
            )}
            {contentType === 'content' && content}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {action && 
          <AlertDialogAction onClick={action}>
            {btnPlaceholder}
          </AlertDialogAction>
          }
          <AlertDialogAction>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}