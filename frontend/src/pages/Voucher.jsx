//frontend/src/pages/Voucher.jsx
import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
  const [viewVoucherData, setViewVoucherData] = useState(null);  // Added for viewing voucher details
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
  const handleStatusChange = async (voucherId, newStatus) => {
    try {
      const response = await fetch(`/api/v1/voucher/updateStatus/${voucherId}`, {
        method: 'PATCH', // Use PATCH method to update the voucher
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }), // Send the new status in the body
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data) {
        toast.success("Voucher status updated successfully");
        // Optionally refetch data or update state to reflect changes
      }
    } catch (error) {
      toast.error("Error updating voucher status");
      console.error(error);
    }
  };

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

  const handleEditClick = (voucher) => {
    setEditVoucherData(voucher);
    setEditVoucher(true);
  };

  const handleViewClick = (voucher) => {
    setViewVoucherData(voucher);  // Set the voucher to view mode
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
        underlineRef.current.style.width = `${containerWidth - balanceTabLeft
          }px`;
        underlineRef.current.style.transform = `translateX(${balanceTabLeft}px)`;
      } else {
        underlineRef.current.style.width = `${activeTab.offsetWidth}px`;
        underlineRef.current.style.transform = `translateX(${activeTab.offsetLeft}px)`;
      }
    }
  }, [activePage]);


  const filteredVouchers = voucherData?.data?.filter((voucher) =>
    Object.values(voucher).some((value) =>
      value.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  const downloadPDF = () => {
    const input = document.getElementById('voucher-details');
  
    input.style.display = 'block'; // Ensure the element is visible
  
    // Customize the canvas size
    const customWidth = 1200; // Custom width in pixels
    const customHeight = 990;  // Custom height in pixels
  
    html2canvas(input, {
      scale: 2,
      width: customWidth, // Set custom width
      height: customHeight, // Set custom height
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
  
      // Create a PDF with custom dimensions for letter size in landscape
      const pdfWidth = 279.4; // Custom PDF width in mm (Letter width in landscape)
      const pdfHeight = 215.9; // Custom PDF height in mm (Letter height)
  
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [pdfWidth, pdfHeight], // Letter size dimensions in mm
      });
  
      // Calculate dimensions to fit the image inside the PDF
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
  
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;
  
      // Set a margin (in mm)
      const marginLeft = 6; // Adjust this value to increase/decrease the margin
  
      // Add the image to the PDF with margin on the left side
      pdf.addImage(imgData, 'PNG', marginLeft, 0, finalWidth, finalHeight);
  
      // Download the PDF with the voucher number as the filename
      const voucherNo = viewVoucherData.no; // Access the voucher number
      pdf.save(`voucher-No-${voucherNo}.pdf`); // Set the filename
    });
  };

  return (
    <div className="flex">
      <SidebarV />
      <main className="flex flex-col bg-gray-100 text-black h-full w-screen m-0 mt-14 lg:ml-64 lg:mr-10">
        <section className="border-gray-400 p-5 w-full ">
          <div className="flex flex-col gap-y-3 w-full">
            <div className="flex justify-between gap-x-3 items-center w-full">
              <div
                ref={containerRef}
                className="flex flex-row gap-x-3 w-full "
              >
                <div className="relative flex flex-row gap-x-3 ">

                  {openCreateVoucher && (
                    <div className="absolute left-0 right-0 top-0 bottom-0 bg-white z-10 p-5">
                      <h1 className="text-2xl font-semibold">Create Voucher</h1>
                      <Formik
                        initialValues={{
                          ...initialCreateVoucherValues,
                          no: generateVoucherNumber(),
                          classExp: "",
                          subclass: "",
                        }}
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
                          }
                        }}
                      >
                        {({ values, setFieldValue }) => (
                          <Form>
                            <div className="grid grid-cols-3 gap-5 grid-flow-dense place-content-center">
                              {CreateVoucherElements}
                              <button
                                type="submit"
                                className="bg-primary text-black font-bold h-fit m-auto w-full p-2 mt-8 rounded-md"
                              >
                                Create Voucher
                              </button>
                              <button
                                onClick={() => setCreateVoucher(false)} // Close button
                                className="bg-red-500 text-white font-bold h-fit m-auto w-full p-2 mt-8 rounded-md"
                              >
                                Close
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
                        initialValues={editVoucherData}
                        validationSchema={CreateVoucherSchema}
                        onSubmit={async (values, actions) => {
                          try {
                            const response = await updateVoucherMutation.mutateAsync({
                              id: editVoucherData._id,
                              data: values,
                            });
                            if (response.status === 200) {
                              toast.success("Voucher updated successfully");
                            }
                            actions.resetForm();
                            setEditVoucher(false);
                            setEditVoucherData(null);
                          } catch (error) {
                            toast.error("Error updating voucher");
                          }
                        }}
                      >
                        {({ values }) => (
                          <Form>
                            <div className="grid grid-cols-3 gap-5 grid-flow-dense place-content-center">
                              {CreateVoucherElements}
                              <button
                                type="submit"
                                className="bg-primary text-black font-bold h-fit m-auto w-full p-2 mt-8 rounded-md"
                              >
                                Update Voucher
                              </button>
                              <button
                                onClick={() => {
                                  setEditVoucher(false); // Close button
                                  setEditVoucherData(null); // Reset edit voucher data
                                }}
                                className="bg-red-500 text-white font-bold h-fit m-auto w-full p-2 mt-8 rounded-md"
                              >
                                Close
                              </button>

                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  )}

                  {/* View Voucher Details Modal */}
                  {viewVoucherData && (
                    <div
                      id="voucher-details"
                      className="absolute left-0 right-0 top-0 bottom-0 bg-white z-10 p-5"
                    >
                      <h1 className="text-2xl font-bold text-white mb-4 bg-green-900 text-center p-5">
                        HR HERBS REPUBLIC
                      </h1>

                      <table className="min-w-full bg-white border border-gray-300">
                        <tr>
                          <td className="p-2 text-center font-bold border-0">
                            <div className="border border-gray-300 w-2/3 rounded-md p-2">
                              DISBURSEMENT VOUCHER
                            </div>
                          </td>
                          <td className="p-2">
                            No:<span className="underline">{viewVoucherData.no}</span>
                          </td>
                        </tr>

                        <tbody>
                          <tr>
                            <td className="p-2 border border-gray-300">
                              <p className="font-bold text-sm">PAYMENT TO:</p>
                              <p className="font-normal text-lg">{viewVoucherData.payment_to}</p>
                            </td>
                            <td className="p-2 border border-gray-300">
                              <p className="font-bold text-sm">VN</p>
                              <p className="font-normal text-lg">{viewVoucherData.vn}</p>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border border-gray-300 font-bold">
                              <p className="font-bold text-sm">AMOUNT</p>
                              <p className="font-normal text-lg">{viewVoucherData.amount}</p>
                            </td>
                            <td className="p-2 border border-gray-300">
                              <p className="font-bold text-sm">DATE</p>
                              <p className="font-normal text-lg">{viewVoucherData.date}</p>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border border-gray-300 font-bold" colSpan="2">
                              <p className="font-bold text-sm">ADDRESS</p>
                              <p className="font-normal text-lg">{viewVoucherData.address}</p>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border border-gray-300 font-bold" colSpan="2">
                              <p className="font-bold text-sm">DESCRIPTION OF PAYMENT</p>
                              <p className="font-normal text-lg">{viewVoucherData.descOfPayment}</p>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border border-gray-300 font-bold">
                              <p className="font-bold text-sm">BANK ACCOUNT</p>
                              <p className="font-normal text-lg">{viewVoucherData.bankAcc}</p>
                            </td>
                            <td className="p-2 border border-gray-300">
                              <p className="font-bold text-sm">CHECK NUMBER</p>
                              <p className="font-normal text-lg">{viewVoucherData.checkNum}</p>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border border-gray-300 font-bold" colSpan="2">
                              <p className="font-bold text-sm">PERFORMA INVOICE NO</p>
                              <p className="font-normal text-lg">{viewVoucherData.invoiceNo}</p>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border border-gray-300 font-bold">
                              <p className="font-bold text-sm">CLASS</p>
                            </td>
                            <td className="p-2 border border-gray-300">
                              <p className="font-bold text-sm">SUBCLASS</p>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border border-gray-300 font-bold">
                              <p className="font-normal text-lg">{viewVoucherData.classExp}</p>
                            </td>
                            <td className="p-2 border border-gray-300">
                              <p className="font-normal text-lg">{viewVoucherData.subclass}</p>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border border-gray-300 font-bold">
                              <p>
                                <br />
                              </p>
                              <p className="font-normal text-lg text-center">
                                {viewVoucherData.preparedBy}
                              </p>
                              <div className="w-1/2 border-10 border-black p-2 mx-auto">
                                <p className="font-bold text-sm text-center border-t  border-black">
                                  PREPARED BY
                                </p>
                              </div>
                            </td>
                            <td className="p-2 border border-gray-300 font-bold">
                              <p>
                                <br />
                              </p>
                              <p className="font-normal text-lg text-center">
                                {viewVoucherData.accounting}
                              </p>
                              <div className="w-1/2 border-10 border-black p-2 mx-auto">
                                <p className="font-bold text-sm text-center border-t  border-black">
                                  ACCOUNTING
                                </p>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border border-gray-300 font-bold">
                              <p className="font-bold text-sm">APPROVED BY:</p>
                              <br></br>
                              <p className="font-normal text-lg text-center"></p>
                              <div className="w-1/2 border-10 border-black p-2 mx-auto">
                                <p className="font-bold text-sm text-center border-t  border-black">
                                  LOUIE T. LACANILAO
                                </p>
                              </div>
                            </td>
                            <td className="p-2 border border-gray-300 font-bold">
                              <p>
                                <br />
                                <br />
                             
                              </p>
                              <p className="font-normal text-lg text-center"></p>
                              <div className="w-1/2 border-10 border-black p-2 mx-auto">
                                <p className="font-bold text-sm text-center border-t  border-black">
                                  JAICEL T. LACANILAO
                                </p>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border border-gray-300 font-bold" colSpan="2">
                              <p className="font-bold text-sm">RECEIVED BY:</p>
                              <br />
              
                              <div className="w-1/2 border-10 border-black p-2">
                              <p className="font-normal text-lg text-center mb-2">
                                {viewVoucherData.receivedBy}
                              </p>
                                <p className="font-bold text-sm text-center border-t  border-black">
                                  PRINTED NAME OVER SIGNATURE & VALID I.D
                                </p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                       {/* Close and Download buttons */}
                       <div className="mt-4 flex justify-end space-x-2">
                        <button onClick={downloadPDF} className="bg-blue-500 text-white p-2 rounded-md">
                          Download PDF
                        </button>
                        <button
                          onClick={() => setViewVoucherData(null)}
                          className="bg-red-500 text-white p-2 rounded-md"
                        >
                          Close
                        </button>
                      </div>

                    </div>
                  )}

                  <Section style="bg-white flex flex-col gap-5 w-full overflow-x-auto">
                    <div className="flex flex-row gap-5 self-end mb-6">
                      <input
                        type="text"
                        placeholder="Search vouchers"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)} // Update search query
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
                            onViewClick={() => handleViewClick(voucher)}  // Added view button
                            onStatusChange={handleStatusChange} // Function to handle status updates
                          />
                        ))}
                      </TableCont>
                    )}
                  </Section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
