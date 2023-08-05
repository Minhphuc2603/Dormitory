import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Col, Row, Table, } from 'react-bootstrap';
import { Pagination, Modal } from "antd"

import TemplateAdmin from "../template/TemplateAdmin";

const ManagerResident = () => {

    const id = sessionStorage.getItem("id")
    

    const [resident, setResident] = useState([])
    const [viewResident, setViewResident] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [user, setUser] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
      const role = sessionStorage.getItem('userrole');
      const id = sessionStorage.getItem('id');
      if (role !== "admin" || id === null) {
        navigate("/error");
      }
    }, []);

    useEffect(() => {
        fetch(`http://localhost:9999/user/`)
            .then(resp => resp.json())
            .then(data => {
                setUser(data);

            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);


    const showModal = (id) => {
        setIsModalOpen(true);
        fetch(`http://localhost:9999/residentHistory/${id}`)
            .then(resp => resp.json())
            .then(data => {
                setViewResident(data);
                console.log(data);
            })
            .catch(err => {
                console.log(err.message);
            });


    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    // Tính toán số trang
    // const totalPages = Math.ceil(resident.length / usersPerPage);

    // Lấy index bắt đầu và kết thúc của list user hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentResident = resident.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    useEffect(() => {

        fetch(`http://localhost:9999/residentHistory`)
            .then(resp => resp.json())
            .then(data => {
                setResident(data);
                
            })
            .catch(err => {
                console.log(err.message);
            });
    }, []);


    return (
        <TemplateAdmin>
            <Row >
                <Col xs={12}>
                    <Row>
                        <Col style={{ textAlign: 'center' }}>
                            <h2>Resident History</h2>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <Table className="box-shadow 2px ">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>StudentID</th>
                                        <th>Student Name</th>
                                        <th>Information</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentResident.map(r => (
                                            <tr key={r.id}>
                                                <td>{r.id}</td>
                                                <td>{r.StudentID}</td>
                                                <td>{
                                                    user.map(u => u.StudentID === r.StudentID ? u.name : "")
                                                }</td>
                                                <td>{r.Information}</td>
                                                <td>{
                                                    <Link onClick={() => showModal(r.id)} > View
                                                    </Link>

                                                }
                                                </td>


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
                            <Modal  style={{textAlign:'center'}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                <h3 style={{color:"blue" , padding:'20px'}}>Detail Resident</h3>
                                <p>ID :{viewResident.id}</p>
                                <p>StudentID : {viewResident.StudentID}</p>
                                <p>NameStudent : {
                                    user.map(u => u.StudentID === viewResident.StudentID ? u.name : "")
                                }</p>
                                <p>Information : {viewResident.Information}</p>
                                <p>CheckIn : {viewResident.CheckIn}</p>
                                <p>CheckOut : {viewResident.CheckOut}</p>
                                <p>Price : {viewResident.Price}</p>
                               
                            </Modal>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </TemplateAdmin>
    );
}

export default ManagerResident;