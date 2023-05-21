import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateItem from "../components/modals/CreateItem";
import CreateCategory from "../components/modals/CreateCategory";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [categoryVisible, setCategoryVisible] = useState(false)
    const [itemVisible, setItemVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setCategoryVisible(true)}
            >
                Add Category
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Add Brand
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setItemVisible(true)}
            >
                Add Item
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateItem show={itemVisible} onHide={() => setItemVisible(false)}/>
            <CreateCategory show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
        </Container>
    );
};

export default Admin;
