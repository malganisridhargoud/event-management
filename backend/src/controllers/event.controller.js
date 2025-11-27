import Event from "../models/event.model.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// GET ALL EVENTS (user → approved + own, admin → all)
export const getEvents = async (req, res) => {
  try {
    const user = req.user || null;

    const events = await Event.find().sort({ date: 1 });

    let visible = [];

    if (!user) {
      visible = events.filter(e => e.approved === true);
    } 
    else if (user.role === "admin") {
      visible = events;
    } 
    else {
      visible = events.filter(
        e => e.approved === true || String(e.createdBy) === String(user.id)
      );
    }

    res.json(visible);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getEventDetails = async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id).populate("createdBy", "name email");
    if (!ev) return res.status(404).json({ message: "Event not found" });
    res.json(ev);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    let imageUrl = null;

    if (req.file) {
      if (process.env.CLOUDINARY_CLOUD_NAME) {
        const upload = await cloudinary.uploader.upload(req.file.path);
        imageUrl = upload.secure_url;
        fs.unlinkSync(req.file.path);
      } else {
        imageUrl = `/uploads/${req.file.filename}`;
      }
    }

    const newEvent = await Event.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      capacity: req.body.capacity,
      createdBy: req.user.id,
      image: imageUrl,
      approved: false   // IMPORTANT ✔
    });

    res.json(newEvent);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE EVENT
export const updateEvent = async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ message: "Event not found" });

    if (String(ev.createdBy) !== String(req.user.id) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    Object.assign(ev, req.body);

    if (req.file) {
      let imageUrl;
      if (process.env.CLOUDINARY_CLOUD_NAME) {
        const upload = await cloudinary.uploader.upload(req.file.path);
        imageUrl = upload.secure_url;
        fs.unlinkSync(req.file.path);
      } else {
        imageUrl = `/uploads/${req.file.filename}`;
      }

      ev.image = imageUrl;
    }

    await ev.save();
    res.json(ev);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ message: "Event not found" });

    if (String(ev.createdBy) !== String(req.user.id) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await ev.deleteOne();
    res.json({ message: "Event deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN: APPROVE EVENT
export const approveEvent = async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ message: "Event not found" });

    ev.approved = true;
    await ev.save();
    res.json(ev);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPCOMING EVENTS
export const getUpcomingEvents = async (req, res) => {
  try {
    const now = new Date();
    const next = new Date();
    next.setDate(now.getDate() + 30);

    const ev = await Event.find({
      approved: true,
      date: { $gte: now, $lte: next }
    }).sort({ date: 1 });

    res.json(ev);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// USER EVENTS
export const getUserEvents = async (req, res) => {
  try {
    const ev = await Event.find({ createdBy: req.params.id });
    res.json(ev);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};