import { useState, useRef, useEffect } from "react";
import { UseToggle } from "../hooks";
import { useNavigate } from "react-router-dom";
import { initialCreateProdValues } from "../data";
import { Formik, Form } from "formik";
import { FaCheck } from "react-icons/fa6";
import { ExpAdd } from "../components";
import SidebarV from '../components/SidebarV';
import { CreateProdSchema } from "../schema";
import { FaArrowRight } from "react-icons/fa6";
const steps = [
  { name: "Expenditure" },
];

export const ExpenditureAdd = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isOpenModal, setOpenModal] = UseToggle(false);
  const [activePage, setActivePage] = useState('VoucherRecord');
  const [filter, setFilter] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const underlineRef = useRef(null);
  const containerRef = useRef(null);
  const balanceTabRef = useRef(null);
  const openModal = () => setOpenModal(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleTabClick = (index) => setActiveTab(index);
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;
  const currentValidationSchema = CreateProdSchema[activeStep];
  const navigate = useNavigate();

  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };

  function handleSubmit(values, actions) {
    if (isLastStep) {
      alert(`Voucher Created Successfully`);
      navigate('/expenditure');
    } else {
      setActiveStep((prev) => prev + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function renderStepContent(step, formValues) {
    switch (step) {
      case 0:
        return <ExpAdd />;
      default:
        return <div>Not Found</div>;
    }
  }
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
  console.log('Rendering voucher component');
  function renderStepContent(step, formValues) {
    switch (step) {
      case 0:
        return <ExpAdd />;
      default:
        return <div>Not Found</div>;
    }
  }
  return (
    <div className="flex">
      <SidebarV />
      <main className="flex flex-col bg-gray-100 text-black h-full w-screen m-0 mt-14 lg:ml-64 lg:mr-10">
        <section className="border-gray-400 p-5 w-full bg-white">
          <div className="flex flex-col gap-y-3 w-full">
            <div className="flex justify-between gap-x-3 items-center w-full">
              <div ref={containerRef} className='flex flex-row gap-x-3 w-full border-b-2 border-green-200'>
                <div className="relative flex flex-row gap-x-3 ">
                <ul className="p-5 list-none flex flex-col gap-3 mt-20">
          {steps.map((data, index) => (
            <li
              key={index}
              className={`flex flex-row gap-2 items-center ${
                index === activeStep
                  ? "font-semibold text-[1.08rem]"
                  : "text-gray-400 font-medium"
              }`}
            >
              {index < activeStep ? (
                <FaCheck className="text-accent-dark text-lg" />
              ) : (
                <span
                  className={`${
                    index === activeStep
                      ? "bg-accent-dark w-6 h-1"
                      : "w-5 h-1 bg-accent"
                  }`}
                ></span>
              )}
              {data.name}
            </li>
          ))}
        </ul>
        <div className="p-5 flex-1">
          <h3
            className={`text-3xl font-medium ${
              activeStep === 3 ? "w-full md:w-[90%] m-auto" : ""
            }`}
          >
            {steps[activeStep].name}
          </h3>
          {activeStep !== 3 && (
            <div className="border-[2px] border-[#AAAA] mt-3"></div>
          )}
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialCreateProdValues}
            validationSchema={currentValidationSchema}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {(formik) => {
              const formValues = formik.values;
              return (
                <Form>
                  {renderStepContent(activeStep, formValues)}
                  <div className="flex flex-row justify-between font-bold mb-6 mt-5">
                    {activeStep !== 0 ? (
                      <>
                        <button
                          onClick={handleBack}
                          type="button"
                          className="border-b-2 border-black"
                        >
                          Previous
                        </button>
                        <button
                          type="submit"
                          className="bg-green-700 p-2 rounded-md text-white"
                        >
                          {isLastStep ? "Create Expenditure" : "Continue"}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => navigate('/expenditure')}
                          type="button"
                          className="relative group"
                        >
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full group-hover:right-auto group-hover:left-0 "></span>
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-green-700 p-2 rounded-md text-white flex flex-row items-center"
                        >
                          Submit
                          <FaArrowRight className="ml-2" />
                        </button>
                      </>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
          </div></div></div></div></div>
          </section></main></div>
  );
}