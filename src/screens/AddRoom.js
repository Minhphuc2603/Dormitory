import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddRoom = () => {
    const { id } = useParams();
    const [nextUserId, setNextUserId] = useState(0);

    const [nameRoom, setNameRoom] = useState("");
    const [numberBed, setNumberBed] = useState("");
    const [roomId, setRomId] = useState("1");
    const [dom, setDom] = useState([]);

    const IsValidate = () => {
        let isproceed = true;
        
        if (nameRoom === null || nameRoom.trim() === "") {
          isproceed = false;
          toast.warning('Please enter the value in name Room');
        }
        if (numberBed <= 0 || numberBed.trim() === "") {
            isproceed = false;
            toast.warning('Please enter the value in number Bed');
          }
     
        return isproceed;
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        if (IsValidate() ) {
            const room = { id:nextUserId, roomId, nameRoom,numberBed }
            console.log(room);
            fetch('http://localhost:9999/room', {
                method: "POST",
                headers: { "Content-Type": "Application/JSON" },
                body: JSON.stringify(room)
            })
                .then(() => {
                    alert("add susses.")
                    navigate("/managerroom")
                })
        }
    }
    useEffect(() => {
        fetch('http://localhost:9999/dom')
            .then(resp => resp.json())
            .then(data => {
                setDom(data);
                console.log(data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);
    useEffect(() => {
        fetch('http://localhost:9999/room')
            .then(resp => resp.json())
            .then(data => {
                const lastId = data[data.length + 1].id;
                setNextUserId(lastId);
                console.log(lastId)
                
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);

    const navigate = useNavigate();

    
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
                    <Form onSubmit={handelSubmit}>
                        <Row>
                            <Form.Group className="col-md-12">
                                <Form.Text>
                                    Name <span style={{ color: "red" }}>*</span>
                                </Form.Text>
                                <Form.Select
                                    // value={dom.find(d => d.domId === roomId)?.domName || ''}
                                    onChange={(e) => setRomId(e.target.value)}
                                >
                                   {
                                            dom.map(s => (
                                                <option key={s.domId} value={s.domId}>{s.domName}</option>
                                            ))
                                        }
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="col-md-12">
                                <Form.Text>
                                    NameRoom <span style={{ color: "red" }}>*</span>
                                </Form.Text>
                                <Form.Control
                                    value={nameRoom}
                                    onChange={(e) => setNameRoom(e.target.value)}
                                />
                                {nameRoom.trim() === "" && (
                                    <Form.Text>
                                        <span style={{ color: "red" }}>
                                            Please enter a valid name
                                        </span>
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="col-md-12">
                                <Form.Text>numberBed</Form.Text>
                                <Form.Control type="number" value={numberBed} onChange={e => setNumberBed(e.target.value)} />
                                {numberBed <= 0 && <Form.Text style={{ color: 'red' }}>Please enter product price &gt; 0</Form.Text>}
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col className="col-md-12" style={{ textAlign: "center", padding: "25px" }}>
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

export default AddRoom;

