import express from 'express';
const router = express.Router();
import { 
    createExpenditure, 
    getAllExpenditure, 
    getExpenditureById, 
    updateExpenditureById, 
    deleteExpenditureById,
    //getOptions,
    getClassExpOptions,
    getSubclassesByClassExp

 
} from '../controllers/expenditure.controller.js';

// Create a new expenditure
router.post('/create', createExpenditure);

// Get all expenditures
router.get('/get', getAllExpenditure);

// Get an expenditure by ID
router.get('/get/:id', getExpenditureById);

// Update an expenditure by ID
router.patch('/update/:id', updateExpenditureById);

// Delete an expenditure by ID
router.delete('/delete/:id', deleteExpenditureById);

//router.get('/options', getOptions);

// Get all classExp options
router.get('/class', getClassExpOptions);

// Get subclasses by classExp
router.get('/subclasses/:classExp', getSubclassesByClassExp);

export default router;
