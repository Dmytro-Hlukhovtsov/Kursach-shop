const router = require("express").Router();
const itemController = require("../controllers/itemController")

const asyncHandler = require("../asyncHandler");

router.get(
    "/", itemController.getAll)
router.get(
    "/count", itemController.countAll)
router.get(
    "/countFilter", itemController.countByFilter)
router.get(
    "/:id", itemController.getOne)
router.post(
    "/",itemController.add)
router.put(
    "/",)

module.exports = router;