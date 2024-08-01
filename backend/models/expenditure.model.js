import mongoose from 'mongoose';

const expenditureSchema = new mongoose.Schema({
    classExp: {
        type: Number,
        required: true,
    },
    subclass: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Expenditure = mongoose.model('Expenditure', expenditureSchema);

export default Expenditure;
