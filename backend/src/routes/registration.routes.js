import express from "express";
import { registerForEvent, getMyRegistrations } from "../controllers/registration.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:id/register", auth, registerForEvent);
router.get("/me/all", auth, getMyRegistrations);

export default router;
