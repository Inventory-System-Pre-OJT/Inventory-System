import React, { useState, useRef, useEffect } from 'react';
import { FaPlus } from "react-icons/fa6";
import Button from './components/Button';
import Balance from './balance/Balance';
import Incoming from './incoming/Incoming';

function Home() {
    const [activePage, setActivePage] = useState('incoming');
    const [filter, setFilter] = useState('');
    const [checked, setChecked] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const underlineRef = useRef(null);
    const containerRef = useRef(null);
    const balanceTabRef = useRef(null);

    const handleCheckboxChange = (index) => {
        const updatedSelectedRows = [...selectedRows];
        if (updatedSelectedRows.includes(index)) {
            updatedSelectedRows.splice(updatedSelectedRows.indexOf(index), 1);
        } else {
            updatedSelectedRows.push(index);
        }
        setSelectedRows(updatedSelectedRows);
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedRows([]);
        } else {
            setSelectedRows([0, 1]); // Assuming you have 2 rows, adjust accordingly
        }
        setSelectAll(!selectAll);
    };

    useEffect(() => {
        const activeTab = document.querySelector(`.tab-${activePage}`);
        if (activeTab && underlineRef.current && containerRef.current) {
            if (activePage === 'balance' && balanceTabRef.current) {
                const balanceTabLeft = balanceTabRef.current.offsetLeft;
                const containerWidth = containerRef.current.offsetWidth;
                underlineRef.current.style.width = `${containerWidth - balanceTabLeft}px`;
                underlineRef.current.style.transform = `translateX(${balanceTabLeft}px)`;
            } else {
                underlineRef.current.style.width = `${activeTab.offsetWidth}px`;
                underlineRef.current.style.transform = `translateX(${activeTab.offsetLeft}px)`;
            }
        }
    }, [activePage]);

    return (
        <div className="flex flex-col gap-y-3">
            <div className="flex justify-between items-center">
                <div ref={containerRef} className='flex flex-row w-2/3 gap-x-3 w-full border-b-2 border-green-200'>
                    <div className="relative flex flex-row gap-x-3 ">
                        <div 
                            className={`pb-2 cursor-pointer tab-incoming ${activePage === 'incoming' ? 'text-green-500 font-semibold' : 'text-gray-500'}`} 
                            onClick={() => setActivePage('incoming')}
                        >
                            Incoming
                        </div>
                        <div 
                            className={`pb-2 cursor-pointer tab-outcoming ${activePage === 'outcoming' ? 'text-green-500 font-semibold' : 'text-gray-500'}`} 
                            onClick={() => setActivePage('outcoming')}
                        >
                            Outcoming
                        </div>
                        <div 
                            ref={balanceTabRef}
                            className={`pb-2 cursor-pointer tab-balance ${activePage === 'balance' ? 'text-green-500 font-semibold' : 'text-gray-500'}`} 
                            onClick={() => setActivePage('balance')}
                        >
                            Balance
                        </div>
                        <div 
                            ref={underlineRef}
                            className="absolute bottom-0 left-0 h-0.5 bg-green-500 transition-all duration-300 ease-in-out"
                            style={{ bottom: '-2px' }}
                        ></div>
                    </div>
                </div>
                <div className="flex justify-between w-[60%] gap-x-2 h-8">
                    <div className="flex-grow">
                        <select className="w-full h-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-haspopup="true" aria-expanded="true">
                            <option value="" disabled selected>Filter categories</option>
                            <option value="incoming">Incoming</option>
                            <option value="outcoming">Outcoming</option>
                            <option value="balance">Balance</option>
                        </select>
                    </div>
                    <input type="text" placeholder="Search" className="flex-grow h-full px-2 py-2 border rounded" />
                    <Button text="Add" icon={<FaPlus />} className="flex-shrink-0 h-full" />
                </div>
            </div>

            {/* Content based on activePage */}
            {activePage === 'incoming' && (
                <div>
                    <Incoming 
                        selectAll={selectAll}
                        handleSelectAllChange={handleSelectAllChange}
                        selectedRows={selectedRows}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                </div>
            )}
            {activePage === 'outcoming' && (
                <div>
                    {/* Outcoming page content */}
                </div>
            )}
            {activePage === 'balance' && (
                <div>
                    <Balance />
                </div>
            )}
        </div>
    );
}

export default Home;