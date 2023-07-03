
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import TemplateUser from "../template/TemplateUser";

import { useState, useEffect } from "react";


export default function ProfileUser() {
    const [users, setUsers] = useState([]);
    const id = sessionStorage.getItem('username')
    useEffect(() => {
        fetch("http://localhost:9999/user/" + id)
            .then((resp) => resp.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    return (
        <>
            <TemplateUser>

                <Row className="profile-user">
                    <Col className="offset-md-2 col-md-8" style={{ border: "1px solid red" }}>
                        <Row className="profile-title">
                            <Col style={{ textAlign: "center", padding: "50px" }}>
                                <h3>Profile </h3>


                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form>
                                    <Row style={{ marginBottom: "30px" }}>
                                        <Form.Group className="col-md-6">
                                            <Form.Text>Id</Form.Text>
                                            <Form.Control defaultValue={users.id || ""} disabled />
                                        </Form.Group>
                                        <Form.Group className="col-md-6">
                                            <Form.Text>
                                                FullName
                                            </Form.Text>
                                            <Form.Control defaultValue={users.name || ""} disabled />
                                            <Form.Text>

                                            </Form.Text>
                                        </Form.Group>
                                    </Row>
                                    <Row style={{ marginBottom: "30px" }}>
                                        <Form.Group className="col-md-6">
                                            <Form.Text>Phone</Form.Text>
                                            <Form.Control type="number" defaultValue={users.phone || ""} disabled />
                                            {/*mac dinh la text*/}
                                        </Form.Group>
                                        <Form.Group className="col-md-6">
                                            <Form.Text>City</Form.Text>
                                            <Form.Control defaultValue={users.address || ""} disabled />
                                        </Form.Group>
                                    </Row>
                                    <Row style={{ marginBottom: "30px" }}>
                                        <Form.Group className="col-md-6">
                                            <Form.Text>Email</Form.Text>
                                            <Form.Control defaultValue={users.email || ""} disabled />

                                        </Form.Group>
                                        <Form.Group className="col-md-6">
                                            <Form.Text>Gender</Form.Text>
                                            <Form.Control defaultValue={users.gender || ""} disabled />
                                        </Form.Group>
                                    </Row>
                                    <Row style={{ marginBottom: "30px" }}>
                                    <Link to={"/user/edit"} className="btn btn-danger">
                                       Edit
                                    </Link>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </TemplateUser>
        </>
    );
}