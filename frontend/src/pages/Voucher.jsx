import { useState, useRef, useEffect } from "react";
import jsPDF from 'jspdf';
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
import {
  useMutationAsync,
  FetchVoucherData,
  useUpdateVoucher,
  useDeleteVoucher,
} from "../function";
import toast from "react-hot-toast";
import { generateVoucherNumber } from "../function/generateVoucherNumber";
import { useFetchClasses, useFetchSubclasses } from "../function/hooks";
import SidebarV from "../components/SidebarV";
import { UseToggle } from "../hooks";
import { useNavigate } from "react-router-dom";

export const Voucher = () => {
  const [openCreateVoucher, setCreateVoucher] = useState(false);
  const [openEditVoucher, setEditVoucher] = useState(false);
  const [editVoucherData, setEditVoucherData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isOpenModal, setOpenModal] = UseToggle(false);
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = CreateVoucherSchema[activeStep];
  const [activePage, setActivePage] = useState("VoucherRecord");
  const [filter, setFilter] = useState("");
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
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubclass, setSelectedSubclass] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const { voucherData, voucherFetching, voucherLoading, voucherError } =
    FetchVoucherData();
  const { mutationAsync: createVoucherMutation } = useMutationAsync(
    {
      method: "post",
      url: "api/v1/voucher/create",
    },
    ["voucher"]
  );
  const { mutationAsync: updateVoucherMutation } = useUpdateVoucher();
  const { mutationAsync: deleteVoucherMutation } = useDeleteVoucher();

  // Fetch classes and subclasses
  const { data: classesData = [], isLoading: classesLoading } =
    useFetchClasses();
  const [classExp, setClassExp] = useState("");
  const {
    data: subclassesData = [],
    isLoading: subclassesLoading,
    refetch,
  } = useFetchSubclasses(classExp);
  console.log(`Class : ${classesData}`);
  console.log(`Sub Class : ${subclassesData}`);

  const handleEditClick = (voucher) => {
    setEditVoucherData(voucher);
    setEditVoucher(true);
  };

  useEffect(() => {
    if (editVoucherData) {
      setClassExp(editVoucherData.classExp);
    }
  }, [editVoucherData]);

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

  const handleClassChange = (event) => {
    setClassExp(event.target.value);
  };

  const CreateVoucherElements = VoucherInfoFieldsData(
    classesData,
    subclassesData
  )?.map((data, index) => (
    <TextField
      key={index}
      label={data.label}
      name={data.name}
      type={data.type}
      placeholder={data.placeholder}
      options={data.options} // Pass options to the TextField component
      onChange={data.name === "classExp" ? handleClassChange : undefined} // Handle class change
    />
  ));

  useEffect(() => {
    const activeTab = document.querySelector(`.tab-${activePage}`);
    if (activeTab && underlineRef.current && containerRef.current) {
      if (activePage === "balance" && balanceTabRef.current) {
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

  const generatePDF = (voucherData) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Voucher Details", 10, 10);

    const details = [
      { label: "No", value: voucherData.no },
      { label: "Amount", value: voucherData.amount },
      { label: "Date", value: voucherData.date },
      { label: "Address", value: voucherData.address },
      { label: "Description of Payment", value: voucherData.descOfPayment },
      { label: "Bank Account", value: voucherData.bankAcc },
      { label: "Check Number", value: voucherData.checkNum },
      { label: "Invoice No", value: voucherData.invoiceNo },
      { label: "Class", value: voucherData.classExp },
      { label: "Subclass", value: voucherData.subclass },
      { label: "Prepared By", value: voucherData.preparedBy },
      { label: "Accounting", value: voucherData.accounting },
      { label: "Approved By", value: voucherData.approvedBy },
    ];

    details.forEach((detail, index) => {
      doc.setFontSize(12);
      doc.text(`${detail.label}: ${detail.value || "N/A"}`, 10, 30 + index * 10);
    });

    doc.save(`voucher_${voucherData.no}.pdf`);
  };

  const filteredVouchers = voucherData?.data?.filter((voucher) =>
    Object.values(voucher).some((value) =>
      value.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarV className="w-64 h-screen bg-gray-200" />

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 text-black h-full mt-14 ml-64">
        <section className="border-gray-400 p-5 bg-white">
          <div className="relative flex flex-col gap-y-3">
            {/* Modal Container */}
            {(openCreateVoucher || openEditVoucher) && (
              <div className="absolute left-0 right-0 top-0 bottom-0 bg-white z-10 p-5 shadow-lg rounded-md">
                <h1 className="text-accent-dark text-3xl font-semibold text-center mb-5">
                  {openCreateVoucher ? "Create Voucher" : "Update Voucher"}
                </h1>
                <Formik
                  initialValues={openCreateVoucher
                    ? {
                        ...initialCreateVoucherValues,
                        no: generateVoucherNumber(),
                        classExp: "",
                        subclass: "",
                      }
                    : editVoucherData}
                  validationSchema={CreateVoucherSchema}
                  onSubmit={async (values, actions) => {
                    try {
                      const response = openCreateVoucher
                        ? await createVoucherMutation.mutateAsync(values)
                        : await updateVoucherMutation.mutateAsync({
                            id: editVoucherData._id,
                            data: values,
                          });
                      if (response.status === 200) {
                        toast.success(`Voucher ${openCreateVoucher ? "created" : "updated"} successfully`);
                      }
                      actions.resetForm();
                      setCreateVoucher(false);
                      setEditVoucher(false);
                      setEditVoucherData(null);
                    } catch (error) {
                      toast.error(`Error ${openCreateVoucher ? "creating" : "updating"} voucher`);
                      console.error(error);
                    }
                  }}
                >
                  {({ values, resetForm }) => (
                    <Form>
                      <div className="grid grid-cols-2 gap-5 place-content-center">
                        {CreateVoucherElements}
                        <div className="col-span-2 flex justify-between mt-8">
                          <button
                            type="button"
                            className="bg-gray-500 text-white font-bold h-fit p-2 rounded-md"
                            onClick={() => {
                              resetForm();
                              setCreateVoucher(false);
                              setEditVoucher(false);
                              setEditVoucherData(null);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-accent-dark text-white font-bold h-fit w-300 p-2 rounded-md"
                          >
                            {openCreateVoucher ? "Create Voucher" : "Update Voucher"}
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )}

            {/* Table and Other Content */}
            <div className="shadow-lg p-5 bg-white rounded-md w-full">
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
                  placeholder="Search vouchers"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
                <div
                  className="bg-accent-dark py-1 px-2 items-center justify-center gap-1 rounded-md flex w-24 flex-row text-white font-medium"
                  aria-label="Add Product"
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
                  <h1 className="text-2xl uppercase text-red-500">
                    Error fetching voucher data
                  </h1>
                </div>
              ) : (
                <TableCont>
                  <TableHead tableData={tableHeadData} />
                  {filteredVouchers?.map((voucher) => (
                    <TableRow
                      key={voucher._id}
                      tableRowData={voucher}
                      onEditClick={() => handleEditClick(voucher)}
                      onDeleteClick={() => handleDeleteClick(voucher._id)}
                      onDownloadPDF={() => generatePDF(voucher)}
                    />
                  ))}
                </TableCont>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
