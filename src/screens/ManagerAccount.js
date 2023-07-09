import { useEffect, useState } from "react";
import TemplateAdmin from "../template/TemplateAdmin";
import { Col, Row, Table, Pagination, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ManagerAccount = () => {
    const [account, setAccount] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    useEffect(() => {
        fetch('http://localhost:9999/account')
            .then(response => response.json())
            .then(data => setAccount(data))
            .catch(error => console.log(error.message));
    }, []);

    const handleToggleComplete = async (id) => {
        const accountToUpdate = account.find((acc) => acc.id === id);
        if (!accountToUpdate) {
          return;
        }
      
        const updatedAccount = {
          ...accountToUpdate,
          status: !accountToUpdate.status,
        };
      
        try {
          const response = await fetch(`http://localhost:9999/account/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedAccount),
          });
      
          if (response.ok) {
            const updatedAccountList = account.map((acc) => {
              if (acc.id === id) {
                return { ...acc, status: updatedAccount.status };
              }
              return acc;
            });
      
            setAccount(updatedAccountList);
            alert("Change success");
          } else {
            throw new Error("Failed to update account status");
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      
      

    const totalPages = Math.ceil(account.length / usersPerPage);

    // Lấy index bắt đầu và kết thúc của list user hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUser = account.slice(indexOfFirstUser, indexOfLastUser);

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
                                        <th>Id</th>
                                        <th>UserName</th>
                                        <th>role</th>
                                        <th>status</th>
                                        <th>change</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUser.map(u => (
                                        <tr key={u.id}>
                                            <td>{u.id}</td>
                                            <td>{u.username}</td>
                                            <td>{u.role}</td>
                                            <td>
                                                {
                                                    u.status
                                                        ? <span style={{ color: "green" }}>active</span>
                                                        : <span style={{ color: "red" }}>inactive</span>
                                                }
                                            </td>
                                            <td>
                                                <Button className="btn btn-success" onClick={() => handleToggleComplete(u.id)}>Change</Button>
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

export default ManagerAccount;
