const router = require("express").Router();
const User = require("../models/User");
const Note = require("../models/Note");
const { auth, isAdmin } = require("../middleware/auth");

// Admin stats
router.get("/stats", auth, isAdmin, async (req, res) => {
  try {
    const users = await User.countDocuments();
    const notes = await Note.countDocuments();

    res.json({ users, notes });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;