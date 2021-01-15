import React, { useEffect, useState } from "react";
import { Form, Alert, Button } from "react-bootstrap";

export const CreateContactForm = ({ id, name = '', surname = '', onSumbit, onCancel }: ContactProps & SubmitProps) => {
    const [editedData, setEditedData] = useState({ id, name, surname });
    const [message, setMessage] = useState("");

    const clearForm = () => {
        setMessage("");
        setEditedData({ id: undefined, name: '', surname: '' });
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value)
        setEditedData({ ...editedData, [name]: value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editedData.name && editedData.surname) {
            onSumbit(editedData);
            clearForm();
        } else {
            setMessage("All fields are required");
        }
    }

    const handleCancel = () => {
        clearForm();
        onCancel();
    }

    useEffect(() => {
        setEditedData({ id, name, surname });
    }, [id, name, surname])

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={editedData.name}
                    onChange={onChange}
                />
            </Form.Group>

            <Form.Group controlId="surname">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Surname"
                    name="surname"
                    value={editedData.surname}
                    onChange={onChange}
                />
            </Form.Group>

            {message && <Alert variant="danger">{message}</Alert>}

            <div className="form-group">
                <Button variant="primary" disabled={!editedData.name || !editedData.surname} type="submit" role="button">
                    {id ? "Update" : "Save"}
                </Button>
                {' '}
                <Button variant="secondary" disabled={!editedData.name && !editedData.surname} onClick={handleCancel} role="button">Cancel</Button>
            </div>
        </Form>
    )

}