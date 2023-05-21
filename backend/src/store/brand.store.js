const db = require("../services/db")

module.exports = {
    create: async (name) => db("brands").insert({name: name}, "brandId"),
    getAll: async () => db("brands").select("*"),
}