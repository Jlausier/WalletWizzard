import express from "express";
import { User } from "../../models";

const router = express.Router();

/**
 * POST /api/users/login
 */
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "No user found with that email address" });
      return;
    }

    const isValidPassword = await userData.checkPassword(req.body.password);

    if (!isValidPassword) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.isSoftDeleted;
      req.session.logged_in = true;

      res.json({ user: userData, message: "Logged in successfully" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

export default router;
