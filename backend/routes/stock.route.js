import express from "express";
import { getStocks, postStock, updateStock, searchStock  } from "../controllers/stock.controller.js";

const router = express.Router();

router.get("/getStock", getStocks);
router.get("/postStock", searchStock);
router.post("/postStock", postStock);
router.post("/postStock", updateStock);

export default router;

