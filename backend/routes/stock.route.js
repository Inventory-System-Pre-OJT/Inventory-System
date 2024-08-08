import express from "express";
import { getStocks, postStock, updateStock, searchStock, destroyStock  } from "../controllers/stock.controller.js";

const router = express.Router();

router.get("/getStock", getStocks);
router.get("/searchStock", searchStock);
router.delete("/destroyStock", destroyStock);
router.post("/postStock", postStock);
router.post("/updateStock", updateStock);

export default router;

