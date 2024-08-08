import mongoose from "mongoose";

const stockSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: String,
        required: true
    },
    invoice_no: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    expiration_date: {
        type: String,
        required: true
    },
    scan_copy: {
        type: String,
        required: true
    },
    done_by: {
        type: String,
        required: true
    },
    rt_status: {
        type: Boolean,
    }
});

export const Stock = mongoose.model('Stock', stockSchema);