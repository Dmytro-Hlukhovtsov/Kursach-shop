const asyncHandler = require("../asyncHandler")
const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userStore = require("../store/user.store")
const basketStore = require("../store/basket.store");

const generateJwt = (id, email, role, basketId) => {
    return jwt.sign(
        {id, email, role, basketId},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

module.exports = {
    registration: asyncHandler(async (req, res, next) => {
        const {email, password, role, username} = req.body
        let user
        if(!email && !password) {
            return next(ApiError.internalError("Incorrect email or password"))
        }
        user = await userStore.getUserByEmail(email)
        if(user && Object.keys(user).length){
            return next(ApiError.internalError("User with such email already exists"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        user = await userStore.createUser(email, hashPassword, role, username)
        const token = generateJwt(user.userId, user.email, user.role)
        return res.json({token})
    }),
    login: asyncHandler(async (req, res, next) => {
        const {email, password} = req.body
        const user = await userStore.getUserByEmail(email)
        if(!user || Object.keys(user).length == 0){
            return next(ApiError.internalError("User with such email doesn't exist"))
        }
        const basketId = await basketStore.getBasket(user[0].userId)
        let comparePassword = bcrypt.compareSync(password, user[0].password)
        if(!comparePassword){
            return next(ApiError.internalError("Password incorrect"))
        }
        const token = generateJwt(user[0].userId, user[0].email, user[0].role, basketId[0].basketId)
        return res.json({token})

    }),
    auth: asyncHandler(async (req, res, next) => {
        const basketId = await basketStore.getBasket(req.user.id)
        const token = generateJwt(req.user.id, req.user.email, req.user.role, basketId[0].basketId)
        return res.json({token})
    }),
}