import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    pblame_name: {
        type: String,
        required: true
    }
});

export const Stock = mongoose.model('Stock', stockSchema);