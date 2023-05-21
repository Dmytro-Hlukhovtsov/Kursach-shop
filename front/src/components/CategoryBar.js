import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const CategoryBar = observer(() => {
    const {item} = useContext(Context)
    const categorySelected = item.selectedCategory ? item.selectedCategory.categoryId : 0
    return (
        <Row className="d-flex">
            {item.categories.map(category =>
                <Card
                    style={{cursor:'pointer'}}
                    key={category.categoryId}
                    className="p-3"
                    onClick={() => !item.selectedCategory ? item.setSelectedCategory(category) : item.setSelectedCategory(null)}
                    border={category.categoryId === categorySelected ? 'danger' : 'light'}
                >
                    {category.name}
                </Card>
            )}
        </Row>
    );
});

export default CategoryBar;
