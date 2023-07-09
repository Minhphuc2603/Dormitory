import { useEffect, useState } from "react";

import { Col, Row, Table, Modal, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TemplateUser from "../template/TemplateUser";

const ListRoom = () => {
    const [room, setRoom] = useState([])
    const [dom, setDom] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    useEffect(() => {
        fetch('http://localhost:9999/room')
            .then(resp => resp.json())
            .then(data => {
                setRoom(data);
                console.log(data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);
    // Tính toán số trang
    const totalPages = Math.ceil(room.length / usersPerPage);

    // Lấy index bắt đầu và kết thúc của list user hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentRoom = room.slice(indexOfFirstUser, indexOfLastUser);
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

    return (
        <TemplateUser>
            <Row >
                <Col xs={12}>
                    <Row>
                        <Col style={{ textAlign: 'center' }}>
                            <h2>List Room</h2>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <Table className="box-shadow 2px ">
                                <thead>
                                    <tr>

                                        <th>Name</th>
                                        <th>NameRoom</th>
                                        <th>numberBed</th>



                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentRoom.map(r => (
                                            <tr key={r.id}>

                                                <td>{
                                                    dom.map(d => d.domId === r.roomId ? d.domName : '')
                                                }</td>
                                                <td><Link to={`/view/user/` + r.id}>{r.nameRoom}</Link></td>
                                                <td>{r.numberBed}</td>




                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </Table>
                            <Pagination style={{ justifyContent: "flex-end" }}>
                                <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
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

        </TemplateUser>
    );
}

export default ListRoom;