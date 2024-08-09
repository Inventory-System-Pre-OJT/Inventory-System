const initialCreateProdValues = {
    product_name: "",
    desc: "",
    qty: "",
    color: "",
    date: "",
    expiration_date: "",
    lot_no: "",
    pricing_model: "Standard",
    price: "",
    type: "Active Materials",
    metrics: "kg",
    invoice_no: "",
    receiver: "",
    currency: "USD",
    done_by: "",
    scan_copy: "",
};
const ProdAddInfoFieldsData = [{
        name: "color",
        type: "string",
        label: "Color (Optional)",
        placeholder: '#EEEE'
    },
    {
        name: "date",
        type: "date",
        label: "Arrival Date",
        placeholder: "2/25/2003"
    },
    {
        name: "expiration_date",
        type: "date",
        label: "Expiration Date",
        placeholder: "2/26/2003"
    },
    {
        name: "lot_no",
        type: "number",
        label: "Lot No.",
        placeholder: "44552"
    },
];
const ProdInfoFieldsData = [{
        name: "product_name",
        type: "text",
        label: "Product Name",
        placeholder: "Protec Zinc"
    },
    {
        name: "desc",
        type: "textarea",
        label: "Description",
        placeholder: "To boost immunity system"
    },
    {
        name: "qty",
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
        ],
    },
    // {
    //     name: "grams",
    //     type: "number",
    //     label: "Grams",
    //     placeholder: "100mg per capsule",
    // },
    {
        name: "type",
        type: "select",
        label: "Type",
        option: [
            { value: "active-materials", label: "Active Materials" },
            { value: "non-active-materials", label: "Non Active" },
        ],
    },
];

const PricingInfoFieldsData = [{
        name: "pricing_model",
        type: "select",
        label: "Pricing Model",
        option: [
            { value: "standard", label: "Standard" },
            { value: "Hourly", label: "Hourly" },
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

const getProdInfoFieldsData = (metrics) => {
    const fields = [...ProdInfoFieldsData];
    if (metrics === "mg") {
        fields.push({
            name: "grams",
            type: "number",
            label: "Grams",
            placeholder: "100mg",
        });
    }
    return fields;
};

const OrderInfoFieldsData = [{
        name: "invoice_no",
        type: "number",
        label: "Invoice No.",
        placeholder: "44556677"
    },

    {
        name: "receiver",
        type: "string",
        label: "Delivered By",
        placeholder: "Jerome Gabriel Gaspar"
    },
    {
        name: "done_by",
        type: "string",
        label: "Done By",
        placeholder: "Karl Solis"
    },
    {
        name: "scan_copy",
        type: "file",
        label: "Select Image",
    },
];

export {
    initialCreateProdValues,
    OrderInfoFieldsData,
    ProdInfoFieldsData,
    PricingInfoFieldsData,
    ProdAddInfoFieldsData
};