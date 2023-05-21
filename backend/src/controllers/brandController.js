const asyncHandler = require("../asyncHandler");
const brandStore = require("../store/brand.store")
const ApiError = require("../error/ApiError")

module.exports = {
    add: asyncHandler(async (req, res, next) => {
        const {name} = req.body;
        const brand = await brandStore.create(name)
        if (brand && Object.keys(brand).length) {
            res.json("Brand Added");
        } else {
            res.json("Brand adding error");
        }
    }),
    getAll: asyncHandler(async (req, res, next) => {
        const brands = await brandStore.getAll();
        if(brands && Object.keys(brands).length){
            res.json(brands);
        } else {
            res.json("There are no brands");
        }
    })
}