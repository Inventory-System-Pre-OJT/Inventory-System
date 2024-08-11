import express from 'express';
import {
    createExpenditure,
    getAllExpenditure,
    getExpenditureById,
    updateExpenditureById,
    deleteExpenditureById,
    getSubclassesByClass,
    getExpenditureByClassAndSubclass
} from '../controllers/expenditure.controller.js';

const router = express.Router();

router.post('/', createExpenditure);
router.get('/', getAllExpenditure);
router.get('/:id', getExpenditureById);
router.put('/:id', updateExpenditureById);
router.delete('/:id', deleteExpenditureById);
router.get('/class/:classExp', getSubclassesByClass);
router.get('/class/:classExp/subclass/:subclass', getExpenditureByClassAndSubclass); // New route

export default router;  
