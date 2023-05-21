const db = require("../services/db")

module.exports = {
    getUserByEmail: async (email) =>
        await db.select("*").from("users").where("email", email),
    createUser: async (email, password, role, username) =>
        db.transaction(async trx => {
            const addedUser = await trx("users").insert({email, password, role, username}, "*")
            await trx("basket").insert({userId: addedUser[0].userId})
            return addedUser[0]
        })

}