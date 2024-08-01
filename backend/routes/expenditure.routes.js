import express from 'express';
const router = express.Router();
import { 
    createExpenditure, 
    getAllExpenditure, 
    getExpenditureById, 
    updateExpenditureById, 
    deleteExpenditureById 
} from '../controllers/expenditure.controller.js';

// Create a new expenditure
router.post('/', createExpenditure);

// Get all expenditures
router.get('/', getAllExpenditure);

// Get an expenditure by ID
router.get('/:id', getExpenditureById);

// Update an expenditure by ID
router.put('/:id', updateExpenditureById);

// Delete an expenditure by ID
router.delete('/:id', deleteExpenditureById);

export default router;
