const router = require("express").Router();
const Note = require("../models/Note");
const { auth } = require("../middleware/auth");
const { noteSchema } = require("../utils/validation");

// Create note
router.post("/", auth, async (req, res) => {
  try {
    const { error } = noteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    const { title, content, tags } = req.body;

    const note = await Note.create({
      title,
      content,
      tags,
      userId: req.user.id
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get user notes
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;