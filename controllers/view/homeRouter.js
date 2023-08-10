import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("homepage");
});

export default router;
