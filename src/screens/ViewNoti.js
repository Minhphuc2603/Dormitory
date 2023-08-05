import { useEffect, useState } from "react";
import TemplateUser from "../template/TemplateUser";
import { Card, } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../styles/noti.css';
import { Modal } from "antd"

const ViewNoti = () => {
    const [noti, setNoti] = useState([]);
    const [viewNoti, setViewNoti] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        fetch("http://localhost:9999/notification")
          .then((response) => response.json())
          .then((data) => {
            // Sắp xếp danh sách noti theo ID giảm dần
            const sortedNoti = data.sort((a, b) => b.id - a.id);
            setNoti(sortedNoti);
          })
          .catch((error) => console.log(error.message));
      }, []);
      

    const showModal = (id) => {
        setIsModalOpen(true);
        fetch("http://localhost:9999/notification/" + id)
            .then((resp) => resp.json())
            .then((data) => {
                setViewNoti(data);
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
                console.log(err);
            });
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <TemplateUser>
            <div className="container-fluid my-container">
                <div>
                    <h1 className="big-title" style={{ marginBottom: "50px" }}>
                        News
                    </h1>
                    <div className="SN-news-container">
                        <div className="mentor-column">
                            {noti.map((n, index) => {
                                if (index % 2 === 0) {
                                    return (
                                        <Card key={index} className="cmm">
                                            <div className="SN-date">Date: {n.Date}</div>
                                            <hr></hr>
                                            <Link onClick={() => showModal(n.id)}>
                                                Title : <p className="SN-news-title" dangerouslySetInnerHTML={{ __html: n.title }}></p>
                                            </Link>
                                        </Card>
                                    );
                                }
                                return null;
                            })}
                        </div>
                        <div className="mentor-column">
                            {noti.map((n, index) => {
                                if (index % 2 !== 0) {
                                    return (
                                        <Card key={index} className="cmm">
                                            <div className="SN-date">Date: {n.Date}</div>
                                            <hr></hr>
                                            <Link onClick={() => showModal(n.id)}>
                                                Title :   <div className="SN-news-title" dangerouslySetInnerHTML={{ __html: n.title }}></div>
                                            </Link>
                                        </Card>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>
            </div>
            
            <Modal
                style={{ textAlign: "center" }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <h5 style={{ marginBottom: "30px" }}>View Notification</h5>
                <p>Date: {viewNoti.Date}   </p>
                Title :<p dangerouslySetInnerHTML={{ __html: viewNoti.title }}></p>
                Content :<p dangerouslySetInnerHTML={{ __html: viewNoti.content }}></p>
            </Modal>
            

        </TemplateUser>
    );
};

export default ViewNoti;
