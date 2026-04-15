const router = require("express").Router();
const Note = require("../models/Note");
const { auth } = require("../middleware/auth");
const { noteSchema } = require("../utils/validation");

// CREATE
router.post("/", auth, async (req, res) => {
  const { error } = noteSchema.validate(req.body);
  if (error) return res.status(400).json(error.details);

  const note = await Note.create({
    ...req.body,
    userId: req.user.id
  });

  res.json(note);
});

// READ
router.get("/", auth, async (req, res) => {
  const notes = await Note.find({ userId: req.user.id });
  res.json(notes);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(note);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Note.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  });
  res.json({ msg: "Note deleted" });
});

module.exports = router;