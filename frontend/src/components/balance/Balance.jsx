import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FiDollarSign, FiTruck, FiCreditCard, FiShoppingCart } from "react-icons/fi";
import { BsBoxArrowInDownLeft, BsBoxArrowInUpRight } from "react-icons/bs";
import { Separator } from "@/components/ui/separator"
import { GoFilter } from "react-icons/go";
import { Button } from "@/components/ui/button"
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

function Balance() {
  const [position, setPosition] = useState("bottom")
  const [selectedContent, setSelectedContent] = useState(null);

  const handleContentClick = (content) => {
    setSelectedContent(content);
  };

  const stats = [
    { title: "TOTAL DELIVERED", icon: FiTruck, value: "300,900", change: "-5%", changeColor: "text-red-500" },
    { title: "TOTAL INCOMING", icon: BsBoxArrowInDownLeft, value: "100,900", change: "+10%", changeColor: "text-green-500" },
    { title: "TOTAL OUTCOMING", icon: BsBoxArrowInUpRight, value: "258,900", change: "+5%", changeColor: "text-green-500" },
    { title: "TOTAL SALES", icon: FiShoppingCart, value: "$258,900.00", change: "+5%", changeColor: "text-green-500" },
    { title: "TOTAL REVENUE", icon: FiDollarSign, value: "$258,900.00", change: "-2%", changeColor: "text-red-500" },
  ]
  const contents = [
    { title: "Sodium", 
      category: "Active Materials", 
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
    { title: "Sodium", 
      category: "Active Materials", 
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
    
  ]
  

  return (
    <div className="space-y-5 ">
      <div className="grid grid-cols-5 gap-3">
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
      </div>
<div className="flex justify-between items-center">
    <div className="mt-5">
      <div className="flex flex-col items-start">
        <h3 className="font-bold text-start">All products <span className="text-xs text-gray-500">34</span></h3>
        <p className="text-xs text-gray-500">Showing 1-10 of 100</p>
      </div>
    </div>
    <div className="flex justify-end">
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
            </DropdownMenuRadioGroup>
            {/* End item */}
            {/* Custom start */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Custom</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            {/* End custom */}
          </DropdownMenuContent>
        </DropdownMenu>
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
                    <p className="text-xs text-gray-500">{content.category} • {content.type} • {content.stock} in stocks</p>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-xs text-gray-500">RETAIL PRICE</p>
                      <p className="font-semibold">{content.price}</p>
                    </div>
                    <Separator orientation="vertical" className="h-auto" />
                    <div>
                      <p className="text-xs text-gray-500">WHOLESALE PRICE</p>
                      <p className="font-semibold">{content.wholesale}</p>
                    </div>
                    <Separator orientation="vertical" className="h-auto" />
                    <div>
                      <p className="text-xs text-gray-500">TOTAL</p>
                      <p className="font-semibold">{content.total}</p>
                    </div>
                    <Separator orientation="vertical" className="h-auto" />
                    <div className="mr-2">
                      <p className="text-xs text-gray-500">STATUS</p>
                      <p className={`font-semibold ${
                        content.status === "DONE" ? "text-green-500" : 
                        content.status === "PENDING" ? "text-yellow-500" : 
                        "text-red-500"
                      }`}>{content.status}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Product History</DialogTitle>
                <DialogDescription>
                  {content.category} • {content.type} • {content.stock} in stocks
                </DialogDescription>
              </DialogHeader>
              <div className="relative">
              {/* <div className="absolute left-4 top-5 bottom-0 w-0.5 bg-gray-200"></div> */}
              {content.history && content.history.map((entry, index) => (
                <div key={index} className="mb-2 pl-10 relative">
                  {index === 0 ? (
                    <div className="absolute left-4 top-4 w-4 h-[3em] border-l-2 border-t-2 border-gray-200 rounded-tl-lg"></div>
                  
                  ) : entry.status === "DONE" ? (
                    <div className="absolute left-4 top-1 w-4 h-4 border-l-2 border-b-2 border-gray-200 rounded-bl-lg"></div>
                  ) : (
                    <>
                      <div className="absolute left-2 top-2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
                      <div className="absolute left-4 top-6 h-10 bottom-0 w-0.5 bg-gray-200"></div>
                    </>

                  )}
                  <h3 className="text-lg font-semibold">{entry.action}</h3>
                  <p className="text-sm text-gray-500">{entry.date}</p>
                  {entry.status && <p className="text-sm text-blue-500">{entry.status}</p>}
                </div>
              ))}
            </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}

export default Balance