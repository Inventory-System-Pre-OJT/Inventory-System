import { useState } from "react";
import {
  Section,
  TableHead,
  TableRow,
  TableCont,
  TextField,
} from "../components";
import {
  tableHeadDataExpenditure,
  initialCreateExpenditureValues,
  ExpenditureInfoFieldsData,
} from "../data";
import { Formik, Form } from "formik";
import { CreateExpenditureSchema } from "../schema";
import { useExpenditureMutationAsync, FetchExpenditureData, useUpdateExpenditure, useDeleteExpenditure } from "../function";
import toast from "react-hot-toast";

export const Expenditure = () => {
  const [openCreateExpenditure, setCreateExpenditure] = useState(false);
  const [openEditExpenditure, setEditExpenditure] = useState(false);
  const [editExpenditureData, setEditExpenditureData] = useState(null);

  const { expenditureData, expenditureFetching, expenditureLoading, expenditureError } = FetchExpenditureData();
  const { mutationAsync: createExpenditureMutation } = useExpenditureMutationAsync(
    {
      method: "post",
      url: "api/v1/expenditure/create",
    },
    ["expenditure"]
  );
  const { mutationAsync: updateExpenditureMutation } = useUpdateExpenditure();
  const { mutationAsync: deleteExpenditureMutation } = useDeleteExpenditure();

  const handleEditClick = (expenditure) => {
    setEditExpenditureData(expenditure);
    setEditExpenditure(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this expenditure?")) {
      try {
        const response = await deleteExpenditureMutation.mutateAsync(id);
        if (response.status === 200) {
          toast.success("Expenditure deleted successfully");
        }
      } catch (error) {
        toast.error("Error deleting expenditure");
        console.error(error);
      }
    }
  };

  const CreateExpenditureElements = ExpenditureInfoFieldsData?.map((data, index) => (
    <TextField
      key={index}
      label={data.label}
      name={data.name}
      type={data.type}
      placeholder={data.placeholder}
    />
  ));

  return (
    <main className="grid grid-rows-[auto_1fr] grid-cols-[auto_1fr] text-black w-full relative">
      {openCreateExpenditure && (
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-white z-10 p-5">
          <h1 className="text-2xl font-semibold">Create Expenditure</h1>

          <Formik
            initialValues={initialCreateExpenditureValues}
            validationSchema={CreateExpenditureSchema}
            onSubmit={async (values, actions) => {
              try {
                const response = await createExpenditureMutation.mutateAsync(values);
                if (response.status === 200) {
                  toast.success("Expenditure created successfully");
                }
                actions.resetForm();
                setCreateExpenditure(false);
              } catch (error) {
                toast.error("Error creating expenditure");
                console.error(error);
              }
            }}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-3 gap-5 grid-flow-dense place-content-center">
                  {CreateExpenditureElements}
                  <button
                    type="submit"
                    className="bg-primary text-black font-bold h-fit m-auto w-full p-2 mt-8 rounded-md"
                  >
                    Create Expenditure
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {openEditExpenditure && editExpenditureData && (
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-white z-10 p-5">
          <h1 className="text-2xl font-semibold">Update Expenditure</h1>

          <Formik
            initialValues={editExpenditureData}
            validationSchema={CreateExpenditureSchema}
            onSubmit={async (values, actions) => {
              try {
                const response = await updateExpenditureMutation.mutateAsync({ id: editExpenditureData._id, data: values });
                if (response.status === 200) {
                  toast.success("Expenditure updated successfully");
                }
                actions.resetForm();
                setEditExpenditure(false);
                setEditExpenditureData(null);
              } catch (error) {
                toast.error("Error updating expenditure");
                console.error(error);
              }
            }}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-3 gap-5 grid-flow-dense place-content-center">
                  {CreateExpenditureElements}
                  <button
                    type="submit"
                    className="bg-primary text-black font-bold h-fit m-auto w-full p-2 mt-8 rounded-md"
                  >
                    Update Expenditure
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      <Section style="row-span-full w-[15rem] max-w-full"></Section>
      <Section style="h-[5rem] max-h-full">
        <h1 className="text-2xl font-semibold">Disbursement Expenditure</h1>
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
            onClick={() => setCreateExpenditure((prev) => !prev)}
          >
            <span>Add</span>
          </div>
        </div>

        {expenditureFetching || expenditureLoading ? (
          <div className="text-center">
            <h1 className="text-2xl uppercase">Loading</h1>
          </div>
        ) : expenditureError ? (
          <div className="text-center">
            <h1 className="text-2xl uppercase text-red-500">Error fetching expenditure data</h1>
          </div>
        ) : (
          <TableCont>
            <TableHead tableData={tableHeadDataExpenditure} />
            {expenditureData?.data?.map((expenditure) => (
              <TableRow
                key={expenditure._id}
                tableRowData={expenditure}
                onEditClick={() => handleEditClick(expenditure)}
                onDeleteClick={() => handleDeleteClick(expenditure._id)}
              />
            ))}
          </TableCont>
        )}
      </Section>
    </main>
  );
};
