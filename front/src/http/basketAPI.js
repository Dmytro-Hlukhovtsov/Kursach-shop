import {$authHost, $host} from "./index";

export const addToCart = async (itemId) => {
    const {data} = await $authHost.post('basket', {itemId: itemId})
    return data
}

export const getCartItems = async () => {
    const {data} = await $authHost.get('basket')
    return data
}

export const changeCount = async (itemId, count) => {
    const {data} = await $authHost.put('basket/count', {itemId: itemId, count: count})
    return data
}

export const deleteBasketItem = async (itemId) => {
    const {data} = await $authHost.delete('basket/'+itemId)
    return data
}