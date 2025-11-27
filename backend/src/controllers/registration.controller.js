import Event from "../models/event.model.js";
import Registration from "../models/registration.model.js";

export const registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event || !event.approved)
      return res.status(404).json({ message: "Event not available" });

    const count = await Registration.countDocuments({ event: eventId });

    if (event.capacity && count >= event.capacity)
      return res.status(400).json({ message: "Event full" });

    const exists = await Registration.findOne({ event: eventId, user: req.user.id });
    if (exists) return res.status(400).json({ message: "Already registered" });

    const reg = await Registration.create({ event: eventId, user: req.user.id });
    res.json(reg);

  } catch (err) { res.status(500).json({ message: err.message }); }
};

// User's registrations
export const getMyRegistrations = async (req, res) => {
  try {
    const regs = await Registration.find({ user: req.user.id })
      .populate("event");

    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
