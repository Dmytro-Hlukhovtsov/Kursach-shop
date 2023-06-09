import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import {useHistory} from "react-router-dom"
import {ITEM_ROUTE} from "../utils/consts";

const Item = ({item}) => {
    const history = useHistory()
    return (
        <Col md={3} className={"mt-3"} onClick={() => history.push(ITEM_ROUTE + '/' + item.itemId)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + item.image}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{item.name}</div>
                </div>
                <div>{item.price}$</div>
            </Card>
        </Col>
    );
};

export default Item;
