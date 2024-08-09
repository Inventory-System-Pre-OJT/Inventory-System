"use client"

import * as React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { HiDotsVertical } from "react-icons/hi"
import { Pencil2Icon } from "@radix-ui/react-icons"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"
import { TrashIcon } from "@radix-ui/react-icons"

const actions = [
    {
      value: "edit",
      label: "Edit",
      icon: Pencil2Icon,
    },
    {
      value: "move",
      label: "Move to Outgoing",
      icon: ArrowTopRightIcon,
    },
    {
      value: "delete",
      label: "Delete",
      icon: TrashIcon,
    },
  ];
export function ResponsiveActionsMenu() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedStatus, setSelectedStatus] = React.useState(null)

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" >
            <HiDotsVertical />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
         <HiDotsVertical />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function StatusList({ setOpen, setSelectedStatus }) {
  return (
    <Command>
      <CommandList>
        <CommandGroup>
          {actions.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  actions.find((action) => action.value === value) || null
                )
                setOpen(false)
              }}
            >
              <status.icon className="mr-2 h-4 w-4 text-gray-500" />
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
