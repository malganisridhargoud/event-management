import express from "express";
import { allowRoles } from "../middlewares/role.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";
import {
  getAllUsers,
  getPendingEvents,
  getAllRegistrations,
  getAdminAnalytics
} from "../controllers/admin.controller.js";

const router = express.Router();

router.use(auth, allowRoles("admin"));

router.get("/users", getAllUsers);
router.get("/pending-events", getPendingEvents);
router.get("/registrations", getAllRegistrations);
router.get("/analytics", getAdminAnalytics);

export default router;
