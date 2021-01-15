import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getContacts } from "../api/getContacts";
import { insertContact, updateContact } from "../api/updateContact";
import { isReg } from "../common/isReg";
import { CreateContactForm } from "../components/contacts/createContactForm";
import { DeleteBtn } from "../components/deleteBtn";
import { EditBtn } from "../components/editBtn";

export const Contacts = () => {
    const history = useHistory();
    if(!isReg()) {history.push("/auth");}

    const [contacts, setContacts] = useState<DataProps[]>([]);
    const [editedData, setEditedData] = useState({});
    const [loading, setLoading] = useState(true);

    const edit = useCallback((data: DataProps) => {
        setEditedData(data);
    }, [setEditedData]);

    const remove = useCallback((id: number) => {
        const newContacts = contacts.filter((contact: DataProps) => contact.id !== id);
        setContacts(newContacts);
    }, [contacts, setContacts]);

    const onSumbit = useCallback((data: OutputContactProps) => {
        let newContacts;
        if (data.id) {
            newContacts = contacts.reduce((arr: DataProps[], contact: DataProps) => contact.id === data.id ? arr.concat(data as DataProps) : arr.concat(contact), []);
            updateContact(data as DataProps);
        } else {
            const newData = { ...data, id: new Date().getTime() }
            newContacts = contacts.concat(newData);
            insertContact(newData);
        }
        setContacts(newContacts);
    }, [contacts, setContacts]);

    const onCancel = useCallback(() => setEditedData({}), [setEditedData]);

    const loadData = async () => {
        const res = await getContacts();
        res.length > 0 && setContacts(res);
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Container fluid="sm">
            <Row>
                <Col>
                    <CreateContactForm {...editedData} onSumbit={onSumbit} onCancel={onCancel} />

                    {loading && <Spinner animation="border" variant="primary" />}

                    {contacts.length > 0 && <ListGroup>
                        {contacts.map(({ id, name, surname }) => (
                            <ListGroup.Item key={id} className="d-flex justify-content-between">
                                <div>{`${name} ${surname}`}</div>
                                <div>
                                    <EditBtn title="Edit" onClick={() => edit({ id, name, surname })} />
                                    {' '}
                                    <DeleteBtn title="Remove" onClick={() => remove(id)} />
                                </div>
                            </ListGroup.Item>
                        ))
                        }
                    </ListGroup>}
                    {contacts.length === 0 && <p>You have no contacts. Time to make friends.</p>}
                </Col>
            </Row>
        </Container>
    )
}