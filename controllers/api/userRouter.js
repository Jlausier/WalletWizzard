import express from "express";
import { User } from "../../models/index.js";

const router = express.Router();

/**
 * POST /api/users/
 * @summary Create a new user and redirect to the overview page,
 *   otherwise return an error message and code.
 */
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res
        .json({ user: userData, message: "Created user successfully" })
        .redirect("/dashboard/overview");
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

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
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res
        .json({ user: userData, message: "Logged in successfully" })
        .redirect("/dashboard/overview");
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
