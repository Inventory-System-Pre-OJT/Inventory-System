import mongoose from 'mongoose';

const expenditureSchema = new mongoose.Schema({
    classExp: {
        type: Number,
        required: true,
    },
    subclasses: [{
        name: {
            type: String,
            
        }
    }],
}, { timestamps: true });

const Expenditure = mongoose.model('Expenditure', expenditureSchema);

export default Expenditure;
