import { useState, useRef, useEffect } from "react";
import { Tab, OrderInfo, PriceInfo, ProductInfo, Review } from "../components";
import { UseToggle } from "../hooks";
import { CreateProdSchema } from "../schema";
import { initialCreateProdValues } from "../data";
import { Formik, Form } from "formik";
import { FaCheck, FaPlus } from "react-icons/fa6";
import Button from '../components/Button';
import Balance from '../balance/Balance';
import Incoming from '../incoming/Incoming';
import { useNavigate } from "react-router-dom";

const steps = [
  {
    name: "Product Information",
  },
  {
    name: "Price Information",
  },
  {
    name: "Order Information",
  },
  {
    name: "Review",
  },
];

function renderStepContent(step, formValues) {
  switch (step) {
    case 0:
      return <OrderInfo />;
    case 1:
      return <PriceInfo />;
    case 2:
      return <ProductInfo />;
    case 3:
      return (
        <Review
          productName={formValues.productName}
          description={formValues.description}
          quantity={formValues.quantity}
          type={formValues.type}
          color={formValues.color}
          category={formValues.category}
          arrivalDate={formValues.arrivalDate}
          expirationDate={formValues.expirationDate}
          lotNo={formValues.lotNo}
          pricingModel={formValues.pricingModel}
          price={formValues.price}
          currency={formValues.currency}
          invoiceNo={formValues.invoiceNo}
          deliveredBy={formValues.deliveredBy}
          doneBy={formValues.doneBy}
        />
      );
    default:
      return <div>Not Found</div>;
  }
}

export const Inventory = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isOpenModal, setOpenModal] = UseToggle(false);
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = CreateProdSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const [activePage, setActivePage] = useState('incoming');
  const [filter, setFilter] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const underlineRef = useRef(null);
  const containerRef = useRef(null);
  const balanceTabRef = useRef(null);
  const navigate = useNavigate();
  const openModal = () => setOpenModal(true);

  const handleTabClick = (index) => setActiveTab(index);

  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };

  function handleSubmit(values, actions) {
    if (isLastStep) {
      alert(
        `Dear ${values.firstName}, Product Created Successfully`
      );
    } else {
      setActiveStep((prev) => prev + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  const handleAdd = () => {
    navigate('/inventory/add');
  }

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
  console.log('Rendering Inventory component');


  return (
    <main className="grid grid-rows-[auto_1fr] grid-cols-[auto_1fr] text-black relative h-screen w-full">
      <aside className="row-span-full border-[0.2px] border-gray-400 p-5 w-[15rem] max-w-full"></aside>
      <section className="border-[0.2px] border-gray-400 p-5 h-[5rem] max-h-full">
        <h1 className="text-2xl font-medium">General Inventory</h1>
      </section>
      <section className="border-[0.2px] border-gray-400 p-5 w-3/4 bg-white">
        <div className="flex flex-col gap-y-3 w-">
          <div className="flex justify-between items-center w-full">
            <div ref={containerRef} className='flex flex-row gap-x-3 w-full border-b-2 border-green-200'>
              <div className="relative flex flex-row gap-x-3 ">
                {['incoming', 'outcoming', 'balance'].map((page) => (
                  <div 
                    key={page}
                    ref={page === 'balance' ? balanceTabRef : null}
                    className={`pb-2 cursor-pointer tab-${page} ${activePage === page ? 'text-green-500 font-semibold' : 'text-gray-500'}`} 
                    onClick={() => setActivePage(page)}
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </div>
                ))}
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
              <Button text="Add" icon={<FaPlus />} className="flex-shrink-0 h-full" onClick={handleAdd} />
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

        {/* Modal for creating product */}
        
      </section>
    </main>
  );
};