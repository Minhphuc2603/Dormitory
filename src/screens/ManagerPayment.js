import { Button, Col, Row, Table, } from 'react-bootstrap';
import TemplateAdmin from '../template/TemplateAdmin';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Pagination } from 'antd';
const ManagerPayment = () => {
    const [payment, setPayment] = useState([])
    const [user, setUser] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentPayment = payment.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const navigate = useNavigate()
    useEffect(() => {
        const role = sessionStorage.getItem('userrole');
        const id = sessionStorage.getItem('id');
        if (role !== "admin" || id === null) {
          navigate("/error");
        }
      }, []);

    useEffect(() => {
        fetch('http://localhost:9999/payment/')
            .then(resp => resp.json())
            .then(data => {
                 const PaymentSort = data.sort((a, b) => b.id - a.id);
                setPayment(PaymentSort);
                
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);
    const handleReject = (userid, id) => {

        fetch(`http://localhost:9999/payment/${id}`)
            .then((resp) => resp.json())
            .then((data) => {

                const updatePayment = {
                    userid,
                    name: data.name,
                    status:2,
                    pcost: data.pcost,
                    isApproved: true,
                    pdate: data.pdate
                }


                fetch(`http://localhost:9999/payment/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatePayment)
                })
                    .then((res) => {
                        if (res.ok) {
                            toast.success("Request Reject. Cost updated successfully");
                        } else {
                            throw new Error("Failed to update cost");
                        }
                    })
                    .catch((err) => {
                        toast.error("Failed to update cost: " + err.message);
                    });
            })
            .catch((err) => {
                console.log(err.message);
            });
        window.location.reload()
    }
    // Khi an accept
    const handleAccept = (userid, pcost, id) => {
        fetch(`http://localhost:9999/user/${userid}`)
            .then((resp) => resp.json())
            .then((data) => {
                setUser(data);
                console.log(data);
                const updateUser = {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    gender: data.gender,
                    StudentID: data.StudentID,
                    cost: (data.cost) + pcost,
                };

                fetch(`http://localhost:9999/user/${userid}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updateUser)
                })
                    .then((res) => {
                        if (res.ok) {
                            toast.success("Request accepted. Cost updated successfully");
                        } else {
                            throw new Error("Failed to update cost");
                        }
                    })
                    .catch((err) => {
                        toast.error("Failed to update cost: " + err.message);
                    });
            })
            .catch((err) => {
                console.log(err.message);
            });
        fetch(`http://localhost:9999/payment/${id}`)
            .then((resp) => resp.json())
            .then((data) => {

                const updatePayment = {
                    userid,
                    name: data.name,
                    status:1,
                    pcost: data.pcost,
                    isApproved: true,
                    pdate: data.pdate
                }


                fetch(`http://localhost:9999/payment/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatePayment)
                })
                    .then((res) => {
                        if (res.ok) {

                        } else {
                            throw new Error("Failed to update cost");
                        }
                    })
                    .catch((err) => {
                        toast.error("Failed to update cost: " + err.message);
                    });
            })
            .catch((err) => {
                console.log(err.message);
            });
        window.location.reload()
    }

    return (
        <TemplateAdmin>
            <Row >
                <Col xs={12}>
                    <Row>
                        <Col style={{ textAlign: 'center' }}>
                            <h2>List Payment</h2>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <Table className="box-shadow 2px ">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Deposit Amount</th>
                                        <th>status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentPayment.map(p => (
                                            <tr key={p.id}>
                                                <td>{p.name}</td>
                                                <td>{p.pdate}</td>
                                                <td>{p.pcost}</td>
                                                <td>{p.status === 0 ?
                                                    <span style={{color:'orange'}}>Pending</span> :
                                                    p.status === 1 ?
                                                        <span style={{color:'green'}}>Done</span> :
                                                        p.status === 2 ?
                                                            <span style={{color:'red'}}>Reject</span> :
                                                            <span></span>}</td>
                                                <td>{p.isApproved === false ?
                                                    <>
                                                        <Link className='btn btn-success' onClick={() => handleAccept(p.userid, p.pcost, p.id)}>Accept</Link>
                                                        <Link className='btn btn-danger' onClick={() => handleReject(p.userid, p.id)}>Reject</Link>
                                                    </> :
                                                    <span style={{ color: 'green' }}></span>
                                                }

                                                </td>

                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </Table>
                            <Pagination
                                current={currentPage}
                                total={payment.length}
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
}

export default ManagerPayment;