const asyncHandler = require("../asyncHandler");
const ApiError = require("../error/ApiError");
const basketStore = require("../store/basket.store")
module.exports = {
    addToBasket: asyncHandler(async (req,res,next) => {
        try{
            const {itemId} = req.body
            const userId = req.user.id
            const basketId = req.user.basketId
            console.log(req.user)
            await basketStore.add(itemId, basketId)
            res.json("Item added to cart");
        }catch (e) {
            next(ApiError.internalError(e.message))
        }

    }),
    getItems: asyncHandler( async(req,res,next) => {
        try{
            const basketId = req.user.basketId
            console.log(basketId)
            const items = await basketStore.getAll(basketId)
            console.log(items)
            res.json(items)
        }catch (e) {
            console.log(e.message)
            next(ApiError.internalError(e.message))
        }

    }),
    changeCount: asyncHandler(async(req,res,next) => {
        try{
            const basketId = req.user.basketId
            const {itemId, count} = req.body
            const items = await basketStore.changeCount(basketId, itemId, count)
            console.log(items)
            res.json("Count Changed")
        }catch (e) {
            console.log(e.message)
            next(ApiError.internalError(e.message))
        }

    }),

    deleteItem: asyncHandler( async(req,res,next) => {
        try{
            const basketId = req.user.basketId
            const {itemId} = req.params
            const items = await basketStore.deleteItem(basketId, itemId)
            console.log(basketId)
            res.json("Deleted")
        }catch (e) {
            console.log(e.message)
            next(ApiError.internalError(e.message))
        }

    }),

}