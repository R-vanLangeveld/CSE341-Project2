const router = require("express").Router();
const godsController = require("../controllers/gods");
const validation = require("../middleware/validate");
const auth = require("../middleware/authenticate");

router.get("/", godsController.getAllGods);
router.get("/:id", godsController.getSingleGod);
router.post("/", 
  // auth.isAuthenticated, 
  validation.saveGod, godsController.createGod);
router.put("/:id", 
  // auth.isAuthenticated, 
  validation.saveGod, godsController.updateGod);
router.delete("/:id", 
  // auth.isAuthenticated, 
  godsController.deleteGod);

module.exports = router;
