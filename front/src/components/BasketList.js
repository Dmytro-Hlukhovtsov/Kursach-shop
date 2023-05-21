import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Col, ListGroup, Row} from "react-bootstrap";
import BasketItem from "../components/BasketItem";
import {changeCount, getCartItems} from "../http/basketAPI";

const BasketList = observer(({itemList}) => {
    const [track, setTrack] = useState()
    const [items, setItems] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalCount, setCount] = useState(0)
    console.log(items)
    const totalsCounting = (data) => {
        let totalPriceTemp = 0
        let totalCountTemp = 0
        {data.map(item => {
                totalPriceTemp += item.count * item.price
                totalCountTemp += item.count
            }
        )}
        setTotalPrice(totalPriceTemp)
        setCount(totalCountTemp)
    }
    const handleTrackChange = () => {

        getCartItems().then(data => {
            totalsCounting(data)
            setItems(data)
            console.log(items)
        })
    }
    useEffect(() => {
        console.log("effect default")
        setItems(itemList)
        if(itemList.length != 0)
            totalsCounting(itemList)
    }, [itemList])

    return (
        <ListGroup
            className="d-flex"
            style={{width: "100%"}}>
            {items && items.map(item =>
                <BasketItem key={item.itemId} item={item} onCountChange={handleTrackChange}/>
            )}
            <ListGroup.Item style={{display: "flex"}}>
                <Col>Total Items: {totalCount}</Col>
                <Col style={{textAlign: "end"}}>Total Price: {totalPrice}</Col>
            </ListGroup.Item>
        </ListGroup>
    );
});

export default BasketList;