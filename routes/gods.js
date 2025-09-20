const router = require("express").Router();
const godsController = require("../controllers/gods");
const validation = require("../middleware/validate");

router.get("/", godsController.getAll);
router.get("/:id", godsController.getSingle);
router.post("/", validation.saveGod, godsController.createGod);
router.put("/:id", validation.saveGod, godsController.updateGod);
router.delete("/:id", godsController.deleteGod);

module.exports = router;
