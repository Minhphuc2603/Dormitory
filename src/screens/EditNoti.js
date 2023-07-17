import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditNoti = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        fetch(`http://localhost:9999/notification/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setTitle(data?.title || '');
                setContent(data?.content || '');
                setDate(data?.date || '');
            })
            .catch((err) => {
                toast.error('Failed to fetch notification: ' + err.message);
            });
    }, [id]);

    const isValidate = () => {
        let isProceed = true;

        if (!title || !title.trim()) {
            isProceed = false;
            toast.warning('Please enter a value in the title field');
        }
        if (!content || !content.trim()) {
            isProceed = false;
            toast.warning('Please enter a value in the content field');
        }

        return isProceed;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValidate()) {
            const updatedNoti = {
                id: id,
                content: content,
                title: title,
                Date: date
            };

            fetch(`http://localhost:9999/notification/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedNoti)
            })
                .then((res) => {
                    if (res.ok) {
                        toast.success('Notification updated successfully');
                        navigate(`/managernoti`);
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
        <Row>
            <Col className="offset-md-2 col-md-8" style={{ border: '1px solid back', boxShadow: " 0 0 20px rgba(0, 0, 0, 0.3)", marginTop: "100px" }}>
                <Row>
                    <Col style={{ textAlign: 'center', padding: "30px" }}>
                        <h3>Edit Notification</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Form.Group className="col-md-12">
                                    <Form.Label>Title <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} as="textarea" />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="col-md-12">
                                    <Form.Label>Content <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Form.Control value={content} onChange={(e) => setContent(e.target.value)} as="textarea" />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col style={{ textAlign: 'center', padding: "30px" }}>
                                    <Button className="btn btn-success" type="submit">Save</Button>
                                    <Link to={`/managernoti`} className="btn btn-danger">Back to List</Link>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default EditNoti;
