import { useEffect, useState } from "react";
import TemplateAdmin from "../template/TemplateAdmin";
import { Col, Row, Table, Pagination, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ManagerUser = () => {
    const [users, setUsers] = useState([]);
    const [account, setAccount] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    useEffect(() => {
        fetch('http://localhost:9999/user')
            .then(resp => resp.json())
            .then(data => {
                setUsers(data);
                console.log(data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);

    useEffect(() => {
        fetch('http://localhost:9999/account')
          .then(response => response.json())
          .then(data => setAccount(data))
          .catch(error => console.log(error.message));
      }, []);
    
    
    
      
    const totalPages = Math.ceil(users.length / usersPerPage);

    // Lấy index bắt đầu và kết thúc của list user hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUser = users.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <TemplateAdmin>
            <Row>
                <Col xs={12}>
                    <Row>
                        <Col style={{ textAlign: 'center' }}>
                            <h2>List user</h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Table className="box-shadow 2px ">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Gender</th>
                                        <th>status</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUser.map(u => (
                                        <tr key={u.id}>
                                            <td>
                                                <Link to={`/view/user/` + u.id}>{u.name}</Link>
                                            </td>
                                            <td>{u.email}</td>
                                            <td>{u.phone}</td>
                                            <td>{u.address}</td>
                                            <td>{u.gender}</td>
                                            <td>
                                                {account.map(d =>
                                                    d.id === u.id ? (
                                                        d.status ? (
                                                            <span style={{ color: "green" }}>active</span>
                                                        ) : (
                                                            <span style={{ color: "red" }}>inactive</span>
                                                        )
                                                    ) : (
                                                        ''
                                                    )
                                                )}
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

export default ManagerUser;
