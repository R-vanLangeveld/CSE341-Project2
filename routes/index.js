const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=["Hello World"]
  res.send("Hello World");
});

router.get("/sources", (req, res) => {
  //#swagger.tags=["Sources"]
  res.send("<p>Sources:</p><a href='https://www.theoi.com/'>https://www.theoi.com/</a>");
});

router.use("/gods", require("./gods"));

module.exports = router;
