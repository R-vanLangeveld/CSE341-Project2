const router = require("express").Router();
const usersController = require("../controllers/users");
const validation = require("../middleware/validate");

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getSingleUser);
router.post("/", validation.saveUser, usersController.createUser);
router.put("/:id", validation.saveUser, usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
