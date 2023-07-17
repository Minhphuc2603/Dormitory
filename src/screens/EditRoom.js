import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditRoom = () => {
    const { id } = useParams();

    const [dom, setDom] = useState({
        domID: "",
        domName: "",
        slot:"",
        totalBed: 0,
        usedBed: 0,
        freeBed: 0,
    });

    useEffect(() => {
        fetch(`http://localhost:9999/doms/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setDom(data);
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [id]);

    const navigate = useNavigate();

    const isValidate = () => {
        let isProceed = true;

        if (dom.usedBed <=0 ) {
            isProceed = false;
            toast.warning("Please enter the value in used Bed");
        }

        if (dom.freeBed <= 0) {
            isProceed = false;
            toast.warning("Please enter the value in free Bed");
        }

        return isProceed;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValidate()) {
            const updatedRoom = {
                id: id,
                domID: dom.domID,
                domName: dom.domName,
                slot:dom.slot,
                totalBed: parseInt(dom.usedBed) + parseInt(dom.freeBed),
                usedBed: parseInt(dom.usedBed),
                freeBed: parseInt(dom.freeBed),
            };

            fetch(`http://localhost:9999/doms/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedRoom),
            })
                .then(() => {
                    toast.success("Update successful");
                    navigate("/managerroom");
                })
                .catch((error) => {
                    console.error("Error updating skill:", error);
                });
        }
    };

    return (
        <Col
            className="offset-md-2 col-md-8"
            style={{ border: "1px solid red", marginTop: "100px", padding: "30px" }}
        >
            <Row>
                <Col style={{ textAlign: "center" }}>
                    <h3>Edit Room</h3>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group className="col-md-12">
                                <Form.Text>
                                    Name <span style={{ color: "red" }}>*</span>
                                </Form.Text>
                                <Form.Control value={dom.domName} disabled />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="col-md-12">
                                <Form.Text>
                                    DomID <span style={{ color: "red" }}>*</span>
                                </Form.Text>
                                <Form.Control value={dom.domID} disabled />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="col-md-12">
                                <Form.Text>UsedBed</Form.Text>
                                <input
                                    value={dom.usedBed}
                                    onChange={(e) =>
                                        setDom({ ...dom, usedBed: e.target.value })
                                    }
                                />
                                {dom.usedBed <= 0 && (
                                    <Form.Text style={{ color: "red" }}>
                                        Please enter usedBed &gt; 0
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="col-md-12">
                                <Form.Text>FreeBed</Form.Text>
                                <Form.Control
                                    value={dom.freeBed}
                                    onChange={(e) =>
                                        setDom({ ...dom, freeBed: e.target.value })
                                    }
                                />
                                {dom.freeBed <= 0 && (
                                    <Form.Text style={{ color: "red" }}>
                                        Please enter freeBed &gt; 0
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col
                                className="col-md-12"
                                style={{ textAlign: "center", padding: "25px" }}
                            >
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <Button className="btn btn-success" type="submit">
                                    Save
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Link to={"/managerroom"} className="btn btn-danger">
                                    Back Home
                                </Link>
                            </Col>
                            <Col className="col-md-6"></Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Col>
    );
};

export default EditRoom;
