import React, {useEffect, useState} from "react";
import {Col, Image, ListGroup} from "react-bootstrap";
import "../assets/style.css"
import {changeCount, deleteBasketItem} from "../http/basketAPI";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const BasketItem = ({item, onCountChange}) => {
    const [count, setCount] = useState(item.count);
    const [price, setPrice] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };
    const deleteItem = () => {
        deleteBasketItem(item.itemId).then(data => {
            onCountChange()
        })

    }
    useEffect(() => {
        setPrice(count * item.price)
    }, [])
    useEffect(() => {
        setPrice(count * item.price)
        if(item.count != count)
        changeCount(item.itemId, count).then(data => {
            console.log(data)
            onCountChange()
        })

    }, [count])
    return (
        <ListGroup.Item style={{display: "flex"}}>
            <Col md={3} className="basket-item-part">
                <Image width={75} height={75} src={process.env.REACT_APP_API_URL + item.image}/>
            </Col>
            <Col md={4} className="basket-item-part">{item.name}</Col>
            <Col md={2} className="counter-block">
                <button onClick={() => increment()} className="counter-button">
                    &#9650;
                </button>
                <input type="text" value={count} className="counter-input" onChange={e => setCount(Number(e.target.value))}/>
                <button onClick={() => decrement()} className="counter-button">
                    &#9660;
                </button>
            </Col>
            <Col className="basket-item-part" md={2}>{price}</Col>
            <Col className="basket-item-part" md={1}>
                <button onClick={() => deleteItem()} className="delete-button">
                    <CloseOutlinedIcon />
                </button>
            </Col>

        </ListGroup.Item>
    )
}

export default BasketItem