import { useEffect, useState } from "react";
import TemplateAdmin from "../template/TemplateAdmin";
import { Col, Row, Table, Pagination, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
                            <Pagination style={{ justifyContent: "flex-end" }}>
                                <Pagination.First
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                />
                                <Pagination.Prev
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                />
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <Pagination.Item
                                        key={index + 1}
                                        active={index + 1 === currentPage}
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                />
                                <Pagination.Last
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                />
                            </Pagination>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </TemplateAdmin>
    );
};

export default ManagerNoti;
