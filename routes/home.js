const express = require(`express`);
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Projekt ISI",
    message: "Hello",
  });
});

module.exports = router;
