import mongoose from "mongoose";

const stockSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    invoice_no: {
        type: Number,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    metrics: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    color: {
        type: String
    },
    pricing_model: {
        type: String,
        required: true
    },
    currency: {
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
        type: Date,
        required: true
    },
    expiration_date: {
        type: Date,
        required: true
    },
    scan_copy: {
        type: String
    },
    done_by: {
        type: String,
        required: true
    },
    lot_no: {
        type: Number,
        required: true
    }
    // rt_status: {
    //     type: Boolean
    // }
});

export const Stock = mongoose.model('Stock', stockSchema);