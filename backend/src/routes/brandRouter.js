const router = require("express").Router();
const brandController = require("../controllers/brandController")


router.get(
    "/", brandController.getAll)
router.post(
    "/", brandController.add)
router.put(
    "/",)

module.exports = router;