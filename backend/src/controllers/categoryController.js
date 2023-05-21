const asyncHandler = require("../asyncHandler");
const categoryStore = require("../store/category.store")
const ApiError = require("../error/ApiError")

module.exports = {
    add: asyncHandler(async (req, res, next) => {
        const {name} = req.body;
        const category = await categoryStore.create(name)
        if (category && Object.keys(category).length) {
            res.json("Category Added");
        } else {
            res.json("Category adding error");
        }
    }),
    getAll: asyncHandler(async (req, res, next) => {
        const categories = await categoryStore.getAll();
        if(categories && Object.keys(categories).length){
            res.json(categories);
        } else {
            res.json("There are no categories");
        }
    })
}