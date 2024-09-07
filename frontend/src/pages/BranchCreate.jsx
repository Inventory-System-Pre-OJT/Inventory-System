import React, { useState } from 'react'
import Sidebar from '../components/Sidebar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Modal } from '../components/ui/modal';
import { PlusIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import { TextField } from "../components";
import { Form, Formik } from "formik";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LuBuilding } from "react-icons/lu";
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
export const BranchCreate = () => {
    const navigate = useNavigate();

    const branchDetails = [
        { id: 1, name: 'Branch Isabela', address: 'Ibigay mo na' },
        { id: 2, name: 'Branch Cabanatuan', address: 'Ibigay mo na' },
        { id: 3, name: 'Branch Casiguran', address: 'Ibigay mo na' },
    ]   
    const handleCreateBranch = () => {
        navigate('/branch/create');
      };

    return (
    <div className="flex">
        <Sidebar />
        <main className="flex flex-col  text-black flex-grow m-0 mt-14 w-full lg:ml-64">
            <div className="flex items-center">
                <div className="m-3 w-fit rounded-full border-2 border-gray-200 p-2">
                    <Link to="/branch">
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Create New Branch</h1>
                </div>
            </div>
           
            <div className="w-full flex justify-center border-gray-200 p-2">
                <div className="w-full p-5 border-2 rounded-md">
                    <div className="flex items-center gap-x-2">
                        <LuBuilding />
                        <h1 className="text-lg font-bold">Branch Information</h1>
                    </div>
                    <hr className="my-2" />
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
                            <div className="flex flex-col gap-y-5">
                                <div className="grid grid-cols-2 gap-x-2 w-full">
                                    <div className="flex flex-col">
                                        <Label className="text-lg font-bold">Branch Name</Label>
                                        <small className="text-sm text-gray-500">Name your branch name to easily identify it</small>
                                    </div>
                                    <div className="flex flex-col">
                                        <Input
                                        label="Branch Name"
                                        name="branchName"
                                        type="text"
                                        placeholder="Enter branch name"
                                        />
                                        <small className="text-sm text-gray-500">You can not change this later</small>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-2 w-full">
                                    <div className="flex flex-col">
                                        <Label className="text-lg font-bold">Branch Description</Label>
                                        <small className="text-sm text-gray-500">Describe your branch to easily identify it</small>
                                    </div>
                                    <div className="flex flex-col">
                                        <Input
                                        label="Branch Description"
                                        name="branchDescription"
                                        type="text"
                                        placeholder="Enter branch description"
                                        />
                                        <small className="text-sm text-gray-500">You can not change this later</small>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-end">
                                <Button type="submit">Create</Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </main>
    </div>
  )
}