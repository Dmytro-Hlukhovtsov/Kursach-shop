const router = require("express").Router();
const categoryController = require("../controllers/categoryController")

const asyncHandler = require("../asyncHandler");

router.get(
    "/",categoryController.getAll)
router.post(
    "/",categoryController.add)
router.put(
    "/",)

module.exports = router;