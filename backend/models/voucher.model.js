import mongoose from 'mongoose';

// User Schema
const VoucherSchema = new mongoose.Schema({
  no: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  descOfPayment: {
    type: String,
    required: true,
  },
  bankAcc: {
    type: String,
    required: true,
  },
  invoiceNo: {
    type: Number,
    required: true,
  },
  checkNumber:{
    type:Number,
    required:true
  },
  preparedBy: {
    type: String,
    required: true,
  },
  accounting: {
    type: String,
    required: true,
  },
  approvedBy: {
    type: String,
    required: true,
  },
  expenditureClass: {
    type: String,
    
  },
  expenditureSubclass: {
    type: String,
    
  }
}, { timestamps: true });

const Voucher = mongoose.model('Voucher', VoucherSchema);

export default Voucher;
