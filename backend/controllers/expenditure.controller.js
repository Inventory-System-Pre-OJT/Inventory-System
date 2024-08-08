import Expenditure from '../models/expenditure.model.js';

// Create a new expenditure
export const createExpenditure = async (req, res) => {
    const { classExp, subclasses } = req.body;

    try {
        // Ensure subclasses is an array of objects
        const expenditure = new Expenditure({ classExp, subclasses });
        await expenditure.save();
        res.status(201).json(expenditure);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all expenditures
export const getAllExpenditure = async (req, res) => {
    try {
        const expenditures = await Expenditure.find();
        res.status(200).json(expenditures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an expenditure by ID
export const getExpenditureById = async (req, res) => {
    try {
        const expenditure = await Expenditure.findById(req.params.id);
        if (expenditure) {
            res.status(200).json(expenditure);
        } else {
            res.status(404).json({ message: 'Expenditure not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an expenditure by ID
export const updateExpenditureById = async (req, res) => {
    try {
        // Use `findByIdAndUpdate` with `req.body` containing updated fields
        const expenditure = await Expenditure.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (expenditure) {
            res.status(200).json(expenditure);
        } else {
            res.status(404).json({ message: 'Expenditure not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an expenditure by ID
export const deleteExpenditureById = async (req, res) => {
    try {
        const expenditure = await Expenditure.findByIdAndDelete(req.params.id);
        if (expenditure) {
            res.status(200).json({ message: 'Expenditure deleted' });
        } else {
            res.status(404).json({ message: 'Expenditure not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


