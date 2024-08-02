import React, { useEffect, useRef } from 'react';
import { PiMagnifyingGlassBold } from "react-icons/pi";

function SearchProduct({ onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex backdrop-blur-sm justify-center items-start">
        <div ref={modalRef} className="dark:bg-gray-800 bg-white flex flex-col w-full mx-10 py-2 mt-24 rounded-md">
          <div className="flex w-full items-center py-2 border-b-[1px] border-gray-200 dark:border-gray-600">
            <div className='pl-3 text-gray-500 dark:text-gray-400 pr-3'>
              <PiMagnifyingGlassBold />
            </div>
            <input type="text" className='ring-0 outline-none text-sm text-gray-500 dark:text-gray-400 bg-transparent' placeholder="Search Product" />
          </div>
          <div className="flex justify-start border-gray-200 dark:border-gray-600 pl-5 my-2 mb-2">
            <span className='text-gray-500 dark:text-gray-400'>Recent</span>
          </div>
          <div className="flex flex-col border-y-[1px] border-gray-200 dark:border-gray-600 px-2 pl-10 py-2 text-start text-gray-500 dark:text-gray-400 dark:hover:bg-gray-600 hover:bg-gray-100">
            <div className="flex flex-row gap-2 mb-0.5">
              <span className='rounded-xl bg-gray-300 text-xs dark:text-gray-700 dark:bg-green-400 text-gray-900 w-fit px-2 py-1'>type</span>
              <span className='rounded-xl bg-green-400 text-gray-800 dark:text-gray-300 dark:bg-green-700 text-xs w-fit px-2 py-1'>category</span>
            </div>
            <span className='font-semibold'>Sodium Chloride</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchProduct;