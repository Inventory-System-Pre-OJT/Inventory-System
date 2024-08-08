// src/data/index.js

const tableHeadData = [
  { name: "No" },
  { name: "Amount" },
  { name: "Date" },
  { name: "Address" },
  { name: "Payment Desc" },
  { name: "Bank Account" },
  { name: "Check Number" },
  { name: "Invoice No." },
  { name: "Class" },
  { name: "Subclass" },
  { name: "Prepared By" },
  { name: "Accounting" },
  { name: "Approved By" },
];

const initialCreateVoucherValues = {
  no: "",
  amount: "",
  date: "",
  address: "",
  descOfPayment: "",
  bankAcc: "",
  checkNum: "",
  invoiceNo: "",
  classExp: "",
  subclass: "",
  preparedBy: "",
  accounting: "",
  approvedBy: "",
};

const VoucherInfoFieldsData = (classExpOptions = [], subclassOptions = []) => [
  { name: "no", type: "number", label: "Number #", placeholder: "#12345" },
  { name: "amount", type: "string", label: "Amount", placeholder: "$99M" },
  { name: "date", type: "date", label: "Date", placeholder: "08/07/2004" },
  { name: "address", type: "string", label: "Address", placeholder: "1234 Asawa Ni Marie NE" },
  { name: "descOfPayment", type: "string", label: "Description of Payment", placeholder: "Zinc Supplies" },
  { name: "bankAcc", type: "string", label: "Bank Account", placeholder: "Landbank" },
  { name: "invoiceNo", type: "number", label: "Invoice No", placeholder: "24425" },
  {
    name: "classExp",
    type: "select",
    label: "Class",
    placeholder: "101",
    options: classExpOptions.map(option => ({
      value: String(option.value), // Ensure value is a string
      label: option.label,
    })),
  },
  {
    name: "subclass",
    type: "select",
    label: "Subclass",
    placeholder: "raw_material",
    options: subclassOptions.map(option => ({
      value: String(option.value), // Ensure value is a string
      label: option.label,
    })),
  },
  { name: "checkNum", type: "number", label: "Check Number", placeholder: "22244455" },
  { name: "preparedBy", type: "string", label: "Prepared By", placeholder: "Mr Solis" },
  { name: "accounting", type: "string", label: "Accounting", placeholder: "Mrs Solis" },
  { name: "approvedBy", type: "string", label: "Approved By", placeholder: "Mrs Solis" },
];


const tableHeadDataExpenditure = [
  { name: "classExp" },
  { name: "subclass" },
];

const initialCreateExpenditureValues = {
  classExp: "",
  subclass: "",
};

const ExpenditureInfoFieldsData = [
  { name: "classExp", type: "number", label: "Class", placeholder: "101" },
  { name: "subclass", type: "string", label: "Subclass", placeholder: "utilities" },
];

export {
  initialCreateVoucherValues,
  VoucherInfoFieldsData,
  tableHeadData,
  initialCreateExpenditureValues,
  ExpenditureInfoFieldsData,
  tableHeadDataExpenditure,
};
