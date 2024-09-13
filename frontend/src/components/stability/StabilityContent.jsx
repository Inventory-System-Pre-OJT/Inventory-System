import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { FiDollarSign, FiTruck, FiCreditCard, FiShoppingCart } from "react-icons/fi";
import { BsBoxArrowInDownLeft, BsBoxArrowInUpRight } from "react-icons/bs";
import { Separator } from "@/components/ui/separator"
import { GoFilter } from "react-icons/go";
import { Button } from "@/components/ui/button"
import { FiPlus } from "react-icons/fi";
import Table from '../../components/stability/Table';
import { Formik, Form, Field } from 'formik';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function StabilityContent() {
  const [position, setPosition] = useState("bottom")
  const [selectedContent, setSelectedContent] = useState(null);
  const [activeTab, setActiveTab] = useState('stocks');
  const [currentStep, setCurrentStep] = useState(1);

  const handleContentClick = (content) => {
    setSelectedContent(content);
  };

  const contents = [
    {
      title: "Protect Zinc",
      lotNo: "LotNo. 1234567890",
      type: "Drug",
      stock: "1,200kg",
      price: "$180.00",
      wholesale: "$100.00 - $170.00",
      total: "$280.00",
      status: "DONE",
      history: [
        { date: '01/23/24', action: 'Added product' },
        { date: '01/25/24', action: 'Product released' },
        { date: '01/29/24', action: 'Product Delivered' },
        { date: '01/29/24', action: 'Product Delivered' },
        { date: '01/29/24', action: 'Product Delivered', status: "DONE" },
      ]
    },
    {
      title: "Sodium",
      lotNo: "LotNo. 1234567890",
      type: "Drug",
      stock: "1,200kg",
      price: "$180.00",
      wholesale: "$100.00 - $170.00",
      total: "$280.00",
      status: "DONE",
      history: [
        { date: '01/23/24', action: 'Added product' },
        { date: '01/25/24', action: 'Product released' },
        { date: '01/29/24', action: 'Product Delivered', status: "DONE" },
      ]
    },

  ]
  const renderTabContent = () => {
    switch (activeTab) {
      case 'stocks':
        return (
          <ul className='mt-2'>
            <li>
              <Card className='hover:bg-slate-100 cursor-pointer p-1 my-3'>
                <CardHeader className="p-3">
                  <CardTitle>Meth</CardTitle>
                  <CardDescription>Stock 1</CardDescription>
                </CardHeader>
              </Card>
            </li>
            <li>
              <Card className='hover:bg-slate-100 cursor-pointer p-1'>
                <CardHeader className="p-3">
                  <CardTitle>Meth</CardTitle>
                  <CardDescription>Stock 1</CardDescription>
                </CardHeader>
              </Card>
            </li>
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
    <div className="space-y-5 ">
      {/* <div className="grid grid-cols-5 gap-3">
        {stats.map((stat, index) => (
          <Card key={index} className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-500">{stat.title}</span>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl text-start font-bold">{stat.value}</div>
              <div className={`text-xs text-start ${stat.changeColor}`}>
                {stat.change} vs last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div> */}
      <div className="flex justify-between items-center">
        <div className="mt-5">
          <div className="flex flex-col items-start">
            <h3 className="font-bold text-start">All products <span className="text-xs text-gray-500">34</span></h3>
            <p className="text-xs text-gray-500">Showing 1-10 of {contents.length}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">Filters&nbsp;<GoFilter className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter your needs</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* Item start */}
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="asc">Ascending name</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="desc">Descending name</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="asc_expiration">Ascending Expiration Date</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="desc_expiration">Descending Expiration Date</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              {/* End item */}
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="add" size="sm"><FiPlus className="h-4 w-4" />&nbsp;Add</Button>
            </DialogTrigger>
            <DialogContent className="w-auto max-w-full overflow-x-auto">
              <DialogHeader>
                <DialogTitle>Add Product</DialogTitle>
              </DialogHeader>
              <Separator />
              <Formik
                initialValues={{
                  productName: '',
                  lotNumber: '',
                  productType: '',
                  mfgDate: '',
                  expirationDate: '',
                  initialQuantity: '',
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
                      <li className={`flex items-center ${currentStep === 1 ? 'text-blue-600' : 'text-gray-500'} space-x-2.5 rtl:space-x-reverse`}>
                        <span className={`flex items-center justify-center w-8 h-8 border ${currentStep === 1 ? 'border-blue-600' : 'border-gray-500'} rounded-full shrink-0`}>
                          1
                        </span>
                        <span>
                          <h3 className="font-medium leading-tight">Product Info</h3>
                          <p className="text-sm">Add product info here.</p>
                        </span>
                      </li>
                      <li className={`flex items-center ${currentStep === 2 ? 'text-blue-600' : 'text-gray-500'} space-x-2.5 rtl:space-x-reverse`}>
                        <span className={`flex items-center justify-center w-8 h-8 border ${currentStep === 2 ? 'border-blue-600' : 'border-gray-500'} rounded-full shrink-0`}>
                          2
                        </span>
                        <span>
                          <h3 className="font-medium leading-tight">Parameter Info</h3>
                          <p className="text-sm">Add product parameters here.</p>
                        </span>
                      </li>
                      <li className={`flex items-center ${currentStep === 3 ? 'text-blue-600' : 'text-gray-500'} space-x-2.5 rtl:space-x-reverse`}>
                        <span className={`flex items-center justify-center w-8 h-8 border ${currentStep === 3 ? 'border-blue-600' : 'border-gray-500'} rounded-full shrink-0`}>
                          3
                        </span>
                        <span>
                          <h3 className="font-medium leading-tight">Additional Info</h3>
                          <p className="text-sm">Additional information about the product.</p>
                        </span>
                      </li>
                    </ol>
                    {currentStep === 1 && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
                          <Field type="text" name="productName" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter a Product Name"
                          />
                        </div>
                        <div>
                          <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">Brand Name</label>
                          <Field type="text" name="brandName" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter a Brand Name"
                          />
                        </div>
                        <div>
                          <label htmlFor="lotNumber" className="block text-sm font-medium text-gray-700">Lot Number</label>
                          <Field type="text" name="lotNumber" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter a Lot Number"
                          />
                        </div>
                        <div>
                          <label htmlFor="productType" className="block text-sm font-medium text-gray-700">Product Type</label>
                          <Field as="select" name="productType" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            <option value="">Select a type</option>
                            <option value="Drug">Drug</option>
                            <option value="Supplement">Supplement</option>
                            <option value="Other">Other</option>
                          </Field>
                        </div>
                        <div>
                          <label htmlFor="mfgDate" className="block text-sm font-medium text-gray-700">Manufacturing Date</label>
                          <Field type="date" name="mfgDate" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter a Manufacturing Date"
                          />
                        </div>
                        <div>
                          <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Expiration Date</label>
                          <Field type="date" name="expirationDate" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter an Expiration Date"
                          />
                        </div>
                        <div>
                          <label htmlFor="initialQuantity" className="block text-sm font-medium text-gray-700">Initial Quantity</label>
                          <Field type="number" name="initialQuantity" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter an Initial Quantity"
                          />
                        </div>
                      </div>
                    )}
                    {currentStep === 2 && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                          <Field as="textarea" name="description" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter a description"
                          />
                        </div>
                        <div>
                          <label htmlFor="identification" className="block text-sm font-medium text-gray-700">Identification</label>
                          <Field type="text" name="identification" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter identification details"
                          />
                        </div>
                        <div>
                          <label htmlFor="weightPerCapsule" className="block text-sm font-medium text-gray-700">Weight per Capsule (mg)</label>
                          <Field type="number" name="weightPerCapsule" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter weight per capsule"
                          />
                        </div>
                        <div>
                          <label htmlFor="disintegrationTime" className="block text-sm font-medium text-gray-700">Disintegration Time (minutes)</label>
                          <Field type="number" name="disintegrationTime" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter disintegration time"
                          />
                        </div>
                        <div>
                          <label htmlFor="moistureContent" className="block text-sm font-medium text-gray-700">Moisture Content (%)</label>
                          <Field type="number" name="moistureContent" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter moisture content"
                          />
                        </div>
                        <div>
                          <label htmlFor="uniformityOfDosageUnit" className="block text-sm font-medium text-gray-700">Uniformity of Dosage Unit</label>
                          <Field type="text" name="uniformityOfDosageUnit" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter uniformity of dosage unit"
                          />
                        </div>
                      </div>
                    )}
                    {currentStep === 3 && (
                       <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <h3 className="text-lg font-semibold mb-2">Microbal Limits</h3>
                        </div>
                        <div>
                          <label htmlFor="totalBacteriaCont" className="block text-sm font-medium text-gray-700">Total Bacteria Count</label>
                          <Field type="text" name="totalBacteriaCont" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter total bacteria count"
                          />
                        </div>
                        <div>
                          <label htmlFor="moldsYeastCount" className="block text-sm font-medium text-gray-700">Molds & Yeast Count</label>
                          <Field type="text" name="moldsYeastCount" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter molds & yeast count"
                          />
                        </div>
                        <div>
                          <label htmlFor="salmonellaSpecies" className="block text-sm font-medium text-gray-700">Salmonella Species</label>
                          <Field type="text" name="salmonellaSpecies" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter salmonella species"
                          />
                        </div>
                        <div>
                          <label htmlFor="escherichaColi" className="block text-sm font-medium text-gray-700">Eschericha Coli</label>
                          <Field type="text" name="escherichaColi" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter eschericha coli"
                          />
                        </div>
                        <div>
                          <label htmlFor="staphylococcusAureus" className="block text-sm font-medium text-gray-700">Staphylococcus Aureus</label>
                          <Field type="text" name="staphylococcusAureus" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter staphylococcus aureus"
                          />
                        </div>
                        <div className="col-span-2 mt-4">
                          <h3 className="text-lg font-semibold mb-2">Assay</h3>
                        </div>
                        <div>
                          <label htmlFor="sodiumAscorbate" className="block text-sm font-medium text-gray-700">Sodium Ascorbate</label>
                          <Field type="text" name="sodiumAscorbate" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter sodium ascorbate"
                          />
                        </div>
                        <div>
                          <label htmlFor="zincSulfate" className="block text-sm font-medium text-gray-700">Zinc Sulfate</label>
                          <Field type="text" name="zincSulfate" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter zinc sulfate"
                          />
                        </div>
                        <div className="col-span-2">
                          <label htmlFor="conclusionRemarks" className="block text-sm font-medium text-gray-700">Conclusion & Remarks</label>
                          <Field as="textarea" name="conclusionRemarks" className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter conclusion and remarks"
                            rows={4}
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between gap-3">
                      {currentStep > 1 && (
                        <Button type="button" variant="outline" onClick={() => setCurrentStep(currentStep - 1)} className="w-full border-primary">
                          Previous
                        </Button>
                      )}
                      {currentStep < 3 && (
                        <Button type="button" onClick={() => setCurrentStep(currentStep + 1)} className="w-full">
                          Next
                        </Button>
                      )}
                      {currentStep === 3 && (
                        <Button type="submit" disabled={isSubmitting} className="w-full">
                          Submit
                        </Button>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div>
        {contents.map((content, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Card className="border border-gray-200 mb-2 bg-white shadow-sm cursor-pointer" onClick={() => handleContentClick(content)}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-start">{content.title}</h3>
                    <p className="text-xs text-gray-500">{content.lotNo} • {content.type}</p>
                  </div>
                  <div className="flex gap-4">
                    {/* <div>
                      <p className="text-xs text-gray-500">RETAIL PRICE</p>
                      <p className="font-semibold">{content.price}</p>
                    </div>
                    <Separator orientation="vertical" className="h-auto" />
                    <div>
                      <p className="text-xs text-gray-500">TOTAL</p>
                      <p className="font-semibold">{content.total}</p>
                    </div>
                    <Separator orientation="vertical" className="h-auto" /> */}
                    <div className="mr-2">
                      <p className="text-xs text-gray-500">STATUS</p>
                      <p className={`font-semibold ${content.status === "DONE" ? "text-green-500" :
                          content.status === "PENDING" ? "text-yellow-500" :
                            "text-red-500"
                        }`}>{content.status}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="w-auto max-w-full overflow-x-auto">
              <DialogHeader>
                <DialogTitle>{content.title} Stability Data</DialogTitle>
                <DialogDescription>
                  {content.lotNo} • {content.type}
                </DialogDescription>
              </DialogHeader>
              <div className="relative">
                <Table />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>


    </div>
  )
}