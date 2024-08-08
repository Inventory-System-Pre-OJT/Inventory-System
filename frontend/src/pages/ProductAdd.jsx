import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialCreateProdValues } from "../data";
import { Formik, Form } from "formik";
import { FaCheck } from "react-icons/fa6";
import { OrderInfo, PriceInfo, ProductInfo, Review } from "../components";
import { CreateProdSchema } from "../schema";
import { FaArrowRight } from "react-icons/fa6";
const steps = [
  { name: "Product Information" },
  { name: "Price Information" },
  { name: "Order Information" },
  { name: "Review" },
];

export const ProductAdd = () => {
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;
  const currentValidationSchema = CreateProdSchema[activeStep];
  const navigate = useNavigate();

  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };

  function handleSubmit(values, actions) {
    if (isLastStep) {
      alert(`Product Created Successfully`);
      navigate('/inventory');
    } else {
      setActiveStep((prev) => prev + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function renderStepContent(step, formValues) {
    switch (step) {
      case 0:
        return <OrderInfo />;
      case 1:
        return <PriceInfo />;
      case 2:
        return <ProductInfo />;
      case 3:
        return <Review {...formValues} />;
      default:
        return <div>Not Found</div>;
    }
  }

  return (
    <div className="p-5 dark:bg-gray-800 w-screen h-full">
      <h2 className="text-2xl text-start dark:text-slate-300 font-medium w-full mb-5">Create Product</h2>
      <div className="flex flex-row gap-5 w-full h-auto">
        <ul className="p-5 list-none flex flex-col gap-3 dark:bg-gray-900 rounded-xl">
          {steps.map((data, index) => (
            <li
              key={index}
              className={`flex flex-row gap-2 bg-light_mode-primary items-center dark:text-slate-400 ${
                index === activeStep
                  ? "font-semibold text-[1.08rem]"
                  : "text-gray-400 font-medium"
              }`}
            >
              {index < activeStep ? (
                <FaCheck className="text-accent-dark dark:text-green-500 text-green-500 text-lg" />
              ) : (
                <span
                  className={`${
                    index === activeStep
                      ? "bg-accent-dark dark:bg-green-500 bg-green-300 rounded-xl w-6 h-1 "
                      : "w-5 h-1 bg-accent dark:bg-green-300 bg-slate-300 rounded-xl"
                  }`}
                ></span>
              )}
              {data.name}
            </li>
          ))}
        </ul>
        <div className="p-5 dark:bg-gray-900 rounded-xl flex-1 min-h-[600px] flex flex-col">
          <h3
            className={`text-3xl text-start dark:text-slate-300 font-medium ${
              activeStep === 3 ? "w-full md:w-[90%] m-auto" : ""
            }`}
          >
            {steps[activeStep].name}
          </h3>
          {activeStep !== 3 && (
            <div className="border-[1px] dark:border-[#AAAA] mt-3"></div>
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
                          className="relative group text-black dark:text-slate-300"
                        >
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full group-hover:right-auto group-hover:left-0 "></span>
                          Previous
                        </button>
                        <button
                          type="submit"
                          className="bg-green-700 p-2 rounded-md text-white"
                        >
                          {isLastStep ? "Create Product" : "Continue"}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => navigate('/inventory')}
                          type="button"
                          className="relative group text-black dark:text-slate-300"
                        >
                          <span className="absolute bottom-0 left-0 w-0 h-0.5  bg-black dark:bg-white transition-all duration-300 group-hover:w-full group-hover:right-auto group-hover:left-0 "></span>
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-green-700 text-regular p-2 rounded-md text-white flex flex-row items-center"
                        >
                          Continue
                        </button>
                      </>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}