import { useState, useRef, useEffect } from "react";
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
import { Formik, Form, FieldArray } from "formik";
import { CreateExpenditureSchema } from "../schema";
import {
  useExpenditureMutationAsync,
  FetchExpenditureData,
  useUpdateExpenditure,
  useDeleteExpenditure,
} from "../function";
import toast from "react-hot-toast";
import { generateClassExpNumber } from "../function/generateVoucherNumber"; // Import the function
import SidebarV from '../components/SidebarV';
import { UseToggle } from "../hooks";
import { useNavigate } from "react-router-dom";

export const Expenditure = () => {
  const [openCreateExpenditure, setCreateExpenditure] = useState(false);
  const [openEditExpenditure, setEditExpenditure] = useState(false);
  const [editExpenditureData, setEditExpenditureData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isOpenModal, setOpenModal] = UseToggle(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activePage, setActivePage] = useState('Expenditure');
  const [filter, setFilter] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const underlineRef = useRef(null);
  const containerRef = useRef(null);
  const balanceTabRef = useRef(null);
  const navigate = useNavigate();
  const openModal = () => setOpenModal(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleTabClick = (index) => setActiveTab(index);
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);

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
      readOnly={data.readOnly} // Pass the readOnly property
      placeholder={data.placeholder}
    />
  ));

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

  

  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarV className="w-64 h-screen bg-gray-200" />

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 text-black h-full mt-14 ml-64">
        <section className="border-gray-400 p-5 bg-white w-full">
          <div className="relative flex flex-col gap-y-3 w-full">
            {/* Form for creating or editing expenditure */}
            {(openCreateExpenditure || (openEditExpenditure && editExpenditureData)) && (
  <div className="absolute inset-0 bg-white z-10 p-5">
    <h1 className="text-accent-dark text-3xl font-semibold text-center mb-5">{openCreateExpenditure ? 'Create Expenditure' : 'Update Expenditure'}</h1>
    <Formik
      initialValues={{
        ...initialCreateExpenditureValues,
        ...(openEditExpenditure && editExpenditureData),
        classExp: openCreateExpenditure ? generateClassExpNumber() : editExpenditureData?.classExp || '',
        subclasses: (openEditExpenditure && editExpenditureData?.subclasses) || [{ name: "" }]
      }}
      validationSchema={CreateExpenditureSchema}
      onSubmit={async (values, actions) => {
        try {
          const response = openCreateExpenditure
            ? await createExpenditureMutation.mutateAsync(values)
            : await updateExpenditureMutation.mutateAsync({ id: editExpenditureData._id, data: values });
          if (response.status === 200) {
            toast.success(`Expenditure ${openCreateExpenditure ? 'created' : 'updated'} successfully`);
          }
          actions.resetForm();
          setCreateExpenditure(false);
          setEditExpenditure(false);
          setEditExpenditureData(null);
        } catch (error) {
          toast.error(`Error ${openCreateExpenditure ? 'creating' : 'updating'} expenditure`);
          console.error(error);
        }
      }}
    >
      {({ values, resetForm }) => (
        <Form>
          <div className="grid grid-cols-2 gap-5 grid-flow-dense place-content-center">
            {CreateExpenditureElements}
            <FieldArray name="subclasses">
              {({ remove, push }) => (
                <div>
                  {values.subclasses.length > 0 &&
                    values.subclasses.map((subclass, index) => (
                      <div key={index} className="mb-4">
                        <TextField
                          label={`Subclass ${index + 1}`}
                          name={`subclasses.${index}.name`}
                          type="text"
                          placeholder="Enter subclass"
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-red-500 text-white p-2 rounded"
                          >
                            Remove
                          </button>
                          <button
                            type="button"
                            onClick={() => push({ name: "" })}
                            className="bg-teal-700 text-white p-2 rounded"
                          >
                            Add Subclass
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </FieldArray>

            <div className="col-span-2 flex justify-between mt-8">
              <button
                type="button"
                className="bg-gray-500 text-white font-bold h-fit p-2 rounded-md"
                onClick={() => {
                  resetForm(); // Reset the form values
                  setCreateExpenditure(false); // Close the create form
                  setEditExpenditure(false); // Close the edit form if it was open
                  setEditExpenditureData(null); // Clear edit data
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-accent-dark text-white font-bold h-fit w-300 p-2 rounded-md"
              >
                {openCreateExpenditure ? 'Create Expenditure' : 'Update Expenditure'}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  </div>
)}

            
{openEditExpenditure && editExpenditureData && (
  <div className="absolute left-0 right-0 top-0 bottom-0 bg-white z-10 p-5">
    <h1 className="text-accent-dark text-3xl font-semibold text-center mb-5">Update Expenditure</h1>

    <Formik
      initialValues={{
        ...editExpenditureData,
        subclasses: editExpenditureData.subclasses || [{ name: "" }] // Initialize with one subclass if not present
      }}
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
      {({ values, resetForm }) => (
        <Form>
          <div className="grid grid-cols-2 gap-5 grid-flow-dense place-content-center">
            {CreateExpenditureElements}

            <FieldArray name="subclasses">
              {({ remove, push }) => (
                <div>
                  {values.subclasses.length > 0 &&
                    values.subclasses.map((subclass, index) => (
                      <div key={index} className="mb-4">
                        <TextField
                          label={`Subclass ${index + 1}`}
                          name={`subclasses.${index}.name`}
                          type="text"
                          placeholder="Enter subclass"
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-red-500 text-white p-2 rounded"
                          >
                            Remove
                          </button>
                          <button
                            type="button"
                            onClick={() => push({ name: "" })}
                            className="bg-teal-700 text-white p-2 rounded"
                          >
                            Add Subclass
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </FieldArray>

            <div className="col-span-2 flex justify-between mt-8">
              <button
                type="button"
                className="bg-gray-500 text-white font-bold h-fit p-2 rounded-md"
                onClick={() => {
                  resetForm(); // Reset the form values
                  setEditExpenditure(false); // Close the edit form
                  setEditExpenditureData(null); // Clear edit data
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-accent-dark text-white font-bold h-fit p-2 rounded-md"
              >
                Update Expenditure
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  </div>
)}


      
      
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
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
                <div
                  className="bg-accent-dark py-1 px-2 items-center justify-center gap-1 rounded-md flex w-24 flex-row text-white font-medium"
                  aria-label="Add Expenditure"
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
                      tableRowData={{
                        ...expenditure,
                        subclasses: expenditure.subclasses.map(subclass => subclass.name).join(', ') // Join subclass names into a string
                      }}
                      onEditClick={() => handleEditClick(expenditure)}
                      onDeleteClick={() => handleDeleteClick(expenditure._id)}
                    />
                  ))}
                </TableCont>
              )}
            </Section>
          </div>
        </section>
      </main>
    </div>
  );
};
