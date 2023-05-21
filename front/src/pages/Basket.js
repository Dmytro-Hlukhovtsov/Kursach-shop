import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Row, Container} from "react-bootstrap";
import {getCartItems} from "../http/basketAPI";
import {set} from "mobx";
import BasketList from "../components/BasketList";

const Basket = observer(() => {
    const [cartItems, setCartItems] = useState([])
    useEffect(() => {
        getCartItems().then(data => {
            console.log(data)
            setCartItems(data)
        })
    }, [])
    return (
        <Container>
            <Row style={{fontSize: 32, fontWeight: "bold"}}>Cart Items</Row>
            <Row>
                <BasketList itemList={cartItems} />
            </Row>
        </Container>
    );
});

export default Basket;
