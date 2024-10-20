import Voucher from '../models/voucher.model.js';

// Create a new voucher
export const createVoucher = async (req, res) => {
    const { no, payment_to, vn, amount, date, address, descOfPayment, bankAcc, checkNum, invoiceNo, classExp, subclass, preparedBy, accounting, approvedBy,receivedBy,status } = req.body;

    try {
        const voucher = new Voucher({ no,payment_to,vn, amount, date, address, descOfPayment, bankAcc,checkNum, invoiceNo, classExp, subclass, preparedBy, accounting, approvedBy,receivedBy,  status: status || "Pending"  });
        await voucher.save();
        res.status(201).json(voucher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all vouchers
export const getAllVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.find();
        res.status(200).json(vouchers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a voucher by ID
export const getVoucherById = async (req, res) => {
    try {
        const voucher = await Voucher.findById(req.params.id);
        if (voucher) {
            res.status(200).json(voucher);
        } else {
            res.status(404).json({ message: 'Voucher not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a voucher by ID
export const updateVoucherById = async (req, res) => {
    try {
        const voucher = await Voucher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (voucher) {
            res.status(200).json(voucher);
        } else {
            res.status(404).json({ message: 'Voucher not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update the status of a specific voucher
export const updateVoucherStatus = async (req, res) => {
    const { id } = req.params;  // Get the voucher ID from the request parameters
    const { status } = req.body;  // Get the new status from the request body

    try {
        // Find the voucher by ID and update its status
        const updatedVoucher = await Voucher.findByIdAndUpdate(
            id,  // Voucher ID
            { status },  // Update the status field
            { new: true }  // Return the updated document
        );

        if (!updatedVoucher) {
            return res.status(404).json({ message: "Voucher not found" });
        }

        res.status(200).json(updatedVoucher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a voucher by ID
export const deleteVoucherById = async (req, res) => {
    try {
        const voucher = await Voucher.findByIdAndDelete(req.params.id);
        if (voucher) {
            res.status(200).json({ message: 'Voucher deleted' });
        } else {
            res.status(404).json({ message: 'Voucher not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchVouchers = async (req, res) => {
    try {
        const query = req.body;

        // Find vouchers matching the query parameters
        const vouchers = await Voucher.find(query);
        return res.json(vouchers);
    } catch (error) {
        console.log("searchVouchers Controller Error", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
