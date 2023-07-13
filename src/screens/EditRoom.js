import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditRoom = () => {
    const { id } = useParams();

    const [nameRoom, setNameRoom] = useState("");
    const [numberBed, setNumberBed] = useState("");
    const [roomId,setRomId] = useState("");
    const [price,setPrice] = useState("")
    const[dom,setDom]=useState([]);

    useEffect(() => {
        fetch(`http://localhost:9999/room/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setNameRoom(data.nameRoom || "");
                setNumberBed(data.numberBed || "");
                setRomId(data.roomId || "")
                setPrice(data.price || "")
            });
    }, [id]);
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

    const navigate = useNavigate();
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


    const handleSubmit = (e) => {
        e.preventDefault();

        if (IsValidate()){
            const updatedRoom = {
                id,
                roomId,
                nameRoom,
                numberBed,
                price,
            };

            fetch(`http://localhost:9999/room/${id}`, {
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
                                <Form.Control
                                    value={dom.find(d => d.domId === roomId)?.domName || ''}
                                    onChange={(e) => setNameRoom(e.target.value)}
                                    disabled
                                />{nameRoom.trim() === "" && (
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
                                <Form.Control
                                    value={numberBed}
                                    onChange={(e) => setNumberBed(e.target.value)}
                                />
                                {numberBed <= 0 && <Form.Text style={{ color: 'red' }}>Please enter number Bed &gt; 0</Form.Text>}
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

export default EditRoom;
