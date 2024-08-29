import React from 'react'
import Sidebar from '../components/Sidebar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Modal } from '../components/ui/modal';
import { PlusIcon } from "@radix-ui/react-icons";

export const Branch = () => {
    const branchDetails = [
        { id: 1, name: 'Branch Isabela', address: 'Ibigay mo na' },
        { id: 2, name: 'Branch Cabanatuan', address: 'Ibigay mo na' },
        { id: 3, name: 'Branch Casiguran', address: 'Ibigay mo na' },
    ]

    return (
    <div className="flex">
        <Sidebar />
        <main className="flex flex-col  text-black flex-grow m-0 mt-14 w-full lg:ml-64">
            <section className="p-5">
                <div className="flex flex-col gap-y-3">
                    <div className="flex justify-between gap-x-3 items-center w-full">
                        <h1 className="text-2xl font-bold">Select Branch Available</h1>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {branchDetails.map((branch) => (
                            <div className="flex-box-item">
                            <Modal 
                                title={`View ${branch.name} Details`} 
                                contentType="description"
                            >
                                <Card className='hover:bg-slate-100 cursor-pointer'>
                                    <CardHeader>
                                        <CardTitle>{branch.name}</CardTitle>
                                        <CardDescription>{branch.address}</CardDescription>
                                    </CardHeader>
                                </Card>
                            </Modal>
                            </div>
                            
                        ))}
                        <Card className='bg-green-100 hover:bg-green-300 cursor-pointer'>
                            <CardHeader >
                                <CardTitle className='flex items-center justify-between gap-x-2'>Create New Branch <PlusIcon className='w-4 h-4'/></CardTitle>
                                <CardDescription>Create a new branch to manage your business</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    </div>
  )
}