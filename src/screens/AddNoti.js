import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TemplateAdmin from "../template/TemplateAdmin";

const AddNoti = () => {
    const { id } = useParams();
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const IsValidate = () => {
        let isproceed = true;
        
        if (title === null || title.trim() === "") {
          isproceed = false;
          toast.warning('Please enter the value in Titlr');
        }
        if (content === null || content.trim() === "") {
            isproceed = false;
            toast.warning('Please enter the value in Content');
          }
     
        return isproceed;
    }

    //Hàm lấy ra date
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; //Tháng bắt đầu là 0
    const year = currentDate.getFullYear();
    
    const handelSubmit = (e) => {
        e.preventDefault();
        if (IsValidate()) {
            // Add thông báo
            const noti = {
                id,
                title,
                content,
                Date: `${day}-${month}-${year}`
            };
            console.log(noti);
            fetch('http://localhost:9999/notification', {
                method: "POST",
                headers: { "Content-Type": "Application/JSON" },
                body: JSON.stringify(noti)
            })
                .then(() => {
                    alert("add success.");
                    navigate("/managernoti");
                });
        }
    };
    
    const navigate = useNavigate();

    return (
        <TemplateAdmin>

        
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
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={title}
                                    onChange={(e, editor) => {
                                        const data = editor.getData();
                                        setTitle(data);
                                       
                                    }}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="col-md-12">
                                <Form.Text>
                                    Content <span style={{ color: "red" }}>*</span>
                                </Form.Text>
    
                                <CKEditor
                                    
                                    editor={ClassicEditor}
                                    data={content}
                                    onReady={(editor)=>{
                                        editor.editing.view.change((write)=>{
                                            write.setStyle(
                                                "height",
                                                "200px",
                                                editor.editing.view.document.getRoot()
                                            )
                                        })
                                    }}
                                    onChange={(e, editor) => {
                                        const data = editor.getData();
                                        setContent(data);
                                    
                                       
                                    }}
                                />
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
        </TemplateAdmin>
    );
};

export default AddNoti;
