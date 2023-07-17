import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddNoti = () => {
    const { id } = useParams();
    

    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState([]);

    const IsValidate = () => {
        let isproceed = true;
        
        if (title === null || title.trim() === "") {
          isproceed = false;
          toast.warning('Please enter the value in name Room');
        }
        if (content <= 0 || content.trim() === "") {
            isproceed = false;
            toast.warning('Please enter the value in number Bed');
          }
     
        return isproceed;
    }
    //Hàm lấy ra date
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;//Tháng bắt đầu là 0
    
    const year = currentDate.getFullYear();
    const handelSubmit = (e) => {
        e.preventDefault();
        if (IsValidate() ) {
    //Add thông báo
            const noti = { id, 
                title,
                content,
                date:`${day}-${month}-${year}` }
            console.log(noti);
            fetch('http://localhost:9999/notification', {
                method: "POST",
                headers: { "Content-Type": "Application/JSON" },
                body: JSON.stringify(noti)
            })
                .then(() => {
                    alert("add susses.")
                    navigate("/managernoti")
                })
        }
    }
    
    

    const navigate = useNavigate();

    
    return (
        <Col
            className="offset-md-2 col-md-8"
            style={{ border: "1px solid red", marginTop: "100px", padding: "30px" }}
        >
            <Row>
                <Col style={{ textAlign: "center" }}>
                    <h3>Add Notification</h3>
                </Col>

            </Row>
            <Row>
                <Col md={12}>
                    <Form onSubmit={handelSubmit}>
                        <Row>
                            <Form.Group className="col-md-12">
                                <Form.Text>
                                    Title <span style={{ color: "red" }}>*</span>
                                </Form.Text>
                                <Form.Control
                                    
                                    onChange={(e) => setTitle(e.target.value)}
                                >
                                   
                                </Form.Control>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="col-md-12">
                                <Form.Text>
                                    Content <span style={{ color: "red" }}>*</span>
                                </Form.Text>
                                <Form.Control
                                    
                                    onChange={(e) => setContent(e.target.value)}
                                />
                                {/* {content.trim() === "" && (
                                    <Form.Text>
                                        <span style={{ color: "red" }}>
                                            Please enter a valid content
                                        </span>
                                    </Form.Text>
                                )} */}
                            </Form.Group>
                        </Row>
                        
                        <Row>
                            <Col className="col-md-12" style={{ textAlign: "center", padding: "25px" }}>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <Button className="btn btn-success" type="submit">
                                    Save
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Link to={"/managernoti"} className="btn btn-danger">
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

export default AddNoti;

