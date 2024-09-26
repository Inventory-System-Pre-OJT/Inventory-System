import React, { useState } from 'react'
import Sidebar from '../components/Sidebar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Modal } from '../components/ui/modal';
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { ComboboxComponent } from '../components/ui/combobox';

export const Audit = () => {
    const options = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
    ]
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex flex-col text-black flex-grow m-0 mt-14 w-full lg:ml-64">
                <section className="p-5">
                    <div className="rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center px-4 py-2">
                            <h1 className="text-2xl font-bold">Audit</h1>
                            <div className="flex items-center gap-2">
                                <input type="text" placeholder="Search" className="border border-gray-300 rounded-md px-4 py-2" />
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
                            </div>
                           
                        </div>
                        <div className="flex items-center ml-4">
                            <ComboboxComponent options={options} placeholder="Select Options..." search={false} />
                        </div>
                        <div className="overflow-x-auto rounded-t-lg">
                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                <thead className="text-left">
                                    <tr>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">User Name</th>
                                        <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Actions</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Description</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Transaction Number</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</th>

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">John Doe</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Checked Out Item</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Did transaction with receipt number 1234567890</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">1234567890</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                                    </tr>
                                    <tr>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Jane Doe</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Checked Out Item</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">04/11/1980</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Did transaction with receipt number 1234567890</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">1234567890</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                                    </tr>
                                    <tr>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Gary Barlow</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Checked Out Item</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Did transaction with receipt number 1234567890</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">1234567890</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                            <ol className="flex items-center justify-end gap-1 text-xs font-medium">
                                <li>
                                    <a
                                        href="#"
                                        className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 h-8 w-8"
                                    >
                                        <span className="sr-only">Prev Page</span>
                                        <ChevronLeftIcon className="w-3 h-3" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block w-8 h-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                                    >
                                        1
                                    </a>
                                </li>
                                <li className="block w-8 h-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
                                    2
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block w-8 h-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                                    >
                                        3
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block w-8 h-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                                    >
                                        4
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 h-8 w-8"
                                    >
                                        <span className="sr-only">Next Page</span>
                                        <ChevronRightIcon className="w-3 h-3" />
                                    </a>
                                </li>
                            </ol>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};