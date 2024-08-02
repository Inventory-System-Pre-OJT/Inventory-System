import Voucher from "../models/voucher.model.js";

const createVoucher = async (req, res) => {
    try {
      const {
        no,
        vn,
        name,
        amount,
        date,
        address,
        descOfPayment,
        bankAcc,
        invoiceNo,
        checkNumber,
        preparedBy,
        accounting,
        approvedBy,
        expenditureClass,
        expenditureSubclass
      } = req.body;
      
      // Validate input
      if (!no || !name || !amount) {
        return res.status(400).json({ success: false, message: "Missing required fields: no, name, and amount are required" });
      }
  
      const newVoucher = new Voucher({
        no,
        vn,
        name,
        amount,
        date,
        address,
        descOfPayment,
        bankAcc,
        invoiceNo,
        checkNumber,
        preparedBy,
        accounting,
        approvedBy,
        expenditureClass,
        expenditureSubclass
      });
      
      await newVoucher.save();
      res.status(201).json({ success: true, message: "Voucher created successfully.", voucher: newVoucher });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  

// Read Users
const getVoucher = async (req, res) => {
  try {
    const users = await Voucher.find();
    
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "No users found" });
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update User
const UpdatedVoucher = async (req, res) => {
  try {
    const userId = req.params.id;
    
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const updateuser = await Voucher.findByIdAndUpdate(userId, req.body, { new: true });
    
    if (!updateuser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.status(200).json({ success: true, message: 'User updated successfully', updateuser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Delete User
const DeleteVoucher = async (req, res) => {
  try {
    const userId = req.params.id;
    
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const deletuser = await Voucher.findByIdAndDelete(userId);
    
    if (!deletuser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export { createVoucher, getVoucher, UpdatedVoucher, DeleteVoucher };
      