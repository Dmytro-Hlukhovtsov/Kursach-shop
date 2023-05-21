const db = require("../services/db")

module.exports = {
    create: async (itemData) =>
        db.transaction(async trx => {
            const {description, title} = itemData
            delete itemData.description
            delete itemData.title
            const addItem = await trx("items").insert(itemData, "itemId")
            console.log(addItem[0])
            await trx("item_info").insert({ itemId: addItem[0].itemId, title: title || '', description: description ||  ''});

        }),
    getAll: async (categoryId, brandId, limit, offset) =>
        db
            .select(
            "items.itemId",
            "items.name",
            "items.price",
            "items.image",
            "categories.name as category",
            "brands.name as brand"
            )
            .from("items")
            .join("categories", "categories.categoryId", "=", "items.categoryId")
            .join("brands", "brands.brandId", "=", "items.brandId")
            .where((qb)=>{
                if(categoryId && brandId){
                    qb.where("items.categoryId", categoryId).andWhere("items.brandId", brandId)
                }
                if(categoryId && !brandId){
                    qb.where("items.categoryId", categoryId)
                }
                if(!categoryId && brandId){
                    qb.where("items.brandId", brandId)
                }
            })
            .limit(limit)
            .offset(offset),
    getOne: async (itemId) =>

        db
            .select(
                "items.itemId",
                "items.name",
                "items.price",
                "items.image",
                "categories.name as category",
                "brands.name as brand",
                "item_info.title as title",
                "item_info.description as description"
            )
            .from("items")
            .join("categories", "categories.categoryId", "=", "items.categoryId")
            .join("brands", "brands.brandId", "=", "items.brandId")
            .join("item_info", "items.itemId", "=",  "item_info.itemId")
            .where("items.itemId", itemId),
    countAll: async () =>
        db("items").count("itemId"),
    countByFilter: async (categoryId, brandId) =>
        db("items")
            .count("itemId")
            .where((qb)=>{
            if(categoryId && brandId){
                qb.where("items.categoryId", categoryId).andWhere("items.brandId", brandId)
            }
            if(categoryId && !brandId){
                qb.where("items.categoryId", categoryId)
            }
            if(!categoryId && brandId){
                qb.where("items.brandId", brandId)
            }
        })

}