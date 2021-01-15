import React, { useCallback, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getUser } from "../api/auth";

const Auth = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const history = useHistory();

    const onChangeUserName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const username = e.target.value;
        setUserName(username);
    }, [setUserName]);

    const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setPassword(password);
    }, [setPassword]);

    const handleLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!password || !userName) {
            setMessage("All fields are required");
            return
        }

        setMessage("");
        setLoading(true);

        const res = await getUser(userName, password);
        setLoading(false);
console.log(res.length)
        if (res.length) {
            document.cookie = `testUser=${res.id}`;
            history.push('/contacts')
        } else {
            setMessage("Invalid username or password");
        }
    }, [setMessage, password, userName, history]);

    return (
        <Container fluid="sm">
            <Row>
                <Col>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formBasicLogin">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={userName}
                                onChange={onChangeUserName}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                            />
                        </Form.Group>

                        {message && <Alert variant="danger">{message}</Alert>}

                        <div className="form-group">
                            <Button variant="primary" disabled={loading} type="submit">
                                {loading && <span className="spinner-border spinner-border-sm" />}
                                <span>Login</span>
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Auth