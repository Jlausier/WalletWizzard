import express from "express";
import { User } from "../../models/index.js";

const router = express.Router();

/**
 * Create a new user and redirect to the overview page, otherwise return an error message and code.
 *
 * @summary POST /api/users/
 */
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.logged_in = true;
      res
        .status(200)
        .json({ user: userData, message: "Created user successfully" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
``;
/**
 * Login and redirect to the overview page, otherwise return an error message and code.
 *
 * @summary POST /api/users/login
 */
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    // No user exists with that `email`
    if (!userData) {
      res
        .status(400)
        .json({ message: "No user found with that email address" });
      return;
    }

    const isValidPassword = await userData.checkPassword(req.body.password);
    // Password is incorrect
    if (!isValidPassword) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.logged_in = true;
      res
        .status(200)
        .json({ user: userData, message: "Logged in successfully" });
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

/**
 * Logout and destroy the session
 *
 * @summary POST /api/users/logout
 */
router.post("/logout", (req, res) => {
  req.session.logged_in
    ? req.session.destroy(() => {
        res.status(204).end();
      })
    : res.status(404).end();
});

export default router;
