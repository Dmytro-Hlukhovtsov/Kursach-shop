const db = require("../services/db")

module.exports = {
    add: async (itemId, basketId) => db("basket_item").insert({itemId, basketId}),
    getBasket: async (userId) => db.select("basketId").from("basket").where("userId", userId),
    getAll: async (id) =>
        db
            .select("items.*", "basket_item.count")
            .from("basket_item")
            .join("items","items.itemId", "=","basket_item.itemId")
            .where("basket_item.basketId", id),
    changeCount: async (basketId, itemId, count) =>
        db("basket_item")
            .where({itemId: itemId, basketId: basketId})
            .update("count", count),
    deleteItem: async (basketId, itemId) =>
        db("basket_item")
            .where({itemId: itemId, basketId: basketId})
            .del()


}