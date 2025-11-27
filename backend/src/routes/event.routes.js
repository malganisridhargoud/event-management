import express from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  getEvents,
  getEventDetails,
  createEvent,
  updateEvent,
  deleteEvent,
  approveEvent,
  getUserEvents,
  getUpcomingEvents
} from "../controllers/event.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/details/:id", getEventDetails);
router.get("/upcoming", getUpcomingEvents);
router.get("/user/:id", auth, getUserEvents);

router.post("/", auth, upload.single("image"), createEvent);
router.put("/:id", auth, upload.single("image"), updateEvent);
router.delete("/:id", auth, deleteEvent);

router.put("/:id/approve", auth, allowRoles("admin"), approveEvent);

export default router;

