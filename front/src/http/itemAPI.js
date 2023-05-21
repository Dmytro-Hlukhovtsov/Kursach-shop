import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createCategory = async (type) => {
    const {data} = await $authHost.post('category', type)
    return data
}

export const fetchCategories = async () => {
    const {data} = await $host.get('category')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('brand', )
    return data
}

export const createItem = async (item) => {
    const {data} = await $authHost.post('item', item)
    return data
}

export const fetchItems = async (categoryId, brandId, page, limit= 10) => {
    const {data} = await $host.get('item', {params: {
            categoryId, brandId, page, limit
        }})
    console.log(data)
    return data
}

export const fetchOneItem = async (id) => {
    const {data} = await $host.get('item/' + id)
    return data
}
export const countAllItems = async () => {
    const {data} = await $authHost.get('item/count')
    return data.count
}
export const countByFilter = async (categoryId, brandId) => {
    const {data} = await $authHost.get('item/countFilter')
    return data.count
}
