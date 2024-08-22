import React from 'react'
import Sidebar from '../components/Sidebar';
export const Settings = () => {
  return (
    <div className="flex">
    <Sidebar />
    <main className="flex flex-col  text-black flex-grow m-0 mt-14 w-full lg:ml-64">
      <section className="p-5">
        <div className="flex flex-col gap-y-3">
          <div className="flex justify-between gap-x-3 items-center w-full">
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </div>
      </section>
    </main>
  </div>
  )
}
