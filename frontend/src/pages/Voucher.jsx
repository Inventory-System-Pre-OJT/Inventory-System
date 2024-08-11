import React, { useState, useEffect } from "react";
import { Section, TableHead, TableRow, TableCont, TextField } from "../components";
import { tableHeadData, initialCreateVoucherValues, VoucherInfoFieldsData } from "../data";
import { Formik, Form } from "formik";
import { CreateVoucherSchema } from "../schema";
import { 
  useMutationAsync, 
  useUpdateVoucher, 
  useDeleteVoucher,
  FetchVoucherData,
  useFetchOptions
} from "../function";
import toast from "react-hot-toast";

export const Voucher = () => {
  const [openCreateVoucher, setCreateVoucher] = useState(false);
  const [openEditVoucher, setEditVoucher] = useState(false);
  const [editVoucherData, setEditVoucherData] = useState(null);
  const [selectedClassExp, setSelectedClassExp] = useState(""); 
  const [selectedSubclass, setSelectedSubclass] = useState("");

  const { voucherData, voucherFetching, voucherLoading, voucherError } = FetchVoucherData();
  const { mutationAsync: createVoucherMutation } = useMutationAsync(
    { method: "post", url: "api/v1/voucher/create" },
    ["voucher"]
  );
  const { mutationAsync: updateVoucherMutation } = useUpdateVoucher();
  const { mutationAsync: deleteVoucherMutation } = useDeleteVoucher();

  // Fetch options
  const { classExpOptions, subclassOptions, isLoading, error } = useFetchOptions(selectedClassExp);

  useEffect(() => {
    console.log("Selected classExp updated:", selectedClassExp);
    if (selectedClassExp) {
      setSelectedSubclass(""); // Clear subclass when classExp changes
    }
  }, [selectedClassExp]);

  useEffect(() => {
    console.log("Fetched subclass options:", subclassOptions);
  }, [subclassOptions]);

  const handleClassExpChange = (event) => {
    const value = event.target.value;
    console.log("ClassExp changed to:", value);
    setSelectedClassExp(value);
  };

  const handleSubclassChange = (event) => {
    const value = event.target.value;
    console.log("Subclass changed to:", value);
    setSelectedSubclass(value);
  };

  const handleEditClick = (voucher) => {
    setEditVoucherData(voucher);
    setEditVoucher(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this voucher?")) {
      try {
        const response = await deleteVoucherMutation.mutateAsync(id);
        if (response.status === 200) {
          toast.success("Voucher deleted successfully");
        }
      } catch (error) {
        toast.error("Error deleting voucher");
        console.error(error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading options...</div>;
  }

  if (error) {
    return <div>Error loading options</div>;
  }

  const classExpOptionsArray = classExpOptions.map(option => ({
    value: option.value,
    label: option.label
  }));

  const CreateVoucherElements = VoucherInfoFieldsData(classExpOptionsArray, subclassOptions).map((data, index) => (
    <TextField
      key={index}
      label={data.label}
      name={data.name}
      type={data.type}
      placeholder={data.placeholder}
      options={data.options}
      onChange={data.name === "classExp" ? handleClassExpChange : data.name === "subclass" ? handleSubclassChange : undefined}
      value={data.name === "classExp" ? selectedClassExp : data.name === "subclass" ? selectedSubclass : ""}
    />
  ));

  return (
    <main className="grid grid-rows-[auto_1fr] grid-cols-[auto_1fr] text-black w-full relative">
      {openCreateVoucher && (
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-white z-10 p-5">
          <h1 className="text-2xl font-semibold">Create Voucher</h1>

          <Formik
            initialValues={{ ...initialCreateVoucherValues, subclass: selectedSubclass }}
            validationSchema={CreateVoucherSchema}
            onSubmit={async (values, actions) => {
              try {
                const response = await createVoucherMutation.mutateAsync(values);
                if (response.status === 200) {
                  toast.success("Voucher created successfully");
                }
                actions.resetForm();
                setCreateVoucher(false);
              } catch (error) {
                toast.error("Error creating voucher");
                console.error(error);
              }
            }}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-3 gap-5 grid-flow-dense place-content-center">
                  {CreateVoucherElements}
                  <button
                    type="submit"
                    className="bg-primary text-black font-bold h-fit m-auto w-full p-2 mt-8 rounded-md"
                  >
                    Create Voucher
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {openEditVoucher && editVoucherData && (
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-white z-10 p-5">
          <h1 className="text-2xl font-semibold">Update Voucher</h1>

          <Formik
            initialValues={{ ...editVoucherData, subclass: selectedSubclass }}
            validationSchema={CreateVoucherSchema}
            onSubmit={async (values, actions) => {
              try {
                const response = await updateVoucherMutation.mutateAsync({ id: editVoucherData._id, data: values });
                if (response.status === 200) {
                  toast.success("Voucher updated successfully");
                }
                actions.resetForm();
                setEditVoucher(false);
                setEditVoucherData(null);
              } catch (error) {
                toast.error("Error updating voucher");
                console.error(error);
              }
            }}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-3 gap-5 grid-flow-dense place-content-center">
                  {CreateVoucherElements}
                  <button
                    type="submit"
                    className="bg-primary text-black font-bold h-fit m-auto w-full p-2 mt-8 rounded-md"
                  >
                    Update Voucher
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      <Section style="h-[5rem] max-h-full">
        <h1 className="text-2xl font-semibold">Disbursement Voucher</h1>
      </Section>
      <Section style="bg-white flex flex-col gap-5 w-full overflow-x-auto">
        <div className="flex flex-row gap-5 self-end mb-6">
          <select 
            className="w-fit p-2 rounded-md bg-transparent border-2 border-gray-400" 
            value={selectedClassExp} 
            onChange={handleClassExpChange}
          >
            <option value="">Select Class Exp</option>
            {classExpOptionsArray.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select 
            className="w-fit p-2 rounded-md bg-transparent border-2 border-gray-400" 
            value={selectedSubclass} 
            onChange={handleSubclassChange}
          >
            <option value="">Select Subclass</option>
            {subclassOptions.length > 0 ? (
              subclassOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            ) : (
              <option value="">No subclasses available</option>
            )}
          </select>
          <input
            type="text"
            placeholder="Search"
            className="rounded-md bg-transparent border-2 border-gray-400 p-2"
          />
          <div
            className="bg-accent-dark py-1 px-2 items-center justify-center gap-1 rounded-md flex w-24 flex-row text-white font-medium"
            aria-label="Add Voucher"
            role="button"
            tabIndex={0}
            onClick={() => setCreateVoucher((prev) => !prev)}
          >
            <span>Add</span>
          </div>
        </div>

        {voucherFetching || voucherLoading ? (
          <div className="text-center">
            <h1 className="text-2xl uppercase">Loading</h1>
          </div>
        ) : voucherError ? (
          <div className="text-center">
            <h1 className="text-2xl uppercase text-red-500">Error fetching voucher data</h1>
          </div>
        ) : (
          <TableCont>
            <TableHead tableData={tableHeadData} />
            {voucherData?.data?.map((voucher) => (
              <TableRow
                key={voucher._id}
                tableRowData={voucher}
                onEditClick={() => handleEditClick(voucher)}
                onDeleteClick={() => handleDeleteClick(voucher._id)}
              />
            ))}
          </TableCont>
        )}
      </Section>
    </main>
  );
};
