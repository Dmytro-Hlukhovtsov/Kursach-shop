const router = require("express").Router();
const basketController = require("../controllers/basketController")
const authMiddleware = require("../middlewares/authMiddleware")

router.get("/",authMiddleware, basketController.getItems)
router.post("/",authMiddleware, basketController.addToBasket)
router.put("/count",authMiddleware, basketController.changeCount)
router.delete("/:itemId",authMiddleware, basketController.deleteItem)
module.exports = router