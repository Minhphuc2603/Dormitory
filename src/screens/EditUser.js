import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TemplateUser from "../template/TemplateUser";
import { toast } from "react-toastify";

const EditUser = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState({
        id: "",
        password:"123",
        name: "",
        phone: "",
        email: "",
        address: "",
        gender: ""
    });
    const id = sessionStorage.getItem('username');

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

    const handelSubmit = (e) => {
        e.preventDefault();
        const { id, name,password, email, phone, address, gender } = users;
        if (window.confirm("Are you sure you want to Edit")) {

        fetch(`http://localhost:9999/user/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, address, gender ,password :"123"})
        }).then((res) => {
            toast.success('edit success.');
            navigate('/user');
        }).catch((err) => {
            toast.error('Thất bại: ' + err.message);
        });
    }
    };

    const onInputChange = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value });
    };

    return (
        <TemplateUser>
            <Row className="profile-user">
                <Col className="offset-md-2 col-md-8" style={{ border: "1px solid red" }}>
                    <Row className="profile-title">
                        <Col style={{ textAlign: "center", padding: "50px" }}>
                            <h3>Profile</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form onSubmit={handelSubmit}>
                                <Row style={{ marginBottom: "30px" }}>
                                    <Form.Group className="col-md-6">
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control value={users.id} disabled />
                                    </Form.Group>
                                    <Form.Group className="col-md-6">
                                        <Form.Label>FullName</Form.Label>
                                        <Form.Control name="name" value={users.name} onChange={onInputChange} />
                                    </Form.Group>
                                </Row>
                                <Row style={{ marginBottom: "30px" }}>
                                    <Form.Group className="col-md-6">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="number" name="phone" value={users.phone} onChange={onInputChange} />
                                    </Form.Group>
                                    <Form.Group className="col-md-6">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control name="address" value={users.address} onChange={onInputChange} />
                                    </Form.Group>
                                </Row>
                                <Row style={{ marginBottom: "30px" }}>
                                    <Form.Group className="col-md-6">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" value={users.email} onChange={onInputChange} />
                                    </Form.Group>
                                    <Form.Group className="col-md-6">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control name="gender" value={users.gender} onChange={onInputChange} />
                                    </Form.Group>
                                </Row>
                                <Row style={{ marginBottom: "30px" }}>
                                    <Button className="btn btn-primary" type="submit">
                                        Edit
                                    </Button>
                                    <div class="divider" />
                                    <Link to={"/user"} className="btn btn-outline-danger">
                                        Cancel
                                    </Link>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </TemplateUser>
    );
}

export default EditUser;
