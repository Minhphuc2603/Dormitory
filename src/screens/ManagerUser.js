import { useEffect, useState } from "react";
import TemplateAdmin from "../template/TemplateAdmin";
import { Col, Row, Table, } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Pagination } from "antd";

const ManagerUser = () => {
    const [users, setUsers] = useState([]);
    const [account, setAccount] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const navigate = useNavigate()
    useEffect(() => {
      const role = sessionStorage.getItem('userrole');
      const id = sessionStorage.getItem('id');
      if (role !== "admin" || id === null) {
        navigate("/error");
      }
    }, []);
    useEffect(() => {
        fetch('http://localhost:9999/user')
            .then(resp => resp.json())
            .then(data => {
                setUsers(data);
                
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
    
    
    
      
    

    // Lấy index bắt đầu và kết thúc của list user hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUser = users.slice(indexOfFirstUser, indexOfLastUser);
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


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
                                                            <span key={d.id} style={{ color: "green" }}>active</span>
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
                            <Pagination
                                current={currentPage}
                                total={users.length}
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

export default ManagerUser;
