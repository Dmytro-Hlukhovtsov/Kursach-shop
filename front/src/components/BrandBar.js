import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

const BrandBar = observer(() => {
    const {item} = useContext(Context)
    const brandSelected = item.selectedBrand ? item.selectedBrand.brandId : 0
    return (
        <ListGroup style={{marginTop: "80px"}}>
            {item.brands.map(brand =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={brand.brandId === brandSelected}
                    onClick={() => !item.selectedBrand ? item.setSelectedBrand(brand) : item.setSelectedBrand(null)}
                    key={brand.brandId}
                >
                    {brand.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default BrandBar;
