import User from "../models/user.model.js";
import Event from "../models/event.model.js";
import Registration from "../models/registration.model.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const getPendingEvents = async (req, res) => {
  const events = await Event.find({ approved: false });
  res.json(events);
};

export const getAllRegistrations = async (req, res) => {
  const regs = await Registration.find().populate("user event");
  res.json(regs);
};

export const getAdminAnalytics = async (req, res) => {
  const users = await User.countDocuments();
  const events = await Event.countDocuments();
  const approved = await Event.countDocuments({ approved: true });
  const pending = await Event.countDocuments({ approved: false });
  const registrations = await Registration.countDocuments();

  res.json({
    total_users: users,
    total_events: events,
    approved_events: approved,
    pending_events: pending,
    total_registrations: registrations
  });
};
