import express from 'express';
const router = express.Router();
import { createVoucher, getAllVouchers, getVoucherById, updateVoucherById, deleteVoucherById } from '../controllers/voucher.controllers.js';

// Create a new voucher
router.post('/', createVoucher);

// Get all vouchers
router.get('/', getAllVouchers);

// Get a voucher by ID
router.get('/:id', getVoucherById);

// Update a voucher by ID
router.put('/:id', updateVoucherById);

// Delete a voucher by ID
router.delete('/:id', deleteVoucherById);

export default router;
