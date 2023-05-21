import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useParams} from 'react-router-dom'
import {fetchOneItem} from "../http/itemAPI";
import {addToCart} from "../http/basketAPI"

const ItemPage = () => {
    const [item, setItem] = useState({info: []})
    const {id} = useParams()
    console.log(id);
    useEffect(() => {
        fetchOneItem(id).then(data => setItem(data[0]))
    }, [])
    const addItemToCart = () => {
        addToCart(id).then(data => {
            alert(data)
        })
    }
    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <Image width={290} height={300} src={process.env.REACT_APP_API_URL + item.image}/>
                        <h3>{item.title}</h3>
                        <h4>{item.price} $</h4>
                        <Button variant={"outline-dark"} onClick={() => addItemToCart()}>Add to Cart</Button>
                    </Card>
                </Col>
                <Col md={4}>
                    <h1>Description</h1>

                    <Row key={item.itemId} style={{background: 'transparent', padding: 10, fontSize: 25}}>
                        {item.description}
                    </Row>
                </Col>
            </Row>

        </Container>
    );
};

export default ItemPage;
