import express from "express";
import { register, loginUser, loginAdmin } from "../controllers/auth.controller.js";

const router = express.Router();

// Registration (same for both)
router.post("/register", register);

// Separate logins for User and Admin
router.post("/login-user", loginUser);
router.post("/login-admin", loginAdmin);

export default router;
