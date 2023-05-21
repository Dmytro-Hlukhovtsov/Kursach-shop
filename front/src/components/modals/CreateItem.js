import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {createItem, fetchBrands, fetchItems, fetchCategories} from "../../http/itemAPI";
import {observer} from "mobx-react-lite";

const CreateItem = observer(({show, onHide}) => {
    const {item} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState(null)
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        fetchCategories().then(data => item.setCategories(data))
        fetchBrands().then(data => item.setBrands(data))
    }, [])



    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addItem = () => {
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('price', `${price}`)
            formData.append('image', file)
            formData.append('brandId', item.selectedBrand.brandId)
            formData.append('categoryId', item.selectedCategory.categoryId)
            formData.append('title', title)
            formData.append('description', description)
            createItem(formData).then(data =>{
                alert(data)
                onHide()
            })
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{item.selectedCategory.name || "Select Category"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {item.categories.map(category =>
                                <Dropdown.Item
                                    onClick={() => item.setSelectedCategory(category)}
                                    key={category.categoryId}
                                >
                                    {category.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{item.selectedBrand.name || "Select Brand"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {item.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => item.setSelectedBrand(brand)}
                                    key={brand.brandId}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Item Name"
                    />
                    <Form.Control
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="mt-3"
                        placeholder="Item Full Name"
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Item Price"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Item Description"
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addItem}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateItem;
