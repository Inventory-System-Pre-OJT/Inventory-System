import * as Yup from "yup";


const LoginSchema = Yup.object().shape({
    username: Yup.string().required('email  is required'),
    password: Yup.string().required('password  is required')
})

const CreateProdSchema = [

    Yup.object().shape({
        product_name: Yup.string().required("Product name is required"),
        desc: Yup.string().required("Description is required"),
        metrics: Yup.string().required("Metrics is required"),
        type: Yup.string().required("Type is required"),
        qty: Yup.number()
            .required("Quantity is required")
            .positive()
            .integer(),
        color: Yup.string().nullable(true),
        date: Yup.date().required("date is required"),
        expiration_date: Yup.date()
            .min(
                Yup.ref("date"),
                "Expiration date must be after arrival date"
            ).required("Expiration date is required"),
        lot_no: Yup.string().required("Lot No. is required"),
    }),

    Yup.object().shape({
        pricing_model: Yup.string().required('Pricing model is required'),
        price: Yup.number().required('Price is required').positive(),
    }),

    Yup.object().shape({
        invoice_no: Yup.string().required('Invoice number is required'),
        receiver: Yup.string().required('Delivered by is required'),
        done_by: Yup.string().required('Done by is required'),
        scan_copy: Yup.string().nullable(true),
    })

];
export {
    CreateProdSchema,
    LoginSchema
}