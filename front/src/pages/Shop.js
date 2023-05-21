import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategoryBar from "../components/BrandBar";
import BrandBar from "../components/CategoryBar";
import ItemList from "../components/ItemList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchItems, fetchCategories, countAllItems, countByFilter} from "../http/itemAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {item} = useContext(Context)

    useEffect(() => {
        fetchCategories().then(data => item.setCategories(data))
        fetchBrands().then(data => item.setBrands(data))
        fetchItems(null, null, item.page).then(data => {
            item.setItems(data)

        })
        countAllItems().then(data => {
            item.setTotalCount(data)
        })
    }, [])

    useEffect(() => {
        const category = item.selectedCategory ? item.selectedCategory.categoryId : null
        const brand = item.selectedBrand ? item.selectedBrand.brandId : null
        fetchItems(category, brand, item.page ).then(data => {
            item.setItems(data)
        })
        countByFilter(category, brand ).then(data => {
            item.setTotalCount(data)
        })
    }, [item.page, item.selectedCategory, item.selectedBrand,])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <CategoryBar/>
                </Col>
                <Col md={9}>

                    <BrandBar/>
                    <ItemList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
