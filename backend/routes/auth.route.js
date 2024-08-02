import express from "express";
import { login, logout, register, authCheck } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/authCheck", authCheck);

export default router;