const asyncHandler = require("../asyncHandler");
const itemStore = require("../store/item.store")
const ApiError = require("../error/ApiError")
const uuid = require("uuid")
const path = require("path")

module.exports = {
    add: asyncHandler(async (req, res, next) => {
        try {
            const itemData = req.body
            const {image} = req.files

            itemData.image = uuid.v4() + ".jpg"
            console.log(itemData)
            image.mv(path.resolve(__dirname, '..', 'static', itemData.image))
            const item = await itemStore.create(itemData);
            res.json("Item Added");
        }catch (e) {
            next(ApiError.internalError(e.message))
        }
        
    }),
    getAll: asyncHandler(async (req, res, next) => {

        let {categoryId, brandId, limit, page} = req.query
        categoryId = categoryId || null
        brandId = brandId || null
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let items = await itemStore.getAll(categoryId, brandId, limit, offset)
        if(items && Object.keys(items).length){
            res.json(items);
        } else {
            res.json([]);
        }
    }),
    getOne: asyncHandler(async (req, res, next) => {
        let {id} = req.params
        if(id){
            let item = await itemStore.getOne(id)

            if(item && Object.keys(item).length){
                res.json(item);
            } else {
                res.json("There are no items");
            }
        }
        else{
            return next(ApiError.badRequest("ID is empty"))
        }
    }),
    countAll: asyncHandler(async (req, res, next) => {
        const cnt = await itemStore.countAll()
        console.log(cnt[0])
        res.json(cnt[0]);
    }),
    countByFilter: asyncHandler(async (req, res, next) => {
        let {categoryId, brandId} = req.query
        categoryId = categoryId || null
        brandId = brandId || null
        const cnt = await itemStore.countByFilter()
        console.log(cnt[0])
        res.json(cnt[0]);
    })
}