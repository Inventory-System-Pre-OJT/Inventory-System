"use client"

import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
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

export function ResponsiveActionsMenu({ actions, onActionSelected }) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const StatusList = ({ actions }) => (
    <Command>
      <CommandList>
        <CommandGroup>
          {actions.map((action) => (
            <CommandItem
              key={action.value}
              value={action.value}
              onSelect={(value) => {
                onActionSelected(value); // Call the action handler
                setOpen(false);
              }}
            >
              <action.icon className="mr-2 h-4 w-4 text-gray-500" />
              {action.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <HiDotsVertical />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList actions={actions} />
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
          <StatusList actions={actions} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}