import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TemplateUser from "../template/TemplateUser";
import phuc from '../qrcode.jpeg'
const Payment = () => {
    const [pcost, setpCost] = useState("")
    const [user, setUser] = useState([])
    const id = sessionStorage.getItem('id')
    const navigate = useNavigate()
    useEffect(() => {
        fetch('http://localhost:9999/user/' + id)
            .then(resp => resp.json())
            .then(data => {
                setUser(data);
                console.log(data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; //Tháng bắt đầu là 0
    const year = currentDate.getFullYear();
    const handleSubmit = (e) => {
        e.preventDefault();
            if(pcost < 0 ){
            toast.warning(' cost > 0')
            }else{
                const updateCost = {
                    userid: user.id,    
                    name: user.name,
                    
                    pcost:parseInt(pcost),
                    isApproved:false,
                    pdate: `${day}-${month}-${year}`,
                    status:0
                };
    
                fetch(`http://localhost:9999/payment`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updateCost)
                })
                    .then((res) => {
                        if (res.ok) {
                            toast.success('Notification updated successfully');
                            navigate(`/paymenthistory`);
                        } else {
                            throw new Error('Failed to update notification');
                        }
                    })
                    .catch((err) => {
                        toast.error('Failed to update notification: ' + err.message);
                    });

            }
        
            
        
    };
    return (
        <TemplateUser>
        <Col
            className="offset-md-2 col-md-8"
            style={{ border: "1px solid red", marginTop: "100px", padding: "30px" }}
        >
            <Row>
                <Col style={{ textAlign: "center" }}>
                    <h3>Payment</h3>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form onSubmit={handleSubmit}>



                        <Row>
                            <Form.Group className="col-md-12">
                                <Form.Label>Cost <span style={{ color: 'red' }}>*</span></Form.Label>

                                <Form.Control type="number"
                                value={pcost} onChange={(e) => setpCost(e.target.value)} />
                                {pcost <= 0 && (
                                    <Form.Text style={{ color: "red" }}>
                                        Please enter cost &gt; 0
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Row>
                        <Row>
                            <img src={phuc}/>
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
                                <Link to={"/"} className="btn btn-danger">
                                    Back Home
                                </Link>
                            </Col>
                            <Col className="col-md-6"></Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Col>
        </TemplateUser>
    );
}

export default Payment;