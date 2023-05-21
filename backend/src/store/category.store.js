const db = require("../services/db")

module.exports = {
    create: async (name) => db("categories").insert({name: name}, "categoryId"),
    getAll: async () => db("categories").select("*"),
}