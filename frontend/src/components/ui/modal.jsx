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
  
  export function Modal({ title, titleModal, description, label, contentType, placeholder }) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show {title}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{titleModal}</AlertDialogTitle>
            <AlertDialogDescription>
              {contentType === 'form' ? (
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
              ) : (
                description
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }