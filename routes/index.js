const router = require("express").Router();
const auth = require("../middleware/authenticate");

router.get("/", auth.isAuthenticated, (req, res) => {
  //#swagger.tags=["Hello World"]
  try {
    res.send("<p>Hello World</p>");
  } catch (error) {
    console.error(error);
  }
});

router.get("/sources", (req, res) => {
  //#swagger.tags=["Sources"]
  try {
    res.send("<p>Sources:</p><a href='https://www.theoi.com/'>https://www.theoi.com/</a>");
  } catch (error) {
    console.error(error);
  }
});

router.use("/", require("./swagger"));
router.use("/gods", require("./gods"));

module.exports = router;
