import React from 'react';
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

export function Modal({ title, titleModal, description, label, contentType, placeholder, children, action, btnPlaceholder }) {
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
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                    {label}
                  </label>
                  <input
                    id="inputField"
                    type="text"
                    className="bg-light_mode-primary p-2 px-1 border-b-[1px] focus:border-b-2 focus:border-green-500 focus:outline-none focus:ring-0 focus:ring-blue-500"
                    placeholder={placeholder}
                  />
                </div>
              </form>
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
            {contentType === 'description' && description}
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