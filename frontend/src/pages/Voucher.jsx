import { useState } from "react";
import {
  Section,
  TableHead,
  TableRow,
  TableCont,
  TextField,
} from "../components";
import {
  tableHeadData,
  initialCreateVoucherValues,
  VoucherInfoFieldsData,
} from "../data";
import { Formik, Form } from "formik";
import { CreateVoucherSchema } from "../schema";
import { useMutationAsync, FetchVoucherData } from "../function";
import toast from "react-hot-toast";

export const Voucher = () => {
  const [openCreateVoucher, setCreateVoucher] = useState(false);

  const { voucherData, voucherFetching, voucherLoading } = FetchVoucherData();

  const { mutationAsync } = useMutationAsync(
    {
      method: "post",
      url: "api/v1/voucher/create",
    },
    ["voucher"]
  );

  const voucherTableRowElement = voucherData?.data?.voucher?.map(
    (data, index) => <TableRow key={index} tableRowData={Object(data)} />
  );

  const CreateVoucherElements = VoucherInfoFieldsData?.map((data, index) => (
    <TextField
      key={index}
      label={data.label}
      name={data.name}
      type={data.type}
      placeholder={data.placeholder}
    />
  ));

  return (
    <main className="grid grid-rows-[auto_1fr] grid-cols-[auto_1fr] text-black w-full relative ">
      {openCreateVoucher && (
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-white z-10 p-5">
          <h1 className="text-2xl font-semibold">Create Voucher</h1>

          <Formik
            initialValues={initialCreateVoucherValues}
            validationSchema={CreateVoucherSchema}
            onSubmit={async (values, actions) => {
              try {
                console.log("Form values:", values); // Debugging log
                const response = await mutationAsync.mutateAsync(values);
                console.log("Response:", response); // Debugging log
                if (response.status === 200) {
                  toast.success("Voucher created successfully");
                }
                actions.resetForm();
                setCreateVoucher(false);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {(formik) => {
              return (
                <Form onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-3 gap-5 grid-flow-dense place-content-center">
                    {CreateVoucherElements}
                    <button
                      type="submit"
                      onClick={() => console.log("im clicked")}
                      className="bg-primary  text-black font-bold h-fit m-auto w-full p-2 mt-8 rounded-md"
                    >
                      Create Voucher
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
      <Section style="row-span-full w-[15rem] max-w-full"></Section>
      <Section style="h-[5rem] max-h-full">
        <h1 className="text-2xl font-semibold">Disbursement Voucher</h1>
      </Section>
      <Section style="bg-white flex flex-col gap-5 w-full overflow-x-auto">
        <div className="flex flex-row gap-5 self-end mb-6">
          <select className="w-fit p-2 rounded-md bg-transparent border-2 border-gray-400">
            <option defaultValue>Filter Categories</option>
            <option value="">Product 1</option>
            <option value="">Product 2</option>
            <option value="">Product 3</option>
            <option value="">Product 4</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            className="rounded-md bg-transparent border-2 border-gray-400 p-2"
          />
          <div
            className="bg-accent-dark py-1 px-2 items-center justify-center gap-1 rounded-md flex w-24 flex-row text-white font-medium"
            aria-label="Add Product"
            role="button"
            tabIndex={0}
            onClick={() => setCreateVoucher((preval) => !preval)}
          >
            <span>Add</span>
          </div>
        </div>

        {voucherFetching || voucherLoading ? (
          <div className=" text-center">
            <h1 className=" text-2xl uppercase">Loading</h1>
          </div>
        ) : (
          <TableCont>
            <TableHead tableData={tableHeadData} />
            {voucherTableRowElement}
          </TableCont>
        )}
      </Section>
    </main>
  );
};
