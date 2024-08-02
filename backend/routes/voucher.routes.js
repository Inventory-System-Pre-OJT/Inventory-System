import express from 'express';
const router = express.Router();
import { createVoucher, getAllVouchers, getVoucherById, updateVoucherById, deleteVoucherById } from '../controllers/voucher.controllers.js';

// Create a new voucher
router.post('/create', createVoucher);

// Get all vouchers
router.get('/get', getAllVouchers);

// Get a single voucher by ID
router.get('/get/:id', getVoucherById);

// Update a voucher by ID
router.put('/update/:id', updateVoucherById);

// Delete a voucher by ID
router.delete('/delete/:id', deleteVoucherById);

export default router;
