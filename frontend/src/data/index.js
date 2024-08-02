const initialCreateProdValues = {
    paymentto: "",
    amount: "",
    address: "",
    descofpayment: "",
    class: "",
    subclass: "",
    productName: "",
    description: "",
    quantity: "",
    color: "",
    arrivalDate: "",
    expirationDate: "",
    lotNo: "",
    pricingModel: "",
    price: "",
    invoiceNo: "",
    DeliveredBy: "",
    DoneBy: "",

};
const ProdAddInfoFieldsData = [{
        name: "color",
        type: "string",
        label: "Color (Optional)",
        placeholder: '#EEEE'
    },
    {
        name: "arrivalDate",
        type: "date",
        label: "Arrival Date",
        placeholder: "2/25/2003"
    },
    {
        name: "expirationDate",
        type: "date",
        label: "Expiration Date",
        placeholder: "2/26/2003"
    },
    {
        name: "lotNo",
        type: "number",
        label: "Lot No.",
        placeholder: "44552"
    },
];
const ProdInfoFieldsData = [{
        name: "productName",
        type: "text",
        label: "Product Name",
        placeholder: "Protec Zinc"
    },
    {
        name: "description",
        type: "textarea",
        label: "Description",
        placeholder: "To boost immunity system"
    },
    {
        name: "quantity",
        type: "number",
        label: "Quantity",
        placeholder: "99",
    },
    {
        name: "metrics",
        type: "select",
        label: "Metrics",
        option: [
            { value: "kg", label: "kg" },
            { value: "per piece/s", label: "per piece/s" },
            { value: "g", label: "g" },
            { value: "mg", label: "mg" },
        ],
    },
    {
        name: "category",
        type: "select",
        label: "Category",
        option: [
            { value: "amox", label: "Amox" },
            { value: "rifabutin", label: "Rifabutin" },
            { value: "bexarotene", label: "Bexarotene" },
            { value: "lorlatinib", label: "Lorlatinib" },
        ],
    },
    {
        name: "type",
        type: "select",
        label: "Type",
        option: [
            { value: "Active Materials", label: "Active Materials" },
            { value: "Non Active", label: "None Active" },
            { value: "Chemical", label: "Chemical" },
        ],
    },
];

const PricingInfoFieldsData = [{
        name: "pricingModel",
        type: "select",
        label: "Pricing Model",
        option: [
            { value: "standard", label: "Standard" },
            { value: "hourly", label: "Hourly" },
            { value: "fixed", label: "Fixed" },
            { value: "equity", label: "Equity" },
        ],
    },
    {
        name: "price",
        type: "number",
        label: "Price",
        placeholder: "$300"
    },
    {
        name: "currency",
        type: "select",
        label: "Currency",
        option: [
            { value: "usd", label: "USD" },
            { value: "php", label: "PHP" },
            { value: "aed", label: "AED" },
        ],
    },
];

const OrderInfoFieldsData = [{
        name: "invoiceNo",
        type: "number",
        label: "Invoice No.",
        placeholder: "44556677"
    },

    {
        name: "deliveredBy",
        type: "string",
        label: "Delivered By",
        placeholder: "Jerome Gabriel Gaspar"
    },
    {
        name: "doneBy",
        type: "string",
        label: "Done By",
        placeholder: "Karl Solis"
    },
    {
        name: "image",
        type: "file",
        label: "Select Image",
    },
];
const PaymentData = [{
    name: "preparedby",
    type: "string",
    label: "Prepared By",
    placeholder: ''
},
{
    name: "accounting",
    type: "text",
    label: "Accounting",
    placeholder: ""
},
{
    name: "approvedby",
    type: "text",
    label: "Approved By",
    placeholder: "Louie Lacanilao"
},
{
    name: "approvedby",
    type: "text",
    label: "",
    placeholder: "Jaicel Lacanilao"
},
{
    name: "paymentto",
    type: "text",
    label: "Payment To",
    placeholder: "MDLD"
},

{
    name: "address",
    type: "text",
    label: "Address",
    placeholder: "San Leonardo",
},
{
    name: "descofpayment",
    type: "text",
    label: "Description of Payment",
    placeholder: "Sodium Ascorbate Bulk USP",
},
{
    name: "bank",
    type: "text",
    label: "Bank",
    placeholder: "RCBC",
},
{
    name: "amount",
    type: "number",
    label: "Amount",
    placeholder: "PHP"
},
{
    name: "checkno",
    type: "number",
    label: "Check Number",
    placeholder: ""
},
{
    name: "class",
    type: "select",
    label: "Class",
    option: [
        { value: "101", label: "101" },
        { value: "102", label: "102" },
        { value: "103", label: "103" },
        { value: "104", label: "104" },
    ],
},
{
    name: "sublass",
    type: "text",
    label: "Subclass",
    placeholder: "Raw Materials",
},

];

export {
    initialCreateProdValues,
    OrderInfoFieldsData,
    ProdInfoFieldsData,
    PricingInfoFieldsData,
    ProdAddInfoFieldsData,
    PaymentData
};