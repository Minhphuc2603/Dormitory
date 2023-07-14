import { useEffect, useState } from "react";
import TemplateAdmin from "../template/TemplateAdmin";
import { Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Pagination } from "antd";

const ManagerNoti = () => {
    const [noti, setNoti] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    useEffect(() => {
        fetch('http://localhost:9999/notification')
            .then(response => response.json())
            .then(data => setNoti(data))
            .catch(error => console.log(error.message));
    }, []);


    const totalPages = Math.ceil(noti.length / usersPerPage);

    // Lấy index bắt đầu và kết thúc của list user hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUser = noti.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <TemplateAdmin>
            <Row>
                <Col xs={12}>
                    <Row>
                        <Col style={{ textAlign: 'center' }}>
                            <h2>List Notification</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ textAlign: 'right' }}>
                            <Link to={'/addroom'}>Create new Notification</Link>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Table className="box-shadow 2px ">
                                <thead>
                                    <tr>
                                        <th>NotificationID</th>
                                        <th>Title</th>
                                        <th>Document</th>
                                        <th scope={2}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUser.map(n => (
                                        <tr key={n.id}>
                                            <td>{n.id}</td>
                                            <td>{n.title}</td>
                                            <td>{n.Document}</td>
                                            <td>
                                                {<>
                                                    <Link>Edit</Link>
                                                    &nbsp;
                                                    &nbsp;
                                                    &nbsp;
                                                    <Link>Delete</Link>
                                                </>

                                                }
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Pagination
                                current={currentPage}
                                total={noti.length}
                                pageSize={usersPerPage}
                                onChange={paginate}

                                style={{ marginTop: "16px", textAlign: "center" }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </TemplateAdmin>
    );
};

export default ManagerNoti;
