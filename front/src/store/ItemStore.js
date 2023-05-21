import {makeAutoObservable} from "mobx";

export default class ItemStore {
    constructor() {
        this._categories = []
        this._brands = []
        this._items = []
        this._selectedCategory = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 10
        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories
    }
    setBrands(brands) {
        this._brands = brands
    }
    setItems(items) {
        this._items = items
    }

    setSelectedCategory(category) {
        this.setPage(1)
        this._selectedCategory = category
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get categories() {
        return this._categories
    }
    get brands() {
        return this._brands
    }
    get items() {
        return this._items
    }
    get selectedCategory() {
        return this._selectedCategory
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}
