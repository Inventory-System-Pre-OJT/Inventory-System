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
    <div className="p-5">
      <h2 className="text-2xl font-medium w-full mb-5">Create Product</h2>
      <div className="flex flex-row gap-10 w-full">
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
                          {isLastStep ? "Create Product" : "Continue"}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => navigate('/inventory')}
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
                          Continue
                          <FaArrowRight className="ml-2" />
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