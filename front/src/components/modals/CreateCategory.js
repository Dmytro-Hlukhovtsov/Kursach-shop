import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {createCategory} from "../../http/itemAPI";

const CreateCategory = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addCategory = () => {
        createCategory({name: value}).then(data => {
            setValue('')
            alert(data)
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Category Name"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addCategory}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCategory;
