import express from "express";
import { User } from "../../models";

const router = express.Router();

/**
 * POST /api/users/login
 * @summary Login and redirect to the overview page,
 *   otherwise return an error message and code.
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
      res
        .json({ user: userData, message: "Logged in successfully" })
        .redirect("/dashboard/");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * POST /api/users/logout
 * @summary Logout and destroy the session
 */
router.post("/logout", (req, res) => {
  req.session.logged_in
    ? req.session.destroy(() => {
        res.status(204).end();
      })
    : res.status(404).end();
});

export default router;