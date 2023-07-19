import { useEffect, useState } from "react";

import { Button, Col, Row, Table, } from 'react-bootstrap';
import { Pagination } from "antd"
import TemplateUser from "../template/TemplateUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResidentHistory = () => {

    const id = sessionStorage.getItem("id")

    const domID = sessionStorage.getItem("DomID")
    console.log("hiihi", domID)
    const [account, setAccount] = useState([])
    const [dom1, setDom1] = useState([])

    const [resident, setResident] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [user, setUser] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:9999/user/${id}`)
            .then(resp => resp.json())
            .then(data => {
                setUser([data.StudentID]);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [id]);
    useEffect(() => {
        fetch('http://localhost:9999/doms/' + domID)
            .then(resp => resp.json())
            .then(data => {
                setDom1(data);
                console.log("hihi", data)

            })
            .catch(err => {
                console.log(err.message);
            })
    }, [domID]);
    useEffect(() => {
        fetch('http://localhost:9999/account/' + id)
            .then(resp => resp.json())
            .then(data => {
                setAccount(data);
                console.log(data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);
    console.log(user)
    const updateAccount = {
        id: account.id,
        username: account.username,
        password: account.password,
        role: "student",
        status: account.status
    };
    const updateDom = {
        domName: dom1.domName,
        domID: dom1.domID,
        slot: dom1.slot,
        totalBed: dom1.totalBed,
        usedBed: dom1.usedBed - 1,
        freeBed: dom1.freeBed + 1,
        id: domID
    }
    const CheckOut = () => {
        fetch(`http://localhost:9999/account/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateAccount)
        })
            .then((res) => res.json())
            .then((data) => {
            })
            .catch((err) => {
                toast.error('Failed to edit: ' + err.message);
            });
        fetch(`http://localhost:9999/doms/${domID}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateDom)
        })
            .then((res) => res.json())
            .then((data) => {
            })
            .catch((err) => {
                toast.error('Failed to edit: ' + err.message);
            });
        toast.success('Success');
        navigate("/booking")


    }

    // Tính toán số trang
    const totalPages = Math.ceil(resident.length / usersPerPage);

    // Lấy index bắt đầu và kết thúc của list user hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentResident = resident.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    useEffect(() => {

        fetch(`http://localhost:9999/residentHistory?StudentID=${user[0]}`)
            .then(resp => resp.json())
            .then(data => {
                
                const sortedResi = data.sort((a, b) => b.id - a.id);
                setResident(sortedResi);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, [user]);


    return (
        <TemplateUser>
            <Row >
                <Col xs={12}>
                    <Row>
                        <Col style={{ textAlign: 'center' }}>
                            <h2>Resident History</h2>
                        </Col>
                    </Row>
                    {account.role === "user" ?
                        <Row>
                            <Col style={{ textAlign: 'right' }}>
                                <Button onClick={CheckOut} className="btn btn-success">CheckOut</Button>
                            </Col>
                        </Row> : ""
                    }

                    <Row>
                        <Col>
                            <Table className="box-shadow 2px ">
                                <thead>
                                    <tr>

                                        <th>StudentID</th>
                                        <th>Information</th>
                                        <th>Checkin</th>
                                        <th>Checkout</th>
                                        <th>Price</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentResident.map(r => (
                                            <tr key={r.id}>

                                                <td>{r.StudentID}</td>
                                                <td>{r.Information}</td>
                                                <td>{r.CheckIn}</td>
                                                <td>{r.CheckOut}</td>
                                                <td>{r.Price}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </Table>
                            <Pagination
                                current={currentPage}
                                total={resident.length}
                                pageSize={usersPerPage}
                                onChange={paginate}

                                style={{ marginTop: "16px", textAlign: "center" }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>

        </TemplateUser>
    );
}

export default ResidentHistory;